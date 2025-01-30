"use client";

import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import Image from "next/image";
import { executeMutation } from "../../graphqlClient";
import { CREATE_USER_MANAGEMENT_DATA_MUTATION } from "../../mutation/createUserManagementData";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AdminRegistrationPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState({
    username: "Admin User",
    profileImg: "/img/om.webp",
    profession: "Super Admin",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await executeMutation(CREATE_USER_MANAGEMENT_DATA_MUTATION, formData);
      const successMsg = response?.createUserManagementData?.success_msg;
      setMessage({ type: "success", text: successMsg || "Admin created successfully!" });
      setFormData({ first_name: "", last_name: "", email: "", role: "", password: "" });

      // Automatically hide the popup after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to create admin. Please try again." });

      // Automatically hide the popup after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
      } min-h-screen transition-colors duration-500`}
    >
      {/* Header */}
      <header className="sticky top-0 flex items-center justify-between px-6 py-4 shadow-md bg-opacity-90 backdrop-blur-md z-10 border-b border-gray-300">
        <div className="flex items-center space-x-4">
          <Image
            src="/img/image.png" // Replace with your logo path
            alt="University Logo"
            width={50}
            height={50}
            className="object-contain"
          />
          <h1 className="text-xl hidden sm:block">Dr. Ram Manohar Lohia Avadh University</h1>
        </div>
        <div className="flex items-center space-x-6">
          {user && (
            <div className="flex items-center space-x-3">
              <Image src={user.profileImg} alt="Profile" width={40} height={40} className="rounded-full" />
              <div>
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-xs">{user.profession}</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full focus:outline-none hover:scale-105 transition-transform duration-300"
          >
            {darkMode ? <FaSun className="text-yellow-400 text-2xl" /> : <FaMoon className="text-gray-600 text-2xl" />}
          </button>
        </div>
      </header>

      {/* Form Section */}
      <main className="py-8 px-6">
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Admin</h2>
          {message && (
            <div
              className={`mb-4 p-4 rounded-lg shadow-md flex items-center space-x-4 fixed bottom-4 left-1/2 transform -translate-x-1/2 ${
                message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              <div className="flex-shrink-0">
                {message.type === "success" ? (
                  <FaCheckCircle className="text-green-600 text-2xl" />
                ) : (
                  <FaTimesCircle className="text-red-600 text-2xl" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">{message.text}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="col-span-1">
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleFormChange}
                placeholder="First Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
            <div className="col-span-1">
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleFormChange}
                placeholder="Last Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
            <div className="col-span-1">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
            <div className="col-span-1">
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleFormChange}
                placeholder="Role"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
            <div className="col-span-1">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
            <div className="col-span-1 sm:col-span-2 lg:col-span-4">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminRegistrationPage;

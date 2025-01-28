"use client";

import { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaSun, FaPlus, FaMoon, FaDownload } from "react-icons/fa";
import Image from "next/image";
import * as XLSX from "xlsx"; // Import the XLSX library

const AdminRegistrationPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [admins, setAdmins] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Super Admin", profileImg: "/img/om.webp" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin", profileImg: "/img/om.webp" },
  ]);
  const [user, setUser] = useState({
    username: "Admin User",
    profileImg: "/img/om.webp",
    profession: "Super Admin",
  });

  const handleEdit = (id) => {
    console.log("Edit admin with ID:", id);
    // Logic for editing admin details
  };

  const handleDelete = (id) => {
    setAdmins(admins.filter((admin) => admin.id !== id));
  };

  // Download Excel function
  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(admins);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Admins");
    XLSX.writeFile(wb, "admins.xlsx");
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
      } min-h-screen transition-colors duration-500`}
    >
      {/* Header */}
      <header className="sticky top-0 flex items-center justify-between px-6 py-4 shadow-md bg-opacity-90 backdrop-blur-md z-10 border-b border-gray-300">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Image
            src="/img/image.png" // Replace with your logo path
            alt="University Logo"
            width={50}
            height={50}
            className="object-contain"
          />
          <h1 className="text-xl hidden sm:block">
            Dr. Ram Manohar Lohia Avadh University
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Profile Section */}
          {user && (
            <div className="flex items-center space-x-3">
              <Image
                src={user.profileImg}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-xs">{user.profession}</p>
              </div>
            </div>
          )}

          {/* Dark Mode Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full focus:outline-none hover:scale-105 transition-transform duration-300"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400 text-2xl" />
            ) : (
              <FaMoon className="text-gray-600 text-2xl" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Search Bar */}
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search admin..."
                className={`${
                  darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"
                } px-4 py-2 w-full rounded-full shadow-md border border-gray-300 focus:ring-2 focus:ring-blue-400 transition`}
              />
              <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex flex-wrap justify-start items-center mb-6 space-x-4">
              {/* Download Excel Button */}
              <button
                onClick={handleDownloadExcel}
                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors flex items-center"
              >
                <FaDownload className="mr-2 text-lg" />
                Download Excel
              </button>

              {/* Add New Button */}
              <button
                onClick={() => console.log("Add new admin")}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center"
              >
                <FaPlus className="mr-2 text-lg" />
                Add New
              </button>
            </div>
          </div>

          {/* Admins Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="border-b bg-gray-100 dark:bg-gray-700">
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">Profile</th>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">Name</th>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">Email</th>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">Role</th>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr
                    key={admin.id}
                    className="border-b"
                  >
                    {/* Profile Image */}
                    <td className="py-3 px-6 whitespace-nowrap">
                      <Image
                        src={admin.profileImg}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </td>
                    <td className="py-3 px-6 whitespace-nowrap">{admin.name}</td>
                    <td className="py-3 px-6 whitespace-nowrap">{admin.email}</td>
                    <td className="py-3 px-6 whitespace-nowrap">{admin.role}</td>
                    <td className="py-3 px-6 whitespace-nowrap">
                      <div className="flex space-x-4">
                        {/* Edit Button */}
                        <button
                          onClick={() => handleEdit(admin.id)}
                          className="text-blue-500 hover:text-blue-700 transition-transform transform hover:scale-110"
                          title="Edit"
                        >
                          <FaEdit className="text-xl" />
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(admin.id)}
                          className="text-red-500 hover:text-red-700 transition-transform transform hover:scale-110"
                          title="Delete"
                        >
                          <FaTrash className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminRegistrationPage;
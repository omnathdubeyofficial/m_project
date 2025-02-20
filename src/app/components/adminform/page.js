"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSave, FaArrowLeft, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../navbar/page";
import { executeMutation } from "../../graphqlClient";
import { CREATE_USER_MANAGEMENT_DATA_MUTATION } from "../../mutation/createUserManagementData";

const AdminRegistrationPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    email: "",
    contact_no: "",
    role: "",
    status: "",
    joining_date: new Date(),
    qualification: "",
    enrollment_no: "",
    date_of_birth: new Date(),
    standard: "",
    section: "",
    parent_id: "",
    admission_date: new Date(),
    occupation: "",
    address: "",
    nationality: "",
    password: "",
    confirm_password: ""
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    try {
      const response = await executeMutation(CREATE_USER_MANAGEMENT_DATA_MUTATION, formData);
      setMessage({ type: "success", text: response?.createUserManagementData?.success_msg || "Admin created successfully!" });
      setTimeout(() => setMessage(null), 3000);
      setFormData({
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        email: "",
        contact_no: "",
        role: "",
        status: "",
        joining_date: new Date(),
        qualification: "",
        enrollment_no: "",
        date_of_birth: new Date(),
        standard: "",
        section: "",
        parent_id: "",
        admission_date: new Date(),
        occupation: "",
        address: "",
        nationality: "",
        password: "",
        confirm_password: ""
      });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to create admin. Please try again." });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col">
      <Navbar />
      {message && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg z-50 text-center flex items-center gap-2 ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message.type === "success" ? <FaCheckCircle className="text-green-600 text-2xl" /> : <FaTimesCircle className="text-red-600 text-2xl" />}
          <p className="font-medium">{message.text}</p>
        </div>
      )}
      <div className="container mx-auto py-10 px-4 sm:px-6 md:px-8 max-w-8xl pt-32">
        <div className="bg-white shadow-lg p-6 sm:p-8 w-full relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5">
            <button onClick={() => router.push("/dashboard")} className="bg-blue-500 text-white px-3 py-2 flex items-center gap-2 hover:bg-blue-700">
              <FaArrowLeft /> Go Back
            </button>
            <h2 className="text-2xl text-center text-gray-800">Admin Registration Form</h2>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.keys(formData).map((field, index) => (
                <div key={index} className="flex flex-col">
                  <label className="font-semibold mb-1">{field.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</label>
                  {field.includes("date") ? (
                    <DatePicker
                      selected={formData[field]}
                      onChange={(date) => handleDateChange(date, field)}
                      className="border p-3 rounded w-full"
                      dateFormat="yyyy-MM-dd"
                      required
                    />
                  ) : (
                    <input
                      type={field.includes("password") ? "password" : "text"}
                      name={field}
                      className="border p-3 rounded w-full"
                      value={formData[field]}
                      onChange={handleChange}
                      required
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 flex items-center justify-center gap-2 hover:bg-blue-700 text-lg">
                <FaSave /> Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminRegistrationPage;
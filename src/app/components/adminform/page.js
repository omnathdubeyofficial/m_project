"use client";

import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { executeMutation } from "../../graphqlClient";
import { CREATE_USER_MANAGEMENT_DATA_MUTATION } from "../../mutation/createUserManagementData";
import Navber from "../../navbar/page";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AdminRegistrationPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    email: "",
    confirm_password: "",
    contact_no: "",
    role: "",
    status: "",
    subject_specialization: "",
    class_assigned: "",
    teacher_id: "",
    admin_id: "",
    joining_date: "",
    qualification: "",
    enrollment_no: "",
    date_of_birth: "",
    standard: "",
    section: "",
    parent_id: "",
    admission_date: "",
    children_id: "",
    occupation: "",
    address: "",
    nationality: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    try {
      const response = await executeMutation(CREATE_USER_MANAGEMENT_DATA_MUTATION, formData);
      setMessage({ type: "success", text: response?.createUserManagementData?.success_msg || "Admin created successfully!" });
      setFormData({
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        email: "",
        confirm_password: "",
        contact_no: "",
        role: "",
        status: "",
        subject_specialization: "",
        class_assigned: "",
        teacher_id: "",
        admin_id: "",
        joining_date: "",
        qualification: "",
        enrollment_no: "",
        date_of_birth: "",
        standard: "",
        section: "",
        parent_id: "",
        admission_date: "",
        children_id: "",
        occupation: "",
        address: "",
        nationality: "",
        password: "",
      });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to create admin. Please try again." });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <Navber />
      {message && (
  <div
    className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg z-50 text-center flex items-center gap-2 ${
      message.type === "success"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {message.type === "success" ? (
      <FaCheckCircle className="text-green-600 text-2xl" />
    ) : (
      <FaTimesCircle className="text-red-600 text-2xl" />
    )}
    <p className="font-medium">{message.text}</p>
  </div>
)}

      <main className="py-10 px-6 w-full max-w-7xl pt-32">
        <h2 className="text-3xl font-semibold text-center mb-6">Add New Admin</h2>
        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.keys(formData).map((field) => (
            field !== "confirm_password" ? (
              field === "role" ? (
                <select key={field} name={field} value={formData[field]} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none" required>
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                </select>
              ) : field === "address" ? (
<textarea 
  key={field} 
  name={field} 
  value={formData[field]} 
  onChange={handleFormChange} 
  placeholder={field.replace("_", " ").toLowerCase().replace(/\b\w/, c => c.toUpperCase())} 
  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none h-24 col-span-4" 
  required 
/>
              ) : (
                <input key={field} type={field === "password" ? "password" : "text"} name={field} value={formData[field]} onChange={handleFormChange} placeholder={field.replace("_", " ").toLowerCase().replace(/\b\w/, c => c.toUpperCase())} className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
              )
            ) : null
          ))}
          <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleFormChange} placeholder="Confirm Password" className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
          <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-center">
  <button type="submit" className="w-40 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
    Submit
  </button>
</div>
 
        </form>
      </main>
    </div>
  );
};

export default AdminRegistrationPage;

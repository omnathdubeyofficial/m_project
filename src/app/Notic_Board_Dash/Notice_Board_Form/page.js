"use client";

import { CREATE_NOTICE_BOARD_MUTATION } from "../../mutation/noticeBoardMutation/createNoticeBoard";
import { executeMutation } from "../../graphqlClient";
import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react"; // Success & Error Icons

export default function NoticeBoardForm() {
  const initialFormData = {
    title: "",
    description: "",
    notice_date: "",
    expiry_date: "",
    category: "",
    issued_by: "",
    audience: "Students",
    status: "Active",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await executeMutation(CREATE_NOTICE_BOARD_MUTATION, formData);
      
      if (response.createNoticeBoardLists.success_msg) {
        setPopupMessage(response.createNoticeBoardLists.success_msg);
        setPopupType("success");
        setFormData(initialFormData); // Reset form after success
      } else {
        setPopupMessage(response.createNoticeBoardLists.error_msg || "Something went wrong");
        setPopupType("error");
      }

    } catch (error) {
      setPopupMessage("Mutation execution failed");
      setPopupType("error");
    }

    // Hide popup & clear form after 3 seconds
    setTimeout(() => {
      setPopupMessage(null);
      setPopupType(null);
    }, 3000);
  };

  return (
    <div className="mt-36 p-10 bg-white max-w-6xl mx-auto border border-gray-200">
      <h2 className="text-4xl font-semibold text-center text-blue-800 mb-8">School Notice Board</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notice Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issued By</label>
            <input
              type="text"
              name="issued_by"
              value={formData.issued_by}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-300 h-24"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notice Date</label>
            <input
              type="date"
              name="notice_date"
              value={formData.notice_date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
            <input
              type="date"
              name="expiry_date"
              value={formData.expiry_date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Audience</label>
            <select
              name="audience"
              value={formData.audience}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-300"
            >
              <option value="Students">Students</option>
              <option value="Teachers">Teachers</option>
              <option value="Parents">Parents</option>
              <option value="All">All</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-300"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 font-semibold text-lg transition max-w-xs mx-auto block">
          Submit
        </button>
      </form>

      {popupMessage && (
        <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 flex items-center gap-3 px-4 py-3 rounded-lg text-white text-center font-semibold shadow-md transition-opacity duration-300 ${popupType === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {popupType === "success" ? <CheckCircle size={24} /> : <XCircle size={24} />}
          <span>{popupMessage}</span>
        </div>
      )}
    </div>
  );
}

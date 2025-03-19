"use client";

import { useState, useRef } from "react";
import { CREATE_NOTICE_BOARD_MUTATION } from "../../mutation/noticeBoardMutation/createNoticeBoard";
import { executeMutation } from "../../graphqlClient";
import { CheckCircle, XCircle } from "lucide-react"; // Success & Error Icons
import { FaUpload, FaTimes } from "react-icons/fa";

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
    attachments: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      const data = await response.json();
      console.log("Upload Response:", data);

      if (data.fileUrl) {
        setFormData((prev) => ({
          ...prev,
          attachments: data.fileUrl,
        }));
      } else {
        console.error("Upload failed, no fileUrl returned.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleClearFile = () => {
    setFormData({ ...formData, attachments: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-3 border border-gray-300 shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border border-gray-300 shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issued By</label>
            <input type="text" name="issued_by" value={formData.issued_by} onChange={handleChange} className="w-full p-3 border border-gray-300 shadow-sm" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-3 border border-gray-300 shadow-sm h-24" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notice Date</label>
            <input type="date" name="notice_date" value={formData.notice_date} onChange={handleChange} className="w-full p-3 border border-gray-300 shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
            <input type="date" name="expiry_date" value={formData.expiry_date} onChange={handleChange} className="w-full p-3 border border-gray-300 shadow-sm" />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-1">Attachments (PDF only)</label>
          <label className="border p-2 rounded w-full flex items-center gap-2 cursor-pointer bg-gray-200 hover:bg-gray-300">
            <FaUpload /> Upload PDF
            <input type="file" ref={fileInputRef} className="hidden" accept="application/pdf" onChange={handleFileChange} />
          </label>
          {formData.attachments && (
            <div className="mt-2 flex items-center gap-2">
              <a href={formData.attachments} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                View Uploaded File
              </a>
              <button type="button" onClick={handleClearFile} className="text-red-600">
                <FaTimes />
              </button>
            </div>
          )}
        </div>

        <button type="submit" className="bg-blue-600 text-white py-3 px-6  shadow-md hover:bg-blue-700 font-semibold text-lg transition">
          Submit
        </button>
      </form>
    </div>
  );
}

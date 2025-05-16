"use client";

import { useState, useRef } from "react";
import { FaUpload, FaTimes, FaFilePdf } from "react-icons/fa";
import { CheckCircle, XCircle } from "lucide-react";
import { CREATE_JOB_APPLICATION_MUTATION } from "../../mutation/JobApplicationMutation/createSchoolCareers";
import { executeMutation } from "../../graphqlClient";

export default function JobApplicationForm() {
  const initialFormData = {
    full_name: "",
    email: "",
    phone_number: "",
    whatsapp_number: "",
    position_applied_for: "",
    cover_letter: "",
    resume_pdf: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  const positionOptions = ["Teacher", "Administrator", "Librarian", "Counselor", "Support Staff"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (file.type !== "application/pdf") {
      setPopupMessage("Please upload a PDF file.");
      setPopupType("error");
      setTimeout(() => {
        setPopupMessage(null);
        setPopupType(null);
      }, 3000);
      return;
    }

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const response = await fetch("/api/pdf_upload", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await response.json();
      if (data.fileUrl) {
        setFormData((prev) => ({ ...prev, resume_pdf: data.fileUrl }));
        setPopupMessage("Resume uploaded successfully.");
        setPopupType("success");
      } else {
        setPopupMessage("Resume upload failed.");
        setPopupType("error");
      }
    } 
    catch  {
      setPopupMessage("Error uploading resume.");
      setPopupType("error");
    }

    setTimeout(() => {
      setPopupMessage(null);
      setPopupType(null);
    }, 3000);
  };

  const handleClearFile = () => {
    setFormData({ ...formData, resume_pdf: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    if (
      !formData.full_name ||
      !formData.email ||
      !formData.phone_number ||
      !formData.whatsapp_number ||
      !formData.position_applied_for
    ) {
      setPopupMessage("Please fill all required fields.");
      setPopupType("error");
      setIsSubmitting(false);
      setTimeout(() => {
        setPopupMessage(null);
        setPopupType(null);
      }, 3000);
      return;
    }

    if (!formData.resume_pdf) {
      setPopupMessage("Please upload a resume.");
      setPopupType("error");
      setIsSubmitting(false);
      setTimeout(() => {
        setPopupMessage(null);
        setPopupType(null);
      }, 3000);
      return;
    }

    // Validate phone and WhatsApp number format
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.phone_number) || !phoneRegex.test(formData.whatsapp_number)) {
      setPopupMessage("Please enter valid phone and WhatsApp numbers.");
      setPopupType("error");
      setIsSubmitting(false);
      setTimeout(() => {
        setPopupMessage(null);
        setPopupType(null);
      }, 3000);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setPopupMessage("Please enter a valid email address.");
      setPopupType("error");
      setIsSubmitting(false);
      setTimeout(() => {
        setPopupMessage(null);
        setPopupType(null);
      }, 3000);
      return;
    }

    try {
      // Prepare mutation variables
      const variables = {
        full_name: formData.full_name,
        email: formData.email,
        phone_number: formData.phone_number,
        whatsapp_number: formData.whatsapp_number,
        position_applied_for: formData.position_applied_for,
        cover_letter: formData.cover_letter || "", // Optional field
        resume_pdf: formData.resume_pdf,
      };

      // Execute mutation
      const response = await executeMutation(CREATE_JOB_APPLICATION_MUTATION, variables);

      if (response?.applyForJob?.success_msg) {
        setPopupMessage(response.applyForJob.success_msg);
        setPopupType("success");
        setFormData(initialFormData);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setPopupMessage(response?.applyForJob?.error_msg || "Failed to submit application.");
        setPopupType("error");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setPopupMessage("Error submitting application.");
      setPopupType("error");
    }

    setIsSubmitting(false);
    setTimeout(() => {
      setPopupMessage(null);
      setPopupType(null);
    }, 3000);
  };

  return (
    <div className="mt-20 py-24 max-w-6xl mx-auto px-4">
      {/* Popup Message with Animation */}
      {popupMessage && (
        <div
          className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 max-w-md w-auto p-4 rounded-lg shadow-lg text-white flex items-center gap-3 animate-fade-in-up z-50 ${
            popupType === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {popupType === "success" ? <CheckCircle size={24} /> : <XCircle size={24} />}
          <span className="flex-1">{popupMessage}</span>
          <button
            onClick={() => {
              setPopupMessage(null);
              setPopupType(null);
            }}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FaTimes size={18} />
          </button>
        </div>
      )}

      {/* Job Application Form */}
      <div ref={formRef} className="bg-white p-8 shadow-lg border border-gray-200">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">
          Job Application Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                required
                placeholder="+91 1234567890"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="whatsapp_number"
                value={formData.whatsapp_number}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                required
                placeholder="+91 1234567890"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position Applying For <span className="text-red-500">*</span>
            </label>
            <select
              name="position_applied_for"
              value={formData.position_applied_for}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Position</option>
              {positionOptions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Letter
            </label>
            <textarea
              name="cover_letter"
              value={formData.cover_letter}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm h-32 focus:ring-2 focus:ring-blue-500"
              placeholder="Briefly describe why you are a good fit for this position..."
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resume (PDF only) <span className="text-red-500">*</span>
            </label>
            <label className="border p-3 w-full flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 transition rounded-md">
              <FaUpload className="text-blue-500" /> Upload Resume
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </label>
            {formData.resume_pdf && (
              <div className="mt-2 flex items-center gap-2">
                <a
                  href={formData.resume_pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline flex items-center gap-1"
                >
                  <FaFilePdf /> View Resume
                </a>
                <button
                  type="button"
                  onClick={handleClearFile}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 font-semibold transition-all ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
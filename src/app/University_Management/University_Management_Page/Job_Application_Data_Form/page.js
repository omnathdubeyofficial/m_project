"use client";

import { useState, useEffect, useRef } from "react";
import { FaTimes, FaEdit, FaTrash, FaChevronLeft, FaChevronRight, FaUpload, FaFilePdf } from "react-icons/fa";
import { CheckCircle, XCircle } from "lucide-react";
import { executeMutation, executeQuery } from "../../../graphqlClient";
import { CREATE_JOB_APPLICATION_MUTATION } from "../../../mutation/JobApplicationMutation/createSchoolCareers";
import { UPDATE_JOB_APPLICATION_MUTATION } from "../../../mutation/JobApplicationMutation/updateJobApplication";
import { DELETE_JOB_APPLICATION_MUTATION } from "../../../mutation/JobApplicationMutation/deleteJobApplication";
import { GET_JOB_APPLICATIONS_DATA } from "../../../query/JobApplicationsQuery/getJobApplicationQuery";

export default function JobApplicationForm() {
  const initialFormData = {
    z_id: null,
    full_name: "",
    email: "",
    phone_number: "",
    whatsapp_number: "",
    position_applied_for: "",
    cover_letter: "",
    resume_pdf: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [applicationList, setApplicationList] = useState([]);
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [showConfirm, setShowConfirm] = useState({ type: null, z_id: null });
  const [showCoverLetter, setShowCoverLetter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  const positionOptions = ["Teacher", "Administrator", "Librarian", "Counselor", "Support Staff"];

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await executeQuery(GET_JOB_APPLICATIONS_DATA);
        if (response?.getAllApplications) {
          setApplicationList(response.getAllApplications);
        } else {
          setPopupMessage("No application data found.");
          setPopupType("error");
        }
      } catch (err) {
        setPopupMessage("Failed to fetch applications.");
        setPopupType("error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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
    } catch (error) {
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
    setLoading(true);

    if (
      !formData.full_name ||
      !formData.email ||
      !formData.phone_number ||
      !formData.whatsapp_number ||
      !formData.position_applied_for
    ) {
      setPopupMessage("Please fill all required fields.");
      setPopupType("error");
      setLoading(false);
      setTimeout(() => {
        setPopupMessage(null);
        setPopupType(null);
      }, 3000);
      return;
    }

    if (!formData.resume_pdf && !formData.z_id) {
      setPopupMessage("Please upload a resume.");
      setPopupType("error");
      setLoading(false);
      setTimeout(() => {
        setPopupMessage(null);
        setPopupType(null);
      }, 3000);
      return;
    }

    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.phone_number) || !phoneRegex.test(formData.whatsapp_number)) {
      setPopupMessage("Please enter valid phone and WhatsApp numbers.");
      setPopupType("error");
      setLoading(false);
      setTimeout(() => {
        setPopupMessage(null);
        setPopupType(null);
      }, 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setPopupMessage("Please enter a valid email address.");
      setPopupType("error");
      setLoading(false);
      setTimeout(() => {
        setPopupMessage(null);
        setPopupType(null);
      }, 3000);
      return;
    }

    try {
      if (formData.z_id) {
        const variables = {
          z_id: formData.z_id,
          full_name: formData.full_name,
          email: formData.email,
          phone_number: formData.phone_number,
          whatsapp_number: formData.whatsapp_number,
          position_applied_for: formData.position_applied_for,
          cover_letter: formData.cover_letter || "",
          resume_pdf: formData.resume_pdf,
        };

        const response = await executeMutation(UPDATE_JOB_APPLICATION_MUTATION, variables);
        if (response?.updateApplication?.success_msg) {
          setApplicationList((prev) =>
            prev.map((item) =>
              item.z_id === formData.z_id ? { ...item, ...response.updateApplication } : item
            )
          );
          setPopupMessage(response.updateApplication.success_msg);
          setPopupType("success");
          setFormData(initialFormData);
          if (fileInputRef.current) fileInputRef.current.value = "";
          setCurrentPage(1);
        } else {
          setPopupMessage(
            response?.updateApplication?.error_msg || "Failed to update application."
          );
          setPopupType("error");
        }
      } else {
        const variables = {
          full_name: formData.full_name,
          email: formData.email,
          phone_number: formData.phone_number,
          whatsapp_number: formData.whatsapp_number,
          position_applied_for: formData.position_applied_for,
          cover_letter: formData.cover_letter || "",
          resume_pdf: formData.resume_pdf,
        };

        const response = await executeMutation(CREATE_JOB_APPLICATION_MUTATION, variables);
        if (response?.applyForJob?.success_msg) {
          setApplicationList((prev) => [...prev, response.applyForJob]);
          setPopupMessage(response.applyForJob.success_msg);
          setPopupType("success");
          setFormData(initialFormData);
          if (fileInputRef.current) fileInputRef.current.value = "";
          setCurrentPage(1);
        } else {
          setPopupMessage(
            response?.applyForJob?.error_msg || "Failed to create application."
          );
          setPopupType("error");
        }
      }
    } catch (err) {
      setPopupMessage("An error occurred during submission.");
      setPopupType("error");
      console.error(err);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setPopupMessage(null);
        setPopupType(null);
      }, 3000);
    }
  };

  const handleUpdate = (application) => {
    setFormData({
      z_id: application.z_id || null,
      full_name: application.full_name || "",
      email: application.email || "",
      phone_number: application.phone_number || "",
      whatsapp_number: application.whatsapp_number || "",
      position_applied_for: application.position_applied_for || "",
      cover_letter: application.cover_letter || "",
      resume_pdf: application.resume_pdf || null,
    });
    setShowConfirm({ type: null, z_id: null });
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = async (z_id) => {
    setLoading(true);
    try {
      const response = await executeMutation(DELETE_JOB_APPLICATION_MUTATION, { z_id });
      if (response?.deleteApplication?.success_msg) {
        setApplicationList((prev) => prev.filter((item) => item.z_id !== z_id));
        setPopupMessage(response.deleteApplication.success_msg);
        setPopupType("success");
        const totalPages = Math.ceil((applicationList.length - 1) / itemsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
          setCurrentPage(totalPages);
        }
      } else {
        setPopupMessage(
          response?.deleteApplication?.error_msg || "Failed to delete application."
        );
        setPopupType("error");
      }
    } catch (err) {
      setPopupMessage("Failed to delete application.");
      setPopupType("error");
      console.error(err);
    } finally {
      setLoading(false);
      setShowConfirm({ type: null, z_id: null });
      setTimeout(() => {
        setPopupMessage(null);
        setPopupType(null);
      }, 3000);
    }
  };

  const totalItems = applicationList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedApplications = applicationList.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const formattedDate = date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
    return new Date(formattedDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="mt-20 py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Popup Message */}
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

      {/* Confirmation Dialog */}
      {showConfirm.type && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to {showConfirm.type === "edit" ? "edit" : "delete"} this application?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm({ type: null, z_id: null })}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  showConfirm.type === "edit"
                    ? handleUpdate(applicationList.find((item) => item.z_id === showConfirm.z_id))
                    : handleDelete(showConfirm.z_id)
                }
                className={`px-4 py-2 text-white rounded ${
                  showConfirm.type === "edit"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-red-500 hover:bg-red-600"
                } transition`}
              >
                {showConfirm.type === "edit" ? "Edit" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cover Letter Popup */}
      {showCoverLetter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Cover Letter</h3>
              <button
                onClick={() => setShowCoverLetter(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaTimes size={18} />
              </button>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{showCoverLetter}</p>
          </div>
        </div>
      )}

      {/* Job Application Form */}
      <div ref={formRef} className="bg-white p-6 sm:p-8 shadow-lg border border-gray-200 mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-blue-800 mb-6">
          {formData.z_id ? "Update Application" : "Submit Job Application"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm h-24 focus:ring-2 focus:ring-blue-500"
              placeholder="Briefly describe why you are a good fit for this position..."
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resume (PDF only) {formData.z_id ? "" : <span className="text-red-500">*</span>}
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
              disabled={loading}
              className={`w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 font-semibold transition-all ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading
                ? "Processing..."
                : formData.z_id
                ? "Update Application"
                : "Submit Application"}
            </button>
          </div>
        </form>
      </div>

      {/* Application List */}
      <section className="max-w-8xl mx-auto py-6">
        <div className="bg-white shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-blue-900 to-blue-400 p-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Application List</h2>
            <span className="text-sm text-white bg-blue-700 px-3 py-1 rounded">
              {applicationList.length} Records
            </span>
          </div>

          <div className="p-4">
            {loading ? (
              <p className="text-center py-6 text-gray-600">Loading applications...</p>
            ) : applicationList.length === 0 ? (
              <p className="text-center py-6 text-gray-400 flex items-center justify-center gap-2">
                <span>📭</span> No records found
              </p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 border-b text-xs font-semibold text-gray-600 sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3 whitespace-nowrap">Full Name</th>
                        <th className="px-4 py-3 whitespace-nowrap">Email</th>
                        <th className="px-4 py-3 whitespace-nowrap">Phone Number</th>
                        <th className="px-4 py-3 whitespace-nowrap">WhatsApp Number</th>
                        <th className="px-4 py-3 whitespace-nowrap">Position Applied For</th>
                        <th className="px-4 py-3 whitespace-nowrap">Cover Letter</th>
                        <th className="px-4 py-3 whitespace-nowrap">Resume</th>
                        <th className="px-4 py-3 whitespace-nowrap">Created</th>
                        <th className="px-4 py-3 whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedApplications.map((item) => (
                        <tr
                          key={item.z_id}
                          className="border-b hover:bg-gray-50 transition"
                        >
                          <td className="px-4 py-3 whitespace-nowrap font-medium">{item.full_name || "N/A"}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{item.email || "N/A"}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{item.phone_number || "N/A"}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{item.whatsapp_number || "N/A"}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{item.position_applied_for || "N/A"}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {item.cover_letter ? (
                              <button
                                onClick={() => setShowCoverLetter(item.cover_letter)}
                                className="text-blue-600 underline hover:text-blue-800 transition"
                              >
                                Read Cover Letter
                              </button>
                            ) : (
                              "N/A"
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {item.resume_pdf ? (
                              <a
                                href={item.resume_pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline flex items-center gap-1"
                              >
                                <FaFilePdf /> View
                              </a>
                            ) : (
                              "N/A"
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">{formatDate(item.cdate)}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setShowConfirm({ type: "edit", z_id: item.z_id })}
                                className="text-teal-600 hover:text-teal-800 transition"
                                title="Edit Application"
                              >
                                <FaEdit size={16} />
                              </button>
                              <button
                                onClick={() => setShowConfirm({ type: "delete", z_id: item.z_id })}
                                className="text-red-600 hover:text-red-800 transition"
                                title="Delete Application"
                              >
                                <FaTrash size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 p-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-4 sm:mb-0">
                    <label className="text-sm text-gray-600">Show</label>
                    <select
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
                      className="px-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                    <span className="text-sm text-gray-600">per page</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md ${
                        currentPage === 1
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      } transition`}
                    >
                      <FaChevronLeft size={16} />
                    </button>

                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-1 rounded-md text-sm ${
                            currentPage === page
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          } transition`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md ${
                        currentPage === totalPages
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      } transition`}
                    >
                      <FaChevronRight size={16} />
                    </button>
                  </div>

                  <span className="text-sm text-gray-600 mt-4 sm:mt-0">
                    Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} applications
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
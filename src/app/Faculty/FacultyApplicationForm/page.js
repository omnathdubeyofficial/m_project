"use client";

import { useState, useEffect, useRef } from "react";
import { FaTimes, FaEdit, FaTrash, FaUpload, FaLink } from "react-icons/fa";
import { CheckCircle, XCircle } from "lucide-react";
import { executeMutation, executeQuery } from "../../graphqlClient";
import { CREATE_FACULTY_MUTATION } from "../../mutation/facultyMembersMutation/createfacultyMembers";
import { UPDATE_FACULTY_MUTATION } from "../../mutation/facultyMembersMutation/updatefacultyMembers";
import { DELETE_FACULTY_MUTATION } from "../../mutation/facultyMembersMutation/deletefacultyMembers";
import {GET_ALL_FACULTY_QUERY } from "../../query/facultyMembersQuery/facultyMembersQuery";
import Panel_Header from '../../dashboard/panel_header';

export default function FacultyApplicationForm() {
  const initialFormData = {
    z_id: null,
    fullName: "",
    profession: "",
    qualification: "",
    experience: "",
    department: "",
    facebook_link: "",
    instagram_link: "",
    youtube_link: "",
    linkedin_link: "",
    x_link: "",
    profile_image: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [facultyList, setFacultyList] = useState([]);
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [showConfirm, setShowConfirm] = useState({ type: null, z_id: null });
  const [showImagePopup, setShowImagePopup] = useState(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  const positionOptions = ["Professor", "Assistant Professor", "Lecturer", "Lab Assistant", "Research Fellow"];
  const departmentOptions = ["Computer Science", "Mathematics", "Physics", "Chemistry", "Biology", "Literature", "History"];

  // Fetch faculty data on mount
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setLoading(true);
        const response = await executeQuery(GET_ALL_FACULTY_QUERY);
        if (response?.getAllFaculty) {
          setFacultyList(response.getAllFaculty);
        } else {
          setPopupMessage("No faculty data found.");
          setPopupType("error");
        }
      } catch (err) {
        setPopupMessage("Failed to fetch faculty data.");
        setPopupType("error");
        console.error("Error fetching faculty:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("image", file);

    try {
      setLoading(true);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      const data = await response.json();
      if (data.imageUrl) {
        setFormData((prev) => ({ ...prev, profile_image: data.imageUrl }));
        setPopupMessage("Image uploaded successfully.");
        setPopupType("success");
      } else {
        setPopupMessage("Image upload failed.");
        setPopupType("error");
      }
    } catch (error) {
      setPopupMessage("Error uploading image.");
      setPopupType("error");
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setPopupMessage(null);
        setPopupType(null);
      }, 3000);
    }
  };

  const handleClearImage = () => {
    setFormData({ ...formData, profile_image: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.fullName || !formData.profession || !formData.qualification || !formData.experience || !formData.department) {
      setPopupMessage("Please fill all required fields.");
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
          full_name: formData.fullName,
          profession: formData.profession,
          qualification: formData.qualification,
          experience: formData.experience,
          department: formData.department,
          facebook_link: formData.facebook_link || "",
          instagram_link: formData.instagram_link || "",
          youtube_link: formData.youtube_link || "",
          linkedin_link: formData.linkedin_link || "",
          x_link: formData.x_link || "",
          profile_image: formData.profile_image || "",
        };

        const response = await executeMutation(UPDATE_FACULTY_MUTATION, variables);
        if (response?.updateFaculty?.success_msg) {
          setFacultyList((prev) =>
            prev.map((item) =>
              item.z_id === formData.z_id ? { ...item, ...response.updateFaculty } : item
            )
          );
          setPopupMessage(response.updateFaculty.success_msg);
          setPopupType("success");
          setFormData(initialFormData);
          if (fileInputRef.current) fileInputRef.current.value = "";
        } else {
          setPopupMessage(
            response?.updateFaculty?.error_msg || "Failed to update faculty."
          );
          setPopupType("error");
        }
      } else {
        const variables = {
          full_name: formData.fullName,
          profession: formData.profession,
          qualification: formData.qualification,
          experience: formData.experience,
          department: formData.department,
          facebook_link: formData.facebook_link || "",
          instagram_link: formData.instagram_link || "",
          youtube_link: formData.youtube_link || "",
          linkedin_link: formData.linkedin_link || "",
          x_link: formData.x_link || "",
          profile_image: formData.profile_image || "",
        };

        const response = await executeMutation(CREATE_FACULTY_MUTATION, variables);
        if (response?.createFaculty?.success_msg) {
          setFacultyList((prev) => [...prev, response.createFaculty]);
          setPopupMessage(response.createFaculty.success_msg);
          setPopupType("success");
          setFormData(initialFormData);
          if (fileInputRef.current) fileInputRef.current.value = "";
        } else {
          setPopupMessage(
            response?.createFaculty?.error_msg || "Failed to create faculty."
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

  const handleUpdate = (faculty) => {
    setFormData({
      z_id: faculty.z_id || null,
      fullName: faculty.full_name || "",
      profession: faculty.profession || "",
      qualification: faculty.qualification || "",
      experience: faculty.experience || "",
      department: faculty.department || "",
      facebook_link: faculty.facebook_link || "",
      instagram_link: faculty.instagram_link || "",
      youtube_link: faculty.youtube_link || "",
      linkedin_link: faculty.linkedin_link || "",
      x_link: faculty.x_link || "",
      profile_image: faculty.profile_image || "",
    });
    setShowConfirm({ type: null, z_id: null });
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = async (z_id) => {
    setLoading(true);
    try {
      const response = await executeMutation(DELETE_FACULTY_MUTATION, { z_id });
      if (response?.deleteFaculty?.success_msg) {
        setFacultyList((prev) => prev.filter((item) => item.z_id !== z_id));
        setPopupMessage(response.deleteFaculty.success_msg);
        setPopupType("success");
      } else {
        setPopupMessage(
          response?.deleteFaculty?.error_msg || "Failed to delete faculty."
        );
        setPopupType("error");
      }
    } catch (err) {
      setPopupMessage("Failed to delete faculty.");
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

  return (
    <div className="mt-20 py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <Panel_Header/>
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
              Are you sure you want to {showConfirm.type === "edit" ? "edit" : "delete"} this faculty application?
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
                    ? handleUpdate(facultyList.find((item) => item.z_id === showConfirm.z_id))
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

      {/* Image Popup */}
      {showImagePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Profile Image</h3>
              <button
                onClick={() => setShowImagePopup(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaTimes size={18} />
              </button>
            </div>
            <img
              src={showImagePopup}
              alt="Profile Image"
              className="w-full max-h-[70vh] object-contain rounded"
            />
          </div>
        </div>
      )}

      {/* Faculty Application Form */}
      <div ref={formRef} className="bg-white p-6 sm:p-8 shadow-lg border border-gray-200 mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-blue-800 mb-6">
          Faculty Application Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position <span className="text-red-500">*</span>
              </label>
              <select
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Position</option>
                {positionOptions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Qualification <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Department</option>
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="border p-4 bg-gray-50 rounded-md">
            <label className="cursor-pointer flex items-center gap-2">
              <FaUpload className="text-blue-500" /> Upload Profile Image
              <input
                type="file"
                name="profile_image"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
            {formData.profile_image && (
              <div className="mt-2 flex items-center gap-2">
                <img
                  src={formData.profile_image}
                  alt="Uploaded"
                  className="w-32 h-32 rounded border object-cover"
                />
                <button
                  type="button"
                  className="text-white bg-red-900 p-1 rounded-xl"
                  onClick={handleClearImage}
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
              <input
                type="url"
                name="linkedin_link"
                value={formData.linkedin_link}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
              <input
                type="url"
                name="facebook_link"
                value={formData.facebook_link}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="https://facebook.com/username"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
              <input
                type="url"
                name="instagram_link"
                value={formData.instagram_link}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="https://instagram.com/username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
              <input
                type="url"
                name="youtube_link"
                value={formData.youtube_link}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="https://youtube.com/@username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">X URL</label>
            <input
              type="url"
              name="x_link"
              value={formData.x_link}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="https://x.com/username"
            />
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

      {/* Faculty List */}
      <section className="max-w-6xl mx-auto py-6">
        <div className="bg-white shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 to-blue-400 p-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Faculty List</h2>
            <span className="text-sm text-white bg-blue-700 px-3 py-1 rounded">
              {facultyList.length} Records
            </span>
          </div>

          <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {loading ? (
              <p className="text-center py-6 text-gray-600 col-span-full">Loading faculty...</p>
            ) : facultyList.length === 0 ? (
              <p className="text-gray-400 text-center py-6 flex items-center justify-center gap-2 col-span-full">
                <span>📭</span> No records found
              </p>
            ) : (
              facultyList.map((item) => (
                <div
                  key={item.z_id}
                  className="bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-300 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200 bg-gradient-to-br from-teal-50 to-gray-50 flex items-center gap-4">
                    {item.profile_image && (
                      <img
                        src={item.profile_image}
                        alt="Profile"
                        className="w-12 h-12 object-cover rounded-full cursor-pointer"
                        onClick={() => setShowImagePopup(item.profile_image)}
                      />
                    )}
                    <h3 className="text-md text-gray-800">
                      <span className="text-green-600 font-semibold">Name:</span>{" "}
                      {item.full_name}
                    </h3>
                  </div>
                  <div className="p-4 flex-1 space-y-4">
                    <div className="bg-gray-50 p-4 border border-gray-200 text-sm text-gray-700">
                      <div className="flex flex-col gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-semibold">Position:</span>
                          <span>{item.profession}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-semibold">Qualification:</span>
                          <span>{item.qualification}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-semibold">Experience:</span>
                          <span>{item.experience}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-semibold">Department:</span>
                          <span>{item.department}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-green-600 font-semibold">Social Media Links:</span>
                        <div className="flex flex-wrap gap-3">
                          {item.linkedin_link && (
                            <a
                              href={item.linkedin_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center gap-1"
                            >
                              <FaLink /> LinkedIn
                            </a>
                          )}
                          {item.facebook_link && (
                            <a
                              href={item.facebook_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center gap-1"
                            >
                              <FaLink /> Facebook
                            </a>
                          )}
                          {item.instagram_link && (
                            <a
                              href={item.instagram_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center gap-1"
                            >
                              <FaLink /> Instagram
                            </a>
                          )}
                          {item.youtube_link && (
                            <a
                              href={item.youtube_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center gap-1"
                            >
                              <FaLink /> YouTube
                            </a>
                          )}
                          {item.x_link && (
                            <a
                              href={item.x_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline flex items-center gap-1"
                            >
                              <FaLink /> X
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                    <button
                      onClick={() => setShowConfirm({ type: "edit", z_id: item.z_id })}
                      className="p-2 bg-teal-100 text-teal-600 rounded-full hover:bg-teal-200 transition-all"
                      title="Edit"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => setShowConfirm({ type: "delete", z_id: item.z_id })}
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-all"
                      title="Delete"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
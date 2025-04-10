"use client";

import { useState, useRef } from "react";
import { FaTimes, FaEdit, FaTrash, FaUpload, FaLink } from "react-icons/fa";
import { CheckCircle, XCircle } from "lucide-react";

export default function FacultyApplicationForm() {
  const initialFormData = {
    id: null,
    fullName: "",
    position: "",
    qualification: "",
    experience: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    youtube: "",
    xAccount: "",
    profileImg: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [facultyList, setFacultyList] = useState([]);
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [showConfirm, setShowConfirm] = useState({ type: null, id: null });
  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  const positionOptions = ["Professor", "Assistant Professor", "Lecturer", "Lab Assistant", "Research Fellow"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profileImg: reader.result }));
      };
      reader.readAsDataURL(file); // Convert image to base64 for preview
    }
  };

  const handleClearFile = () => {
    setFormData({ ...formData, profileImg: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFaculty = { ...formData, id: formData.id || Date.now() };
    if (formData.id) {
      setFacultyList((prev) => prev.map((item) => (item.id === formData.id ? newFaculty : item)));
      setPopupMessage("Faculty application updated successfully!");
    } else {
      setFacultyList((prev) => [...prev, newFaculty]);
      setPopupMessage("Faculty application submitted successfully!");
    }
    setPopupType("success");
    setFormData(initialFormData);

    setTimeout(() => {
      setPopupMessage(null);
      setPopupType(null);
    }, 3000);
  };

  const handleUpdate = (faculty) => {
    setFormData(faculty);
    setShowConfirm({ type: null, id: null });
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = (id) => {
    setFacultyList((prev) => prev.filter((item) => item.id !== id));
    setPopupMessage("Faculty application deleted successfully!");
    setPopupType("success");
    setShowConfirm({ type: null, id: null });

    setTimeout(() => {
      setPopupMessage(null);
      setPopupType(null);
    }, 3000);
  };

  return (
    <div className="mt-20 py-24 max-w-6xl mx-auto">
      {/* Popup Message with Animation */}
      {popupMessage && (
        <div
          className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 max-w-md w-full p-4 rounded-lg shadow-lg text-white flex items-center gap-3 animate-fade-in-up z-50 ${
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
          <div className="bg-white p-6 shadow-lg w-80">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to {showConfirm.type === "edit" ? "edit" : "delete"} this faculty application?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm({ type: null, id: null })}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  showConfirm.type === "edit"
                    ? handleUpdate(facultyList.find((item) => item.id === showConfirm.id))
                    : handleDelete(showConfirm.id)
                }
                className={`px-4 py-2 text-white ${
                  showConfirm.type === "edit" ? "bg-blue-500 hover:bg-blue-600" : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {showConfirm.type === "edit" ? "Edit" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Faculty Application Form */}
      <div ref={formRef} className="bg-white p-8 shadow-lg border border-gray-200 mb-5">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">Faculty Application Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Position</option>
                {positionOptions.map((pos) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
              <label className="border p-3 w-full flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 transition">
                <FaUpload className="text-blue-500" /> Upload Image
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
              {formData.profileImg && (
                <div className="mt-2 flex items-center gap-2">
                  <img src={formData.profileImg} alt="Profile Preview" className="w-12 h-12 object-cover rounded-full" />
                  <button type="button" onClick={handleClearFile} className="text-red-600 hover:text-red-800">
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
              <input
                type="url"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="https://facebook.com/username"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
              <input
                type="url"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="https://instagram.com/username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
              <input
                type="url"
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="https://youtube.com/@username"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">X URL</label>
            <input
              type="url"
              name="xAccount"
              value={formData.xAccount}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="https://x.com/username"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 shadow-md hover:from-blue-600 hover:to-blue-700 font-semibold transition-all"
            >
              {formData.id ? "Update Application" : "Submit Application"}
            </button>
          </div>
        </form>
      </div>

      {/* Faculty List */}
      <section className="max-w-6xl mx-auto pt-0">
        <div className="bg-white shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 to-blue-300 p-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Faculty List</h2>
            <span className="text-sm text-gray-600 bg-blue-100 px-2 py-1 rounded">
              {facultyList.length} Records
            </span>
          </div>

          <div className="p-6 grid grid-cols-1 gap-6">
            {facultyList.length === 0 ? (
              <p className="text-gray-400 text-center py-6 flex items-center justify-center gap-2">
                <span>📭</span> No records found
              </p>
            ) : (
              facultyList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-300 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-400 bg-gradient-to-br from-teal-50 to-gray-50 flex items-center gap-4">
                    {item.profileImg && (
                      <img src={item.profileImg} alt="Profile" className="w-12 h-12 object-cover rounded-full" />
                    )}
                    <h3 className="text-md text-gray-800">
                      <span className="text-green-600 font-semibold">Name:</span> {item.fullName}
                    </h3>
                  </div>
                  <div className="p-4 flex-1 space-y-4">
                    <div className="bg-gray-50 p-4 border border-gray-200 text-sm text-gray-700">
                      <div className="flex flex-wrap gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-semibold">Position:</span>
                          <span>{item.position}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-semibold">Qualification:</span>
                          <span>{item.qualification}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-semibold">Experience:</span>
                          <span>{item.experience}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-green-600 font-semibold">Social Media Links:</span>
                        <div className="flex flex-wrap gap-3">
                          {item.linkedin && (
                            <a href={item.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                              <FaLink /> LinkedIn
                            </a>
                          )}
                          {item.facebook && (
                            <a href={item.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                              <FaLink /> Facebook
                            </a>
                          )}
                          {item.instagram && (
                            <a href={item.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                              <FaLink /> Instagram
                            </a>
                          )}
                          {item.youtube && (
                            <a href={item.youtube} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                              <FaLink /> YouTube
                            </a>
                          )}
                          {item.xAccount && (
                            <a href={item.xAccount} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                              <FaLink /> X
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                    <button
                      onClick={() => setShowConfirm({ type: "edit", id: item.id })}
                      className="p-2 bg-teal-100 text-teal-600 rounded-full hover:bg-teal-200 transition-all"
                      title="Edit"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => setShowConfirm({ type: "delete", id: item.id })}
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
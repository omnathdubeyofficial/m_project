"use client";

import { useState, useRef } from "react";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import { CheckCircle, XCircle } from "lucide-react";

export default function CareerForm() {
  const initialFormData = {
    job: "",
    schoolName: "",
    location: "",
    workTime: "",
    qualification: "",
    language: "",
    experience: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [careerList, setCareerList] = useState([]);
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [showConfirm, setShowConfirm] = useState({ type: null, id: null });
  const formRef = useRef(null);

  const jobOptions = ["Teacher", "Administrator", "Librarian", "Counselor", "Support Staff"];
  const schoolOptions = ["Springfield High", "Riverside Academy", "Greenwood School", "Oakwood Institute"];
  const locationOptions = ["New York", "Los Angeles", "Chicago", "Houston"];
  const workTimeOptions = ["Full-Time", "Part-Time", "Contract", "Temporary"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCareer = { ...formData, id: Date.now() };
    setCareerList((prev) => [...prev, newCareer]);
    setPopupMessage("Career application submitted successfully!");
    setPopupType("success");
    setFormData(initialFormData);

    setTimeout(() => {
      setPopupMessage(null);
      setPopupType(null);
    }, 3000);
  };

  const handleUpdate = (career) => {
    setFormData(career);
    setShowConfirm({ type: null, id: null });
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = (id) => {
    setCareerList((prev) => prev.filter((item) => item.id !== id));
    setPopupMessage("Career application deleted successfully!");
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
              Are you sure you want to {showConfirm.type === "edit" ? "edit" : "delete"} this career application?
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
                    ? handleUpdate(careerList.find((item) => item.id === showConfirm.id))
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

      {/* Career Form */}
      <div ref={formRef} className="bg-white p-8 shadow-lg border border-gray-200 mb-5">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">Career Application Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
              <select
                name="job"
                value={formData.job}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Job Role</option>
                {jobOptions.map((job) => (
                  <option key={job} value={job}>{job}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
              <select
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select School</option>
                {schoolOptions.map((school) => (
                  <option key={school} value={school}>{school}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Location</option>
                {locationOptions.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Work Time</label>
              <select
                name="workTime"
                value={formData.workTime}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Work Time</option>
                {workTimeOptions.map((time) => (
                  <option key={time} value={time}>{time}</option>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

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
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 shadow-sm h-24 focus:ring-2 focus:ring-blue-500"
              required
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

      {/* Career List */}
      <section className="max-w-6xl mx-auto pt-0">
        <div className="bg-white shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 to-blue-300 p-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Career List</h2>
            <span className="text-sm text-gray-600 bg-blue-100 px-2 py-1 rounded">
              {careerList.length} Records
            </span>
          </div>

          <div className="p-6 grid grid-cols-1 gap-6">
            {careerList.length === 0 ? (
              <p className="text-gray-400 text-center py-6 flex items-center justify-center gap-2">
                <span>📭</span> No records found
              </p>
            ) : (
              careerList.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-300 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-400 bg-gradient-to-br from-teal-50 to-gray-50">
                    <h3 className="text-md text-gray-800">
                      <span className="text-green-600 font-semibold">Job Role:</span> {item.job}
                    </h3>
                  </div>
                  <div className="p-4 flex-1 space-y-4">
                    <div className="bg-gray-50 p-4 border border-gray-200 text-sm text-gray-700">
                      {/* Flex layout for all fields except description */}
                      <div className="flex flex-wrap gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-semibold">School:</span>
                          <span>{item.schoolName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-semibold">Location:</span>
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-semibold">Work Time:</span>
                          <span>{item.workTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-semibold">Qualification:</span>
                          <span>{item.qualification}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-semibold">Language:</span>
                          <span>{item.language}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-600 font-semibold">Experience:</span>
                          <span>{item.experience}</span>
                        </div>
                      </div>
                      {/* Description separate */}
                      <div className="flex flex-col gap-2">
                        <span className="text-green-600 font-semibold">Description:</span>
                        <span>{item.description}</span>
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
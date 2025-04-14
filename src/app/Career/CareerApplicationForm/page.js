"use client";

import { useState, useEffect, useRef } from "react";
import { FaTimes, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CheckCircle, XCircle } from "lucide-react";
import { executeMutation, executeQuery } from "../../graphqlClient";
import { CREATE_SCHOOL_CAREER_MUTATION } from "../../mutation/schoolCareersMutation/createSchoolCareers";
import { UPDATE_SCHOOL_CAREER_MUTATION } from "../../mutation/schoolCareersMutation/updateSchoolCareers";
import { DELETE_SCHOOL_CAREER_MUTATION } from "../../mutation/schoolCareersMutation/deleteSchoolCareers";
import { GET_SCHOOL_CAREER_DATA } from "../../query/schoolCareersQuery/schoolCareersquery";

export default function CareerForm() {
  const initialFormData = {
    z_id: null,
    position_title: "",
    department: "",
    location: "",
    required_work_time: "",
    required_qualification: "",
    required_language: "",
    required_experience: "",
    job_description: "",
    employment_type: "",
    av_salary: "",
    number_of_vacancies: "",
    application_start: "",
    application_deadline: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [careerList, setCareerList] = useState([]);
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [showConfirm, setShowConfirm] = useState({ type: null, z_id: null });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const formRef = useRef(null);

  const jobOptions = ["Teacher", "Administrator", "Librarian", "Counselor", "Support Staff"];
  const departmentOptions = ["Mathematics", "Science", "Administration", "Library", "Counseling"];
  const locationOptions = ["New York", "Los Angeles", "Chicago", "Houston"];
  const workTimeOptions = ["Full-Time", "Part-Time", "Contract", "Temporary"];

  // Fetch careers on component mount
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);
        const response = await executeQuery(GET_SCHOOL_CAREER_DATA);
        if (response?.getSchoolCareers) {
          setCareerList(response.getSchoolCareers);
        } else {
          setPopupMessage("No career data found.");
          setPopupType("error");
        }
      } catch (err) {
        setPopupMessage("Failed to fetch careers.");
        setPopupType("error");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.z_id) {
        // Update existing career
        const variables = {
          z_id: formData.z_id,
          position_title: formData.position_title,
          department: formData.department,
          location: formData.location,
          required_work_time: formData.required_work_time,
          required_qualification: formData.required_qualification,
          required_language: formData.required_language,
          required_experience: formData.required_experience,
          job_description: formData.job_description,
          employment_type: formData.employment_type,
          av_salary: formData.av_salary,
          number_of_vacancies: formData.number_of_vacancies,
          application_start: formData.application_start,
          application_deadline: formData.application_deadline,
        };

        const response = await executeMutation(UPDATE_SCHOOL_CAREER_MUTATION, variables);
        if (response?.updateSchoolCareer?.success_msg) {
          setCareerList((prev) =>
            prev.map((item) =>
              item.z_id === formData.z_id ? { ...item, ...response.updateSchoolCareer } : item
            )
          );
          setPopupMessage(response.updateSchoolCareer.success_msg);
          setPopupType("success");
          setFormData(initialFormData);
          setCurrentPage(1); // Reset to first page after update
        } else {
          setPopupMessage(
            response?.updateSchoolCareer?.error_msg || "Failed to update career."
          );
          setPopupType("error");
        }
      } else {
        // Create new career
        const variables = {
          position_title: formData.position_title,
          department: formData.department,
          location: formData.location,
          required_work_time: formData.required_work_time,
          required_qualification: formData.required_qualification,
          required_language: formData.required_language,
          required_experience: formData.required_experience,
          job_description: formData.job_description,
          employment_type: formData.employment_type,
          av_salary: formData.av_salary,
          number_of_vacancies: formData.number_of_vacancies,
          application_start: formData.application_start,
          application_deadline: formData.application_deadline,
        };

        const response = await executeMutation(CREATE_SCHOOL_CAREER_MUTATION, variables);
        if (response?.createSchoolCareer?.success_msg) {
          setCareerList((prev) => [...prev, response.createSchoolCareer]);
          setPopupMessage(response.createSchoolCareer.success_msg);
          setPopupType("success");
          setFormData(initialFormData);
          setCurrentPage(1); // Reset to first page after create
        } else {
          setPopupMessage(
            response?.createSchoolCareer?.error_msg || "Failed to create career."
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

  const handleUpdate = (career) => {
    setFormData({
      z_id: career.z_id || null,
      position_title: career.position_title || "",
      department: career.department || "",
      location: career.location || "",
      required_work_time: career.required_work_time || "",
      required_qualification: career.required_qualification || "",
      required_language: career.required_language || "",
      required_experience: career.required_experience || "",
      job_description: career.job_description || "",
      employment_type: career.employment_type || "",
      av_salary: career.av_salary || "",
      number_of_vacancies: career.number_of_vacancies || "",
      application_start: career.application_start || "",
      application_deadline: career.application_deadline || "",
    });
    setShowConfirm({ type: null, z_id: null });
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = async (z_id) => {
    setLoading(true);
    try {
      const response = await executeMutation(DELETE_SCHOOL_CAREER_MUTATION, { z_id });
      if (response?.deleteSchoolCareer?.success_msg) {
        setCareerList((prev) => prev.filter((item) => item.z_id !== z_id));
        setPopupMessage(response.deleteSchoolCareer.success_msg);
        setPopupType("success");
        // Adjust current page if necessary
        const totalPages = Math.ceil((careerList.length - 1) / itemsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
          setCurrentPage(totalPages);
        }
      } else {
        setPopupMessage(
          response?.deleteSchoolCareer?.error_msg || "Failed to delete career."
        );
        setPopupType("error");
      }
    } catch (err) {
      setPopupMessage("Failed to delete career.");
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

  // Pagination logic
  const totalItems = careerList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCareers = careerList.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  return (
    <div className="mt-20 py-24 max-w-7xl mx-auto px-4">
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to {showConfirm.type === "edit" ? "edit" : "delete"} this career?
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
                    ? handleUpdate(careerList.find((item) => item.z_id === showConfirm.z_id))
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

      {/* Career Form */}
      <div ref={formRef} className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 mb-8">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">
          {formData.z_id ? "Update Career" : "Create Career"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Role</label>
              <select
                name="position_title"
                value={formData.position_title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Job Role</option>
                {jobOptions.map((job) => (
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Location</option>
                {locationOptions.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Work Time</label>
              <select
                name="required_work_time"
                value={formData.required_work_time}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Work Time</option>
                {workTimeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
              <input
                type="text"
                name="required_qualification"
                value={formData.required_qualification}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <input
                type="text"
                name="required_language"
                value={formData.required_language}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              <input
                type="text"
                name="required_experience"
                value={formData.required_experience}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
              <input
                type="text"
                name="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Average Salary</label>
              <input
                type="text"
                name="av_salary"
                value={formData.av_salary}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Vacancies</label>
              <input
                type="text"
                name="number_of_vacancies"
                value={formData.number_of_vacancies}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Application Start</label>
              <input
                type="date"
                name="application_start"
                value={formData.application_start}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
              <input
                type="date"
                name="application_deadline"
                value={formData.application_deadline}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="job_description"
              value={formData.job_description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm h-24 focus:ring-2 focus:ring-blue-500"
              required
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
                ? "Update Career"
                : "Create Career"}
            </button>
          </div>
        </form>
      </div>

      {/* Career List */}
      <section className="max-w-8xl mx-auto  py-6">
        <div className="bg-white shadow-lg  overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-blue-900 to-blue-400 p-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Career List</h2>
            <span className="text-sm text-white bg-blue-700 px-3 py-1 ">
              {careerList.length} Records
            </span>
          </div>

          <div className="p-4">
            {loading ? (
              <p className="text-center py-6 text-gray-600">Loading careers...</p>
            ) : careerList.length === 0 ? (
              <p className="text-center py-6 text-gray-400 flex items-center justify-center gap-2">
                <span>📭</span> No records found
              </p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 border-b text-xs whitespace-nowrap  font-semibold text-gray-600 sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3">Job Role</th>
                        <th className="px-4 py-3">Department</th>
                        <th className="px-4 py-3">Location</th>
                        <th className="px-4 py-3">Work Time</th>
                        <th className="px-4 py-3">Qualification</th>
                        <th className="px-4 py-3">Language</th>
                        <th className="px-4 py-3">Experience</th>
                        <th className="px-4 py-3">Type</th>
                        <th className="px-4 py-3">Salary</th>
                        <th className="px-4 py-3">Vacancies</th>
                        <th className="px-4 py-3">Start Date</th>
                        <th className="px-4 py-3">Deadline</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedCareers.map((item) => (
                        <tr
                          key={item.z_id}
                          className="border-b hover:bg-gray-50 transition whitespace-nowrap"
                        >
                          <td className="px-4 py-3 font-medium">{item.position_title || "N/A"}</td>
                          <td className="px-4 py-3">{item.department || "N/A"}</td>
                          <td className="px-4 py-3">{item.location || "N/A"}</td>
                          <td className="px-4 py-3">{item.required_work_time || "N/A"}</td>
                          <td className="px-4 py-3">{item.required_qualification || "N/A"}</td>
                          <td className="px-4 py-3">{item.required_language || "N/A"}</td>
                          <td className="px-4 py-3">{item.required_experience || "N/A"}</td>
                          <td className="px-4 py-3">{item.employment_type || "N/A"}</td>
                          <td className="px-4 py-3">{item.av_salary || "N/A"}</td>
                          <td className="px-4 py-3">{item.number_of_vacancies || "N/A"}</td>
                          <td className="px-4 py-3">{item.application_start || "N/A"}</td>
                          <td className="px-4 py-3">{item.application_deadline || "N/A"}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setShowConfirm({ type: "edit", z_id: item.z_id })}
                                className="text-teal-600 hover:text-teal-800 transition"
                                title="Edit Career"
                              >
                                <FaEdit size={16} />
                              </button>
                              <button
                                onClick={() => setShowConfirm({ type: "delete", z_id: item.z_id })}
                                className="text-red-600 hover:text-red-800 transition"
                                title="Delete Career"
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
                    Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} careers
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
"use client";

import { useState, useEffect, useRef } from "react";
import { CREATE_CLASS_DATA_MUTATION } from "../../../mutation/classesDataMutation/createClassDataMutation";
import { UPDATE_CLASS_MUTATION_MUTATION } from "../../../mutation/classesDataMutation/updateClassDataMutation";
import { DELETE_CLASS_DATA_MUTATION } from "../../../mutation/classesDataMutation/deleteClassMutation";
import { GET_CLASS_LIST_DATA } from "../../../query/ClassesDataQuery/fetchClassData";
import { FaCheckCircle, FaPlus, FaTimesCircle, FaTimes, FaUpload, FaEdit, FaTrash } from "react-icons/fa";
import { GET_CLASS_SUBJECTS_DATA } from "../../../query/GetClassSubjectsQuery/getClassSubjectsQuery";
import { executeQuery, executeMutation } from "../../../graphqlClient";
import Select from "react-select";
import Panel_Header from "../../../dashboard/panel_header";
import Loading from "../../../Loader/page";

export default function ClassForm() {
  const initialFormState = {
    z_id: null,
    class_title: "",
    tags: "",
    discount: "",
    total_seats: "",
    description: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [classOptions, setClassOptions] = useState([]);
  const [subjectOptionsByClass, setSubjectOptionsByClass] = useState({});
  const [classList, setClassList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [popupImage, setPopupImage] = useState(null);
  const [showConfirm, setShowConfirm] = useState({ type: null, id: null }); // Confirmation state
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    fetchClassSubjects();
    fetchClassList();
  }, []);

  const fetchClassSubjects = async () => {
    try {
      setIsLoading(true);
      const response = await executeQuery(GET_CLASS_SUBJECTS_DATA);
      const classSubjects = response?.getClassSubjects || [];
      const uniqueClasses = [...new Set(classSubjects.map((item) => item.class_name))];
      setClassOptions(uniqueClasses);

      const subjectOptions = {};
      classSubjects.forEach((item) => {
        const subjects = item.subject_name.split(",").map((sub) => sub.trim());
        subjectOptions[item.class_name] = subjects.map((subject) => ({
          value: subject,
          label: subject,
        }));
      });
      setSubjectOptionsByClass(subjectOptions);
    } catch (error) {
      console.error("Error fetching class subjects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClassList = async () => {
    try {
      setIsLoading(true);
      const response = await executeQuery(GET_CLASS_LIST_DATA);
      const classData = response?.getClassesDataList || [];
      setClassList(classData);
    } catch (error) {
      console.error("Error fetching class list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubjectChange = (selectedOptions) => {
    setSelectedSubjects(selectedOptions || []);
    setFormData((prev) => ({
      ...prev,
      tags: selectedOptions.map((sub) => sub.value).join(", "),
    }));
  };

  const handleClearImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("image", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      const data = await response.json();
      if (data.imageUrl) {
        setFormData((prev) => ({ ...prev, image: data.imageUrl }));
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description" && value.trim().split(/\s+/).length > 20) return;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "class_title") {
      setSelectedSubjects([]);
      setFormData((prev) => ({ ...prev, tags: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload an image before submitting.");
      return;
    }

    try {
      const response = await executeMutation(CREATE_CLASS_DATA_MUTATION, formData);
      if (response.createClassesData.success_msg) {
        setIsSuccess(true);
        setMessage(response.createClassesData.success_msg);
        const newClass = {
          z_id: response.createClassesData.z_id || Date.now().toString(),
          class_title: formData.class_title,
          tags: formData.tags,
          discount: formData.discount,
          total_seats: formData.total_seats,
          description: formData.description,
          image: formData.image,
        };
        setClassList((prev) => [newClass, ...prev]);
        setFormData(initialFormState);
        setSelectedSubjects([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setIsSuccess(false);
        setMessage(response.createClassesData.error_msg);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("An error occurred while submitting the form.");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload an image before updating.");
      return;
    }

    const updatedData = {
      z_id: formData.z_id,
      class_title: formData.class_title,
      description: formData.description,
      tags: formData.tags,
      image: formData.image,
      discount: formData.discount,
      total_seats: formData.total_seats,
      student_rating: "",
      student_reviews: "",
      parents_rating: "",
      parents_reviews: "",
      is_admission: "",
      filled_seats: "",
    };

    try {
      const response = await executeMutation(UPDATE_CLASS_MUTATION_MUTATION, updatedData);
      if (response.updateClassesData.success_msg) {
        setIsSuccess(true);
        setMessage(response.updateClassesData.success_msg);
        setClassList((prev) =>
          prev.map((item) =>
            item.z_id === formData.z_id ? { ...item, ...updatedData } : item
          )
        );
        setFormData(initialFormState);
        setSelectedSubjects([]);
        setIsEditing(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setIsSuccess(false);
        setMessage(response.updateClassesData.error_msg);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("An error occurred while updating the class.");
    }
  };

  const handleUpdate = (item) => {
    setShowConfirm({ type: "edit", id: item.z_id }); // Show confirmation for edit
  };

  const handleDelete = (z_id) => {
    setShowConfirm({ type: "delete", id: z_id }); // Show confirmation for delete
  };

  const confirmAction = (type, id) => {
    if (type === "edit") {
      const item = classList.find((i) => i.z_id === id);
      setIsEditing(true);
      setFormData({
        z_id: item.z_id,
        class_title: item.class_title,
        tags: item.tags,
        discount: item.discount,
        total_seats: item.total_seats,
        description: item.description,
        image: item.image,
      });
      setSelectedSubjects(
        item.tags.split(",").map((tag) => ({ value: tag.trim(), label: tag.trim() }))
      );
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (type === "delete") {
      executeDelete(id);
    }
    setShowConfirm({ type: null, id: null }); // Reset confirmation state
  };

  const executeDelete = async (z_id) => {
    try {
      const response = await executeMutation(DELETE_CLASS_DATA_MUTATION, { z_id });
      if (response.deleteClassesData.success_msg) {
        setIsSuccess(true);
        setMessage(response.deleteClassesData.success_msg);
        setClassList((prev) => prev.filter((item) => item.z_id !== z_id));
      } else {
        setIsSuccess(false);
        setMessage(response.deleteClassesData.error_msg);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("An error occurred while deleting the class.");
    }
  };

  const handleImageClick = (imageUrl) => {
    setPopupImage(imageUrl);
  };

  const handleClosePopup = () => {
    setPopupImage(null);
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const currentSubjectOptions = formData.class_title
    ? subjectOptionsByClass[formData.class_title] || []
    : [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen max-w-6xl mx-auto items-center justify-center pt-16 mt-16 sm:mt-0 px-4 sm:px-6 lg:px-8 lg:pt-36">
      <Panel_Header />
      <div ref={formRef} className="max-w-6xl w-full bg-white shadow-xl p-8">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <FaPlus className="text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">
              {isEditing ? "Update Class" : "Add New Class"}
            </h2>
          </div>
        </div>

        <form onSubmit={isEditing ? handleUpdateSubmit : handleSubmit} className="space-y-6">
          {/* Class Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class Title</label>
            <select
              name="class_title"
              value={formData.class_title}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            >
              <option value="">Select Class</option>
              {classOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Subjects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subjects</label>
            {isClient && (
              <Select
                isMulti
                options={currentSubjectOptions}
                value={selectedSubjects}
                onChange={handleSubjectChange}
                placeholder="Select subjects..."
                isDisabled={!formData.class_title}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            )}
          </div>

          {/* Tags (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Selected Subjects</label>
            <input
              type="text"
              value={formData.tags}
              readOnly
              className="w-full border border-gray-200 px-4 py-2 bg-gray-100 text-gray-500"
            />
          </div>

          {/* Discount and Total Seats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
              <input
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter discount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Seats</label>
              <input
                name="total_seats"
                type="number"
                value={formData.total_seats}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter total seats"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter description (max 20 words)"
              required
            />
          </div>

          <div className="border p-4 bg-gray-50">
            <label className="cursor-pointer flex items-center gap-2">
              <FaUpload /> Upload Image
              <input
                type="file"
                name="image"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
            {formData.image && (
              <div className="mt-2">
                <img src={formData.image} alt="Uploaded" className="w-32 h-32 rounded border" />
                <button
                  type="button"
                  className="text-white mt-2 bg-red-900 p-1 rounded-xl"
                  onClick={handleClearImage}
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>

          {/* Submit/Update Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-48 bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>

          {/* Message Popup */}
          {message && (
            <div
              className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 shadow-md text-white flex items-center gap-2 ${
                isSuccess ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {isSuccess ? <FaCheckCircle /> : <FaTimesCircle />}
              <span>{message}</span>
            </div>
          )}
        </form>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm.type && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 shadow-lg w-80">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to {showConfirm.type === "edit" ? "edit" : "delete"} this class?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm({ type: null, id: null })}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmAction(showConfirm.type, showConfirm.id)}
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

      {/* Class List Section */}
      <section className="max-w-6xl mx-auto mt-5 pt-0">
        <div className="bg-white shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-200 to-blue-300 p-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="text-blue-600"></span> Class List
            </h2>
            <span className="text-sm text-gray-600 bg-blue-100 px-2 py-1">
              {classList.length} Records
            </span>
          </div>
          <div className="p-4">
            {classList.length === 0 ? (
              <p className="text-gray-400 text-center py-6 flex items-center justify-center gap-2">
                <span>📭</span> No records found
              </p>
            ) : (
              <div className="space-y-3">
                {classList.map((item) => (
                  <div
                    key={item.z_id}
                    className="bg-gray-50 border border-gray-100 p-4 hover:bg-white hover:border-blue-200 transition-all duration-300 shadow-sm"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-2">
                        <p className="text-xs text-blue-500 font-semibold uppercase">Class</p>
                        <p className="text-lg font-semibold text-gray-800">{item.class_title}</p>
                      </div>
                      <div className="md:col-span-3">
                        <p className="text-xs text-blue-500 font-semibold uppercase">Subjects</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {item.tags.split(",").map((tag, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 border border-blue-100"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="md:col-span-3">
                        <p className="text-xs text-blue-500 font-semibold uppercase">Description</p>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-xs text-blue-500 font-semibold uppercase">Image</p>
                        <img
                          src={item.image}
                          alt={item.class_title}
                          className="w-16 h-16 rounded border cursor-pointer"
                          onClick={() => handleImageClick(item.image)}
                        />
                      </div>
                      <div className="md:col-span-1">
                        <p className="text-xs text-blue-500 font-semibold uppercase">Discount</p>
                        <p className="text-sm text-gray-600">{item.discount || "N/A"}%</p>
                      </div>
                      <div className="md:col-span-1 flex justify-end gap-3">
                        <button
                          onClick={() => handleUpdate(item)}
                          className="text-blue-500 hover:text-blue-700 p-2 bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(item.z_id)}
                          className="text-red-500 hover:text-red-700 p-2 bg-red-50 hover:bg-red-100 transition-colors border border-red-100"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Image Popup */}
      {popupImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative">
            <img src={popupImage} alt="Full Size" className="max-w-full max-h-[80vh]" />
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 text-white bg-red-600 p-2 rounded-full"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
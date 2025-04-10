"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSave,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { CREATE_CLASS_SUBJECTS_MUTATION } from "../../../mutation/classSubjectMutation/createclassSubjectMutation";
import { UPDATE_CLASS_SUBJECTS_MUTATION } from "../../../mutation/classSubjectMutation/updateclassSubjectMutation";
import { DELETE_CLASS_SUBJECTS_MUTATION } from "../../../mutation/classSubjectMutation/deleteclassSubjectMutation";
import { GET_CLASS_SUBJECTS_DATA } from "../../../query/GetClassSubjectsQuery/getClassSubjectsQuery";
import { executeQuery, executeMutation } from "../../../graphqlClient";
import Panel_Header from "../../../dashboard/panel_header";
import Loading from "../../../Loader/page";

const Class_Subject_Form = () => {
  const router = useRouter();
  const [firstName] = useState("");
  const [logoutMessage, setLogoutMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [className, setClassName] = useState("");
  const [subjectsInput, setSubjectsInput] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showConfirm, setShowConfirm] = useState({ type: null, id: null }); // Confirmation state

  const formRef = useRef(null);

  const classOptions = [
    "Nursery",
    "LKG",
    "UKG",
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
  ];

  useEffect(() => {
    fetchClassSubjects();
  }, []);

  const fetchClassSubjects = async () => {
    try {
      setIsLoading(true);
      const response = await executeQuery(GET_CLASS_SUBJECTS_DATA);
      setSubjectList(response?.getClassSubjects || []);
    } catch (error) {
      console.error("Error fetching class subjects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${day} ${months[parseInt(month) - 1]} ${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subjects = subjectsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .join(",");

    try {
      if (editId) {
        const response = await executeMutation(UPDATE_CLASS_SUBJECTS_MUTATION, {
          z_id: editId,
          class_name: className,
          subject_name: subjects,
        });
        if (response?.updateClassSubject?.success_msg) {
          setLogoutMessage(response.updateClassSubject.success_msg);
          setIsError(false);
          setSubjectList((prevList) =>
            prevList.map((item) =>
              item.z_id === editId ? { ...item, class_name: className, subject_name: subjects } : item
            )
          );
        } else {
          throw new Error(response?.updateClassSubject?.error_msg || "Update failed");
        }
      } else {
        const response = await executeMutation(CREATE_CLASS_SUBJECTS_MUTATION, {
          class_name: className,
          subject_name: subjects,
        });
        if (response?.createClassSubject?.success_msg) {
          setLogoutMessage(response.createClassSubject.success_msg || "Class subjects saved successfully!");
          setIsError(false);
          const newItem = {
            z_id: response.createClassSubject.z_id || Date.now().toString(),
            class_name: className,
            subject_name: subjects,
            cdate: response.createClassSubject.cdate || new Date().toISOString().slice(0, 10).replace(/-/g, ""),
          };
          setSubjectList((prevList) => [newItem, ...prevList]);
        } else {
          throw new Error(response?.createClassSubject?.error_msg || "Save failed");
        }
      }

      setClassName("");
      setSubjectsInput("");
      setEditId(null);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      setLogoutMessage(error.message || "Operation failed.");
      setIsError(true);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 6000);
    }
  };

  const handleDelete = (z_id) => {
    setShowConfirm({ type: "delete", id: z_id }); // Show confirmation for delete
  };

  const handleUpdate = (item) => {
    setShowConfirm({ type: "edit", id: item.z_id }); // Show confirmation for edit
  };

  const confirmAction = (type, id) => {
    if (type === "edit") {
      const item = subjectList.find((i) => i.z_id === id);
      setClassName(item.class_name);
      setSubjectsInput(item.subject_name);
      setEditId(item.z_id);
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else if (type === "delete") {
      executeDelete(id);
    }
    setShowConfirm({ type: null, id: null }); // Reset confirmation state
  };

  const executeDelete = async (z_id) => {
    try {
      const response = await executeMutation(DELETE_CLASS_SUBJECTS_MUTATION, { z_id });
      if (response?.deleteClassSubject?.success_msg) {
        setLogoutMessage(response.deleteClassSubject.success_msg || "Class subject deleted successfully!");
        setIsError(false);
        setSubjectList((prevList) => prevList.filter((item) => item.z_id !== z_id));
      } else {
        throw new Error(response?.deleteClassSubject?.error_msg || "Deletion failed");
      }
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      setLogoutMessage(error.message || "Failed to delete class subject.");
      setIsError(true);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 6000);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] pt-10 px-4 sm:px-6 lg:px-8 lg:pt-16">
      {/* Notification Popup */}
      {showPopup && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-2 shadow-lg text-white flex items-center gap-2 ${
            isError ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {isError ? <FaTimesCircle /> : <FaCheckCircle />}
          <span className="text-sm">{logoutMessage}</span>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirm.type && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 shadow-lg w-80">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to {showConfirm.type === "edit" ? "edit" : "delete"} this class subject?
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

      {/* Form */}
      <section ref={formRef} className="max-w-6xl mx-auto mb-0 pb-0">
        <Panel_Header />
        <div className="bg-white p-6 shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            {editId ? <FaEdit className="text-indigo-600" /> : <FaPlus className="text-indigo-600" />}
            {editId ? "Update Record" : "Add New Record"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
              <select
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                required
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Class</option>
                {classOptions.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subjects</label>
              <input
                type="text"
                value={subjectsInput}
                onChange={(e) => setSubjectsInput(e.target.value)}
                required
                placeholder="e.g. Math, English, Science"
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="md:col-start-3 flex items-end">
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 flex items-center justify-center gap-2"
              >
                {editId ? <FaSave /> : <FaPlus />}
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Enhanced Class Subjects List Design with Light Colors */}
      <section className="max-w-6xl mx-auto mt-5 pt-0">
        <div className="bg-white shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-200 to-blue-300 p-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="text-blue-600"></span> Class Subjects List
            </h2>
            <span className="text-sm text-gray-600 bg-blue-100 px-2 py-1">
              {subjectList.length} Records
            </span>
          </div>
          <div className="p-4">
            {subjectList.length === 0 ? (
              <p className="text-gray-400 text-center py-6 flex items-center justify-center gap-2">
                <span>📭</span> No records found
              </p>
            ) : (
              <div className="space-y-3">
                {subjectList.map((item) => (
                  <div
                    key={item.z_id}
                    className="bg-gray-50 border border-gray-100 p-4 hover:bg-white hover:border-blue-200 transition-all duration-300 shadow-sm"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      <div className="md:col-span-2">
                        <p className="text-xs text-blue-500 font-semibold uppercase">Class</p>
                        <p className="text-lg font-semibold text-gray-800">{item.class_name}</p>
                      </div>
                      <div className="md:col-span-6">
                        <p className="text-xs text-blue-500 font-semibold uppercase">Subjects</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {item.subject_name.split(",").map((subject, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 border border-blue-100"
                            >
                              {subject.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-xs text-blue-500 font-semibold uppercase">Date</p>
                        <p className="text-sm text-gray-600">{formatDate(item.cdate)}</p>
                      </div>
                      <div className="md:col-span-2 flex justify-end gap-3">
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
    </div>
  );
};

export default Class_Subject_Form;
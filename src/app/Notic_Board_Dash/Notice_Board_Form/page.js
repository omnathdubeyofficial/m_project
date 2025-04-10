"use client";

import { useState, useRef, useEffect } from "react";
import { CREATE_NOTICE_BOARD_MUTATION } from "../../mutation/noticeBoardMutation/createNoticeBoard";
import { UPDATE_NOTICE_BOARD_MUTATION } from "../../mutation/noticeBoardMutation/updateNoticeBoard";
import { DELETE_NOTICE_BOARD_MUTATION } from "../../mutation/noticeBoardMutation/deleteNoticeBoard";
import { GET_NOTICE_BOARD_LISTS } from "../../query/NoticeBoardQuery/fetchNoticeBoard";
import { executeMutation, executeQuery } from "../../graphqlClient";
import { CheckCircle, XCircle } from "lucide-react";
import { FaUpload, FaTimes, FaEdit, FaTrash, FaFilePdf, FaCalendarAlt, FaTag, FaUser } from "react-icons/fa";
import Loading from '../../Loader/page';
import Panel_Header from '../../dashboard/panel_header';

export default function NoticeBoardForm() {
  const initialFormData = {
    z_id: null,
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
  const [noticeList, setNoticeList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState(null);
  const [popupType, setPopupType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirm, setShowConfirm] = useState({ type: null, id: null });
  const [expandedItems, setExpandedItems] = useState({});
  const itemsPerPage = 5;
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  const categoryOptions = ["General", "Academic", "Sports", "Events", "Holidays"];
  const issuedByOptions = ["Admin", "Principal", "Teacher", "Coordinator"];

  // Fetch Notice Board List and Sort by Latest Date
  useEffect(() => {
    const fetchNotices = async () => {
      setIsLoading(true);
      try {
        const response = await executeQuery(GET_NOTICE_BOARD_LISTS);
        if (response?.getNoticeBoardLists) {
          // Create a copy and sort by notice_date in descending order (latest first)
          const sortedList = [...response.getNoticeBoardLists].sort((a, b) => {
            const dateA = new Date(a.notice_date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
            const dateB = new Date(b.notice_date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
            return dateB - dateA; // Latest date first
          });
          setNoticeList(sortedList);
          setFilteredList(sortedList);
        }
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotices();
  }, []);

  // Search and Filter Logic with Sorting
  useEffect(() => {
    let result = [...noticeList]; // Create a copy of noticeList

    if (searchTerm) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (fromDate || toDate) {
      result = result.filter((item) => {
        const noticeDate = new Date(item.notice_date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;
        return (!from || noticeDate >= from) && (!to || noticeDate <= to);
      });
    }

    if (categoryFilter) {
      result = result.filter((item) => item.category === categoryFilter);
    }

    // Sort filtered list by notice_date in descending order
    result = result.sort((a, b) => {
      const dateA = new Date(a.notice_date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
      const dateB = new Date(b.notice_date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
      return dateB - dateA; // Latest date first
    });

    setFilteredList(result);
    setCurrentPage(1);
  }, [searchTerm, fromDate, toDate, categoryFilter, noticeList]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const response = await fetch("/api/pdf_upload", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await response.json();
      if (data.fileUrl) {
        setFormData((prev) => ({ ...prev, attachments: data.fileUrl }));
      } else {
        setPopupMessage("File upload failed");
        setPopupType("error");
      }
    } catch (error) {
      setPopupMessage("Error uploading file");
      setPopupType("error");
    }
  };

  const handleClearFile = () => {
    setFormData({ ...formData, attachments: null });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (formData.z_id) {
        response = await executeMutation(UPDATE_NOTICE_BOARD_MUTATION, formData);
        if (response.updateNoticeBoardLists.success_msg) {
          setPopupMessage(response.updateNoticeBoardLists.success_msg);
          setPopupType("success");
          setNoticeList((prev) =>
            prev.map((item) =>
              item.z_id === formData.z_id ? response.updateNoticeBoardLists : item
            )
          );
        }
      } else {
        response = await executeMutation(CREATE_NOTICE_BOARD_MUTATION, formData);
        if (response.createNoticeBoardLists.success_msg) {
          setPopupMessage(response.createNoticeBoardLists.success_msg);
          setPopupType("success");
          setNoticeList((prev) => [...prev, response.createNoticeBoardLists]);
        }
      }

      if (!response.createNoticeBoardLists?.success_msg && !response.updateNoticeBoardLists?.success_msg) {
        setPopupMessage(response.createNoticeBoardLists?.error_msg || response.updateNoticeBoardLists?.error_msg || "Something went wrong");
        setPopupType("error");
      }
      setFormData(initialFormData);
    } catch (error) {
      setPopupMessage("Operation failed");
      setPopupType("error");
    }

    setTimeout(() => {
      setPopupMessage(null);
      setPopupType(null);
    }, 3000);
  };

  const formatDateForInput = (dateString) => {
    if (!dateString || dateString.length !== 8) return "";
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${year}-${month}-${day}`;
  };

  const handleUpdate = (notice) => {
    const updatedNotice = {
      ...notice,
      notice_date: formatDateForInput(notice.notice_date),
      expiry_date: formatDateForInput(notice.expiry_date),
    };
    setFormData(updatedNotice);
    setShowConfirm({ type: null, id: null });
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = async (z_id) => {
    try {
      const response = await executeMutation(DELETE_NOTICE_BOARD_MUTATION, { z_id });
      if (response.deleteNoticeBoardLists.success_msg) {
        setPopupMessage(response.deleteNoticeBoardLists.success_msg);
        setPopupType("success");
        setNoticeList((prev) => prev.filter((item) => item.z_id !== z_id));
      } else {
        setPopupMessage(response.deleteNoticeBoardLists.error_msg || "Delete failed");
        setPopupType("error");
      }
    } catch (error) {
      setPopupMessage("Delete operation failed");
      setPopupType("error");
    }

    setShowConfirm({ type: null, id: null });
    setTimeout(() => {
      setPopupMessage(null);
      setPopupType(null);
    }, 3000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
  };

  const toggleExpand = (z_id, field) => {
    setExpandedItems((prev) => ({
      ...prev,
      [`${z_id}-${field}`]: !prev[`${z_id}-${field}`],
    }));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  if (isLoading) return <Loading />;

  return (
    <div className="mt-20 py-24 max-w-6xl mx-auto">
      <Panel_Header />
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

      {/* Confirmation Dialog */}
      {showConfirm.type && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 shadow-lg w-80">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to {showConfirm.type === "edit" ? "edit" : "delete"} this notice?
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
                    ? handleUpdate(noticeList.find((item) => item.z_id === showConfirm.id))
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

      {/* Notice Board Form */}
      <div ref={formRef} className="bg-white p-8 shadow-lg border border-gray-200 mb-5">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">School Notice Board</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notice Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issued By</label>
              <select
                name="issued_by"
                value={formData.issued_by}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Issuer</option>
                {issuedByOptions.map((issuer) => (
                  <option key={issuer} value={issuer}>{issuer}</option>
                ))}
              </select>
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notice Date</label>
              <input
                type="date"
                name="notice_date"
                value={formData.notice_date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input
                type="date"
                name="expiry_date"
                value={formData.expiry_date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Attachments (PDF only)</label>
            <label className="border p-3 w-full flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 transition">
              <FaUpload className="text-blue-500" /> Upload PDF
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </label>
            {formData.attachments && (
              <div className="mt-2 flex items-center gap-2">
                <a href={formData.attachments} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex items-center gap-1">
                  <FaFilePdf /> View PDF
                </a>
                <button type="button" onClick={handleClearFile} className="text-red-600 hover:text-red-800">
                  <FaTimes />
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 shadow-md hover:from-blue-600 hover:to-blue-700 font-semibold transition-all"
            >
              {formData.z_id ? "Update Notice" : "Submit Notice"}
            </button>
          </div>
        </form>
      </div>

      {/* Notice List */}
      <section className="max-w-6xl mx-auto pt-0">
        <div className="bg-white shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-900 to-blue-300 p-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Notice List</h2>
            <span className="text-sm text-gray-600 bg-blue-100 px-2 py-1 rounded">
              {filteredList.length} Records
            </span>
          </div>

          {/* Search and Filter */}
          <div className="p-4 flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search By Title & Description</label>
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full md:w-1/6">
              <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="p-2 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full md:w-1/6">
              <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="p-2 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full md:w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="p-2 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {[...new Set(noticeList.map((item) => item.category))].map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Card Design */}
          <div className="p-6 grid grid-cols-1 gap-6">
            {currentItems.length === 0 ? (
              <p className="text-gray-400 text-center py-6 flex items-center justify-center gap-2">
                <span>📭</span> No records found
              </p>
            ) : (
              currentItems.map((item) => (
                <div
                  key={item.z_id}
                  className="bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-teal-300 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-400 bg-gradient-to-br from-teal-50 to-gray-50">
                    <h3 className="text-md text-gray-800">
                      <span className="text-green-600 font-semibold">Notice Title:</span>{" "}
                      {expandedItems[`${item.z_id}-title`] ? item.title : truncateText(item.title, 8)}
                      {item.title.split(" ").length > 8 && (
                        <button
                          onClick={() => toggleExpand(item.z_id, "title")}
                          className="text-teal-500 ml-2 text-xs hover:underline"
                        >
                          {expandedItems[`${item.z_id}-title`] ? "Less" : "More"}
                        </button>
                      )}
                    </h3>
                  </div>
                  <div className="p-4 flex-1 space-y-4">
                    <p className="text-gray-600 text-sm">
                      <span className="text-green-600 font-semibold">Description:</span>{" "}
                      {expandedItems[`${item.z_id}-description`] ? item.description : truncateText(item.description, 10)}
                      {item.description.split(" ").length > 10 && (
                        <button
                          onClick={() => toggleExpand(item.z_id, "description")}
                          className="text-teal-500 ml-2 text-xs hover:underline"
                        >
                          {expandedItems[`${item.z_id}-description`] ? "Less" : "More"}
                        </button>
                      )}
                    </p>
                    <div className="bg-gray-50 p-4 border border-gray-200 space-y-3 text-sm text-gray-700">
                      <div className="flex items-center gap-3">
                        <FaCalendarAlt className="text-teal-500" />
                        <span className="text-green-600 font-semibold">Notice Date:</span>
                        <span>{formatDate(item.notice_date)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaCalendarAlt className="text-red-400" />
                        <span className="text-green-600 font-semibold">Expiry Date:</span>
                        <span>{formatDate(item.expiry_date)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaUser className="text-gray-500" />
                        <span className="text-green-600 font-semibold">Issued By:</span>
                        <span>{item.issued_by || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaTag className="text-blue-500" />
                        <span className="text-green-600 font-semibold">Category:</span>
                        <span>{item.category || "Uncategorized"}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaFilePdf className="text-teal-500" />
                        <span className="text-green-600 font-semibold">Attachment:</span>
                        <span>
                          {item.attachments ? (
                            <a
                              href={item.attachments}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-teal-500 hover:text-teal-700 underline"
                            >
                              View PDF
                            </a>
                          ) : (
                            "No Attachment"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                    <button
                      onClick={() => setShowConfirm({ type: "edit", id: item.z_id })}
                      className="p-2 bg-teal-100 text-teal-600 rounded-full hover:bg-teal-200 transition-all"
                      title="Edit"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => setShowConfirm({ type: "delete", id: item.z_id })}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white disabled:bg-gray-300 hover:bg-blue-600 transition-all"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white disabled:bg-gray-300 hover:bg-blue-600 transition-all"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { FaSearch, FaEdit, FaTrash, FaPrint, FaChevronRight, FaChevronLeft, FaPlus, FaArrowLeft, FaDownload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Image from "next/image";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { GET_NURSERY_ADMISSION_DATA } from "../../../query/NurseryAdmissionQuery/fetchNurseryAdmission";
import { UPDATE_NURSERY_ADMISSION_LIST_MUTATION } from "../../../mutation/NurseryAdmissionMutation/updateNurseryAdmissionMutation";
import { DELETE_NURSERY_ADMISSION_LIST_MUTATION } from "../../../mutation/NurseryAdmissionMutation/deleteNurseryAdmissionMutation";
import { executeQuery, executeMutation } from "../../../graphqlClient";
import Link from "next/link";

const New_Admission_Lists = () => {
  const [admins, setAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState({ text: "", type: "" });
  const [modalImage, setModalImage] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });
  const [updateConfirm, setUpdateConfirm] = useState({ show: false, z_id: null, field: null, value: null });
  const adminsPerPage = 10;

  // Fetch nursery admission data
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await executeQuery(GET_NURSERY_ADMISSION_DATA);
        setAdmins(response?.getNurseryAdmissionList || []);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setPopupMessage({ text: "Failed to fetch data.", type: "error" });
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }
    };
    fetchAdmins();
  }, []);

  // Filter admins based on search query
  const filteredAdmins = useMemo(() =>
    searchQuery.trim() === ""
      ? admins
      : admins.filter(admin =>
          admin.student_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          `${admin.first_name} ${admin.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
        )
  , [searchQuery, admins]);

  const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage);
  const totalAdmins = filteredAdmins.length;

  // Paginate admins
  const currentAdmins = useMemo(() => {
    const indexOfLastAdmin = currentPage * adminsPerPage;
    const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
    return filteredAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);
  }, [currentPage, filteredAdmins]);

  // Handle status/verification update with confirmation
  const handleStatusUpdate = useCallback(async (z_id, field, value) => {
    try {
      const response = await executeMutation(UPDATE_NURSERY_ADMISSION_LIST_MUTATION, {
        z_id,
        [field]: value,
      });
      if (response?.updateNurseryAdmissionList?.success_msg) {
        setAdmins(prev =>
          prev.map(admin =>
            admin.z_id === z_id ? { ...admin, [field]: value } : admin
          )
        );
        setPopupMessage({ text: `Successfully updated ${field.replace(/_/g, " ")}.`, type: "success" });
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      } else {
        setPopupMessage({ text: response?.updateNurseryAdmissionList?.error_msg || "Failed to update.", type: "error" });
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      setPopupMessage({ text: `Error updating ${field.replace(/_/g, " ")}.`, type: "error" });
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
    setUpdateConfirm({ show: false, z_id: null, field: null, value: null });
  }, []);

  // Show confirmation for status/verification update
  const confirmStatusUpdate = (z_id, field, value) => {
    setUpdateConfirm({ show: true, z_id, field, value });
  };

  // Handle delete with confirmation
  const handleDelete = useCallback(async (id) => {
    try {
      const response = await executeMutation(DELETE_NURSERY_ADMISSION_LIST_MUTATION, { z_id: id });
      if (response?.deleteNurseryAdmissionList?.success_msg) {
        setAdmins(prev => prev.filter(admin => admin.z_id !== id));
        setPopupMessage({ text: response.deleteNurseryAdmissionList.success_msg, type: "success" });
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      } else {
        setPopupMessage({ text: "Failed to delete: " + response?.deleteNurseryAdmissionList?.error_msg, type: "error" });
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
      setPopupMessage({ text: "An error occurred while deleting.", type: "error" });
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
    setDeleteConfirm({ show: false, id: null });
  }, []);

  // Show delete confirmation modal
  const confirmDelete = (id) => {
    setDeleteConfirm({ show: true, id });
  };

  // Handle print image
  const handlePrintImage = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Image</title>
          <style>
            body { text-align: center; margin: 0; padding: 20px; }
            img { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          <img src="${modalImage}" onload="window.print(); window.close();" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Handle download image
  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = modalImage;
    link.download = "document.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to Excel
  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(currentAdmins.map(admin => ({
      Student_ID: admin.student_id,
      Name: `${admin.first_name} ${admin.middle_name || ''} ${admin.last_name}`,
      Class: admin.class_title,
      Gender: admin.gender,
      DOB: admin.date_of_birth,
      Blood_Group: admin.blood_group,
      Aadhaar: admin.adhar_no,
      Category: admin.category,
      Mother_Tongue: admin.mother_tangue,
      Father_Name: admin.father_full_name,
      Mother_Name: admin.mother_full_name,
      Father_Occupation: admin.father_work,
      Mother_Occupation: admin.mother_work,
      Guardian_WhatsApp: admin.guardian_whatsapp_number,
      Guardian_Mobile: admin.guardian_mobile_number,
      Guardian_Email: admin.guardian_email_id,
      Religion: admin.guardian_religion,
      Annual_Income: admin.guardian_annual_income,
      Permanent_Address: admin.permanent_address,
      Nationality: admin.nationality,
      Current_Address: admin.current_address,
      Country: admin.country,
      Payment_Status: admin.payment_status,
      Total_Fees: admin.total_fees,
      Paid_Amount: admin.paid_amount,
      Payment_Method: admin.payment_method,
      Admission_Status: admin.admission_status,
      Profile_Verification: admin.profile_verification,
      Student_Aadhaar_Front_Verification: admin.student_aadhar_front_verification,
      Student_Aadhaar_Back_Verification: admin.student_aadhar_back_verification,
      Father_Aadhaar_Front_Verification: admin.father_aadhar_front_verification,
      Father_Aadhaar_Back_Verification: admin.father_aadhar_back_verification,
      Mother_Aadhaar_Front_Verification: admin.mother_aadhar_front_verification,
      Mother_Aadhaar_Back_Verification: admin.mother_aadhar_back_verification,
      Birth_Certificate_Verification: admin.birth_certificate_verification,
      Mobile_Number_Verification: admin.mobile_number_verification,
      Email_Verification: admin.email_verification,
      WhatsApp_Number_Verification: admin.whatsapp_number_verification,
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Admissions");
    XLSX.writeFile(wb, "admissions.xlsx");
  };

  // Export to PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Nursery Admission List", 20, 10);
    doc.autoTable({
      head: [
        ["Student ID", "Name", "Class", "Gender", "DOB", "Aadhaar", "Father", "Mother", "Admission Status", "Profile Verification"],
      ],
      body: currentAdmins.map(admin => [
        admin.student_id || "N/A",
        `${admin.first_name} ${admin.middle_name || ''} ${admin.last_name}`,
        admin.class_title || "N/A",
        admin.gender || "N/A",
        admin.date_of_birth || "N/A",
        admin.adhar_no || "N/A",
        admin.father_full_name || "N/A",
        admin.mother_full_name || "N/A",
        admin.admission_status || "N/A",
        admin.profile_verification || "N/A",
      ]),
      theme: "striped",
      headStyles: { fillColor: [59, 130, 246], textColor: [255, 255, 255] },
      margin: { top: 20 },
    });
    doc.save("admissions.pdf");
  };

  // Function to determine dropdown classes based on value
  const getDropdownClasses = (value) => {
    switch (value) {
      case "Approved":
      case "Verified":
        return "bg-green-500 text-white border-green-600 hover:bg-green-600 focus:ring-green-600";
      case "Rejected":
        return "bg-red-500 text-white border-red-600 hover:bg-red-600 focus:ring-red-600";
      case "Pending":
      default:
        return "bg-orange-600 text-white border-orange-600 hover:bg-orange-600 focus:ring-orange-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <main className="max-w-[90vw] mx-auto mt-32 bg-white shadow-lg p-6">
        {/* Popup Notification */}
        {showPopup && (
          <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white flex items-center gap-2 shadow-lg
            ${popupMessage.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {popupMessage.type === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
            <span>{popupMessage.text}</span>
          </div>
        )}

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-4 py-2 flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <FaArrowLeft /> Go Back
          </button>
          <h1 className="text-2xl md:text-3xl font-thin text-gray-800">Nursery Admission Lists</h1>
          <div className="flex flex-wrap gap-3">
            <div className="relative w-full sm:w-64">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Student ID or Name..."
                className="w-full pl-10 pr-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={handleDownloadExcel}
              className="bg-green-500 text-white px-4 py-2 flex items-center gap-2 hover:bg-green-600 transition"
            >
              <FaDownload /> Excel
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-red-500 text-white px-4 py-2 flex items-center gap-2 hover:bg-red-600 transition"
            >
              <FaDownload /> PDF
            </button>
            <Link
              href="/student_dash/students_forms/admission_update_form_nursery"
              className="bg-blue-500 text-white px-4 py-2 flex items-center gap-2 hover:bg-blue-600 transition"
            >
              <FaPlus /> Add New
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Profile</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Student ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Class</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Gender</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">DOB</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Blood Group</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Aadhaar</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Category</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Mother Tongue</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Father</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Mother</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Father Occupation</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Mother Occupation</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Guardian WhatsApp</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Guardian Mobile</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Guardian Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Religion</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Annual Income</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Permanent Address</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Permanent Police Stn</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Permanent Landmark</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Permanent State</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Permanent District</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Permanent Tehsil</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Permanent Post Office</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Permanent Pincode</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Permanent Address Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Nationality</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Current Address</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Current Police Stn</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Current Landmark</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Current State</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Current District</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Current Tehsil</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Current Post Office</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Current Pincode</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Current Address Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Country</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Student Aadhaar Front</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Student Aadhaar Back</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Father Aadhaar Front</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Father Aadhaar Back</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Mother Aadhaar Front</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Mother Aadhaar Back</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Birth Certificate</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Payment Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Total Fees</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Paid Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Payment Method</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Admission Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Profile Verification</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Student Aadhaar Front Verif.</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Student Aadhaar Back Verif.</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Father Aadhaar Front Verif.</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Father Aadhaar Back Verif.</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Mother Aadhaar Front Verif.</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Mother Aadhaar Back Verif.</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Birth Certificate Verif.</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Mobile Number Verif.</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">Email Verification</th>
                <th className="px-4 py-3 text-left text-sm font-semibold whitespace-nowrap">WhatsApp Number Verif.</th>
                <th className="px-4 py-3 text-center text-sm font-semibold whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentAdmins.length === 0 ? (
                <tr>
                  <td colSpan="63" className="px-4 py-6 text-center text-gray-500">
                    No data available.
                  </td>
                </tr>
              ) : (
                currentAdmins.map((admin, index) => (
                  <tr key={admin.z_id} className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                    <td className="px-4 py-3">
                      <Image
                        src={admin.student_profile_image || "/img/placeholder.png"}
                        width={40}
                        height={40}
                        className="rounded-full object-cover w-10 h-10 cursor-pointer"
                        alt="Profile"
                        onClick={() => setModalImage(admin.student_profile_image || "/img/placeholder.png")}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.student_id || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{`${admin.first_name} ${admin.middle_name || ''} ${admin.last_name}`}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.class_title || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.gender || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.date_of_birth || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.blood_group || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.adhar_no || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.category || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.mother_tangue || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.father_full_name || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.mother_full_name || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.father_work || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.mother_work || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.guardian_whatsapp_number || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.guardian_mobile_number || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.guardian_email_id || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.guardian_religion || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.guardian_annual_income || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.permanent_address || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.permanent_address_nearest_policestation || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.permanent_address_nearest_landmark || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.permanent_address_state || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.permanent_address_district || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.permanent_address_tehsil || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.permanent_address_post_office || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.permanent_address_pincode || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.permanent_address_type || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.nationality || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.current_address || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.current_address_nearest_policestation || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.current_address_nearest_landmark || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.current_address_state || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.current_address_district || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.current_address_tehsil || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.current_address_post_office || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.current_address_pincode || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.current_address_type || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.country || "N/A"}</td>
                    <td className="px-4 py-3">
                      <Image
                        src={admin.student_aadhar_front || "/img/placeholder.png"}
                        width={40}
                        height={40}
                        className="rounded object-cover w-10 h-10 cursor-pointer"
                        alt="Aadhaar Front"
                        onClick={() => setModalImage(admin.student_aadhar_front || "/img/placeholder.png")}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Image
                        src={admin.student_aadhar_back || "/img/placeholder.png"}
                        width={40}
                        height={40}
                        className="rounded object-cover w-10 h-10 cursor-pointer"
                        alt="Aadhaar Back"
                        onClick={() => setModalImage(admin.student_aadhar_back || "/img/placeholder.png")}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Image
                        src={admin.father_aadhar_front || "/img/placeholder.png"}
                        width={40}
                        height={40}
                        className="rounded object-cover w-10 h-10 cursor-pointer"
                        alt="Father Aadhaar Front"
                        onClick={() => setModalImage(admin.father_aadhar_front || "/img/placeholder.png")}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Image
                        src={admin.father_aadhar_back || "/img/placeholder.png"}
                        width={40}
                        height={40}
                        className="rounded object-cover w-10 h-10 cursor-pointer"
                        alt="Father Aadhaar Back"
                        onClick={() => setModalImage(admin.father_aadhar_back || "/img/placeholder.png")}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Image
                        src={admin.mother_aadhar_front || "/img/placeholder.png"}
                        width={40}
                        height={40}
                        className="rounded object-cover w-10 h-10 cursor-pointer"
                        alt="Mother Aadhaar Front"
                        onClick={() => setModalImage(admin.mother_aadhar_front || "/img/placeholder.png")}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Image
                        src={admin.mother_aadhar_back || "/img/placeholder.png"}
                        width={40}
                        height={40}
                        className="rounded object-cover w-10 h-10 cursor-pointer"
                        alt="Mother Aadhaar Back"
                        onClick={() => setModalImage(admin.mother_aadhar_back || "/img/placeholder.png")}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Image
                        src={admin.student_birth_certificate || "/img/placeholder.png"}
                        width={40}
                        height={40}
                        className="rounded object-cover w-10 h-10 cursor-pointer"
                        alt="Birth Certificate"
                        onClick={() => setModalImage(admin.student_birth_certificate || "/img/placeholder.png")}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.payment_status || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.total_fees || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.paid_amount || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{admin.payment_method || "N/A"}</td>
                    <td className="px-4 py-3">
                      <select
                        value={admin.admission_status || "Pending"}
                        onChange={(e) => confirmStatusUpdate(admin.z_id, "admission_status", e.target.value)}
                        className={`w-full p-1 rounded focus:outline-none transition ${getDropdownClasses(admin.admission_status || "Pending")}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={admin.profile_verification || "Pending"}
                        onChange={(e) => confirmStatusUpdate(admin.z_id, "profile_verification", e.target.value)}
                        className={`w-full p-1 rounded focus:outline-none transition ${getDropdownClasses(admin.profile_verification || "Pending")}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={admin.student_aadhar_front_verification || "Pending"}
                        onChange={(e) => confirmStatusUpdate(admin.z_id, "student_aadhar_front_verification", e.target.value)}
                        className={`w-full p-1 rounded focus:outline-none transition ${getDropdownClasses(admin.student_aadhar_front_verification || "Pending")}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={admin.student_aadhar_back_verification || "Pending"}
                        onChange={(e) => confirmStatusUpdate(admin.z_id, "student_aadhar_back_verification", e.target.value)}
                        className={`w-full p-1 rounded focus:outline-none transition ${getDropdownClasses(admin.student_aadhar_back_verification || "Pending")}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={admin.father_aadhar_front_verification || "Pending"}
                        onChange={(e) => confirmStatusUpdate(admin.z_id, "father_aadhar_front_verification", e.target.value)}
                        className={`w-full p-1 rounded focus:outline-none transition ${getDropdownClasses(admin.father_aadhar_front_verification || "Pending")}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={admin.father_aadhar_back_verification || "Pending"}
                        onChange={(e) => confirmStatusUpdate(admin.z_id, "father_aadhar_back_verification", e.target.value)}
                        className={`w-full p-1 rounded focus:outline-none transition ${getDropdownClasses(admin.father_aadhar_back_verification || "Pending")}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={admin.mother_aadhar_front_verification || "Pending"}
                        onChange={(e) => confirmStatusUpdate(admin.z_id, "mother_aadhar_front_verification", e.target.value)}
                        className={`w-full p-1 rounded focus:outline-none transition ${getDropdownClasses(admin.mother_aadhar_front_verification || "Pending")}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={admin.mother_aadhar_back_verification || "Pending"}
                        onChange={(e) => confirmStatusUpdate(admin.z_id, "mother_aadhar_back_verification", e.target.value)}
                        className={`w-full p-1 rounded focus:outline-none transition ${getDropdownClasses(admin.mother_aadhar_back_verification || "Pending")}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={admin.birth_certificate_verification || "Pending"}
                        onChange={(e) => confirmStatusUpdate(admin.z_id, "birth_certificate_verification", e.target.value)}
                        className={`w-full p-1 rounded focus:outline-none transition ${getDropdownClasses(admin.birth_certificate_verification || "Pending")}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={admin.mobile_number_verification || "Pending"}
                        onChange={(e) => confirmStatusUpdate(admin.z_id, "mobile_number_verification", e.target.value)}
                        className={`w-full p-1 rounded focus:outline-none transition ${getDropdownClasses(admin.mobile_number_verification || "Pending")}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={admin.email_verification || "Pending"}
                        onChange={(e) => confirmStatusUpdate(admin.z_id, "email_verification", e.target.value)}
                        className={`w-full p-1 rounded focus:outline-none transition ${getDropdownClasses(admin.email_verification || "Pending")}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={admin.whatsapp_number_verification || "Pending"}
                        onChange={(e) => confirmStatusUpdate(admin.z_id, "whatsapp_number_verification", e.target.value)}
                        className={`w-full p-1 rounded focus:outline-none transition ${getDropdownClasses(admin.whatsapp_number_verification || "Pending")}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/student_dash/students_forms/admission_update_form_nursery?z_id=${admin.z_id}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEdit size={16} />
                        </Link>
                        <button
                          onClick={() => confirmDelete(admin.z_id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full">
              <h2 className="text-lg font-semibold text-gray-800">Confirm Delete</h2>
              <p className="mt-2 text-gray-600">Are you sure you want to delete this admission record?</p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm({ show: false, id: null })}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Update Confirmation Modal */}
        {updateConfirm.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full">
              <h2 className="text-lg font-semibold text-gray-800">Confirm Update</h2>
              <p className="mt-2 text-gray-600">
                Are you sure you want to update <strong>{updateConfirm.field.replace(/_/g, " ")}</strong> to <strong>{updateConfirm.value}</strong>?
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setUpdateConfirm({ show: false, z_id: null, field: null, value: null })}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleStatusUpdate(updateConfirm.z_id, updateConfirm.field, updateConfirm.value)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {modalImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={() => setModalImage(null)}
          >
            <div className="bg-white p-6 rounded-lg max-w-lg w-full">
              <Image
                src={modalImage}
                width={400}
                height={400}
                className="object-contain mx-auto"
                alt="Full View"
              />
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handlePrintImage}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                >
                  <FaPrint /> Print
                </button>
                <button
                  onClick={handleDownloadImage}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
                >
                  <FaDownload /> Download
                </button>
              </div>
              <button
                className="mt-4 w-full text-red-500 hover:text-red-700"
                onClick={() => setModalImage(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-wrap justify-center items-center mt-6 gap-4 text-gray-700">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition
              ${currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          >
            <FaChevronLeft /> Prev
          </button>
          <span>
            Page {currentPage} of {totalPages} (Total: {totalAdmins})
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition
              ${currentPage === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
          >
            Next <FaChevronRight />
          </button>
        </div>
      </main>
    </div>
  );
};

export default New_Admission_Lists;
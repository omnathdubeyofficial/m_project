"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { FaSearch, FaEdit, FaTrash,FaPrint,  FaChevronRight, FaChevronLeft, FaPlus, FaArrowLeft, FaDownload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Image from "next/image";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { GET_STUDENT_REGISTRATION_DATA } from "../../../query/studentRegistrationQuery/fetchStudentRegistration";
import { DELETE_USER_MANAGEMENT_DATA_MUTATION } from "../../../mutation/deleteUserManagementData";
import { executeQuery, executeMutation } from "../../../graphqlClient";
import Link from "next/link";

const Admission_Completed_List = () => {
  const [admins, setAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState({ text: "", type: "" });
  const [modalImage, setModalImage] = useState(null);


  

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
  
  

  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = modalImage;
    link.download = "document.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const adminsPerPage = 5;

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await executeQuery(GET_STUDENT_REGISTRATION_DATA);
        setAdmins(response?.getStudentRegistration || []);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchAdmins();
  }, []);

  const filteredAdmins = useMemo(() =>
    searchQuery.trim() === ""
      ? admins
      : admins.filter(admin => admin.userid?.toLowerCase().includes(searchQuery.toLowerCase()))
  , [searchQuery, admins]);

  const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage);
  const totalAdmins = filteredAdmins.length;

  const currentAdmins = useMemo(() => {
    const indexOfLastAdmin = currentPage * adminsPerPage;
    const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
    return filteredAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);
  }, [currentPage, filteredAdmins]);

  const handleDelete = useCallback(async (id) => {
    try {
      const response = await executeMutation(DELETE_USER_MANAGEMENT_DATA_MUTATION, { z_id: id });
      if (response?.deleteUserManagementData?.success_msg) {
        setAdmins(prev => prev.filter(admin => admin.z_id !== id));

        // ✅ Success popup
        setPopupMessage({ text: response.deleteUserManagementData.success_msg, type: "success" });
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      } else {
        // ❌ Error popup
        setPopupMessage({ text: "Failed to delete: " + response?.deleteUserManagementData?.error_msg, type: "error" });
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
      setPopupMessage({ text: "An error occurred while deleting.", type: "error" });
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  }, []);

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(currentAdmins);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Admins");
    XLSX.writeFile(wb, "admins.xlsx");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Admin List", 20, 10);
    doc.autoTable({
      head: [["Name", "Email", "Role", "User ID"]],
      body: currentAdmins.map(admin => [
        `${admin.first_name} ${admin.last_name}`,
        admin.email,
        admin.role || "N/A",
        admin.userid || "N/A"
      ]),
    });
    doc.save("admins.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 mt-32">
      <main className=" max-w-8xl bg-white p-6  shadow-md  mx-auto py-8 px-8 ">

      {showPopup && (
          <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white flex items-center gap-2 shadow-lg text-lg 
            ${popupMessage.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
            {popupMessage.type === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
            {popupMessage.text}
          </div>
        )}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        
        {/* Back Button */}

          <button   onClick={() => window.history.back()}  className="bg-blue-500 text-white px-4 py-2 shadow-md hover:bg-blue-600 transition duration-200 flex items-center gap-2 ">
            <FaArrowLeft className="text-white" />
            Go Back
          </button>


  
        <h1 className="text-3xl  text-gray-800">
        New Admission Lists</h1>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-2">
              {/* Search Bar */}
        <div className="relative flex items-center border w-full sm:w-80">
              <FaSearch className="absolute left-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search by User ID..."
                className="w-full pl-10 pr-4 py-2 rounded focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          <button onClick={handleDownloadExcel} className="bg-green-600 text-white px-4 py-2  flex items-center gap-2 hover:bg-green-700 transition">
            <FaDownload /> Excel
          </button>
          <button onClick={handleDownloadPDF} className="bg-red-600 text-white px-4 py-2  flex items-center gap-2 hover:bg-red-700 transition">
            <FaDownload /> PDF
          </button>
          <Link href="/student_dash/students_forms/admission_form" className="bg-blue-600 text-white flex items-center px-4 py-2  hover:bg-blue-700 transition">
            <FaPlus className="mr-2" /> Add New
          </Link>
        </div>

      </div>



      <div className="overflow-x-auto">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden">
          <table className="min-w-full bg-white ">
            <thead className="bg-gray-100 ">
              <tr className="text-gray-700 text-sm font-semibold border border-gray-300">
                <th className="px-4 py-4 text-left border border-gray-300">Profile</th>
                <th className="px-4 py-4 text-left border border-gray-300 whitespace-nowrap">Name</th>
                <th className="px-4 py-4 text-left border border-gray-300 whitespace-nowrap">Gender</th>
                <th className="px-4 py-4 text-left border border-gray-300 whitespace-nowrap">Student ID</th>
                <th className="px-4 py-4 text-left border border-gray-300 whitespace-nowrap">Aadhaar</th>
                <th className="px-4 py-4 text-left border border-gray-300 whitespace-nowrap">Birth Certificate</th>
                <th className="px-4 py-4 text-center border border-gray-300 whitespace-nowrap">Status</th>
                <th className="px-4 py-4 text-center border border-gray-300 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 border border-gray-300">
              {currentAdmins.map((admin) => (
                <tr key={admin.z_id} className="hover:bg-gray-50 transition duration-200 border border-gray-300">
                  
                  {/* Profile Image */}
                  <td className="px-3 py-2 flex justify-left">
                    <Image
                      src={admin.profile_image || "/img/q.png"}
                      width={40}
                      height={40}
                      className="rounded-full object-cover w-10 h-10 cursor-pointer"
                      alt="Profile"
                      onClick={() => setModalImage(admin.profile_image || "/img/q.png")}
                    />
                  </td>

                  {/* Name */}
                  <td className="px-3 py-2 whitespace-nowrap border border-gray-300">
                    <span className="font-medium text-gray-900 text-sm">{`${admin.first_name} ${admin.last_name}`}</span>
                  </td>

                  {/* Gender */}
                  <td className="px-3 py-2 text-gray-600 border border-gray-300 text-left text-sm whitespace-nowrap">
                    {admin.gender}
                  </td>

                  {/* Student ID */}
                  <td className="px-3 py-2 text-gray-700 border border-gray-300 text-left text-sm whitespace-nowrap">
                    {admin.student_id || "N/A"}
                  </td>

                  {/* Aadhaar Image */}
                  <td className="px-3 py-2 border border-gray-300 justify-left">
                    <Image
                      src={admin.aadhaar_image || "/img/q.png"}
                      width={40}
                      height={40}
                      className="rounded object-cover w-10 h-10 cursor-pointer"
                      alt="Aadhaar"
                      onClick={() => setModalImage(admin.aadhaar_image || "/img/q.png")}
                    />
                  </td>

                  {/* Birth Certificate Image */}
                  <td className="px-3 py-2  justify-left">
                    <Image
                      src={admin.birth_certificate || "/img/q.png"}
                      width={40}
                      height={40}
                      className="rounded object-cover w-10 h-10 cursor-pointer"
                      alt="Birth Certificate"
                      onClick={() => setModalImage(admin.birth_certificate || "/img/q.png")}
                    />
                  </td>

                  <td className="px-3 py-2 text-center border border-gray-300">
                  <select
                    className="px-2 py-1 rounded text-sm font-medium border border-gray-300 cursor-pointer focus:outline-none"
                    value={admin.status}
                  
                  >
                    <option value="pending" className="text-yellow-500 bg-yellow-100">⚠️ Pending</option>
                    <option value="rejected" className="text-red-500 bg-red-100">❌ Rejected</option>
                    <option value="approved" className="text-green-500 bg-green-100">✅ Approved</option>
                  </select>
                </td>


                  {/* Actions */}
                  <td className="px-3 py-2 border border-gray-300">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(admin.z_id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Modal with Print & Download */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setModalImage(null)}
        >
          <div className="bg-white p-4 rounded-lg max-w-lg text-center">
            <Image src={modalImage} width={400} height={400} className="object-cover mx-auto" alt="Full View" />
            <div className="flex justify-center space-x-3 mt-4">
              <button onClick={handlePrintImage} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
                <FaPrint className="mr-2" /> Print
              </button>
              <button onClick={handleDownloadImage} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center">
                <FaDownload className="mr-2" /> Download
              </button>
            </div>
            <button className="block w-full text-center mt-3 text-red-500" onClick={() => setModalImage(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    <div className="flex flex-wrap justify-center items-center mt-6 gap-3 sm:gap-6 text-gray-700 text-sm sm:text-lg">
      
      {/* Previous Button */}
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm sm:text-base font-medium transition-all duration-200 
          ${currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 hover:bg-gray-400 text-white"}
        `}
      >
        <FaChevronLeft className="text-base" /> Prev
      </button>

      {/* Page Info */}
      <span className=" text-gray-700">
        Page {currentPage} of {totalPages}  
        <span className=" text-gray-600"> (Total: {totalAdmins})</span>
      </span>

      {/* Next Button */}
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm sm:text-base font-medium transition-all duration-200 
          ${currentPage === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 hover:bg-gray-400 text-white"}
        `}
      >
        Next <FaChevronRight className="text-base" />
      </button>

    </div>
      </main>
    </div>
  );
};

export default Admission_Completed_List;

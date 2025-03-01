"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaEdit, FaTrash, FaChevronRight, FaChevronLeft, FaPlus, FaArrowLeft, FaDownload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { GET_ACADEMIC_CALENDAR_DATA } from "../../query/AcademicCalendarQuery/fetchAcademicCalendar";
import { DELETE_ACADEMIC_CALENDAR_MUTATION } from "../../mutation/AcademicCalendarMutation/deleteAcademicCalendarMutation";
import { UPDATE_ACADEMIC_CALENDAR_MUTATION } from "../../mutation/AcademicCalendarMutation/updateAcademicCalendardMutation";
import { executeQuery, executeMutation } from "../../graphqlClient";
import Link from "next/link";
import Navbar from "../../navbar/page";

const Academic_Calendar_List = () => {
  const [admins, setAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState({ text: "", type: "" });
  const [showupdatePopup, setShowupdatePopup] = useState(null); // Initially null
  const router = useRouter();
  const adminsPerPage = 5;

  const [showEditPopup, setShowEditPopup] = useState(false);
const [selectedAdmin, setSelectedAdmin] = useState(null);

const handleEditClick = (admin) => {
  setSelectedAdmin(admin);
  setShowEditPopup(true);
};



const handleUpdate = async () => {
  try {
    const response = await executeMutation(UPDATE_ACADEMIC_CALENDAR_MUTATION, {
      z_id: selectedAdmin.z_id,
      program: selectedAdmin.program,
      from_date: selectedAdmin.from_date,
      to_date: selectedAdmin.to_date,
      start_time: selectedAdmin.start_time,
      end_time: selectedAdmin.end_time,
      program_details: selectedAdmin.program_details,
    });

    if (response?.updateAcademicCalendar?.success_msg) {
      setAdmins((prev) =>
        prev.map((admin) =>
          admin.z_id === selectedAdmin.z_id ? selectedAdmin : admin
        )
      );
      setShowEditPopup(false);
      setShowupdatePopup({ text: response.updateAcademicCalendar.success_msg, type: "success" });

    } else {
      setShowupdatePopup({ 
        text: "Update failed: " + (response?.updateAcademicCalendar?.error_msg || "Unknown error"), 
        type: "error" 
      });
    }

    // Popup को 3 सेकंड बाद Hide कर दो
    setTimeout(() => setShowupdatePopup(null), 3000);
    
  } catch (error) {
    console.error("Error updating admin:", error);
    setShowupdatePopup({ text: "An unexpected error occurred.", type: "error" });

    setTimeout(() => setShowupdatePopup(null), 3000);
  }
};



  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await executeQuery(GET_ACADEMIC_CALENDAR_DATA);
        setAdmins(response?.getAcademicCalendar || []);
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
      const response = await executeMutation(DELETE_ACADEMIC_CALENDAR_MUTATION, { z_id: id });
      if (response?.deleteAcademicCalendar?.success_msg) {
        setAdmins(prev => prev.filter(admin => admin.z_id !== id));

        // ✅ Success popup
        setPopupMessage({ text: response.deleteAcademicCalendar.success_msg, type: "success" });
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      } else {
        // ❌ Error popup
        setPopupMessage({ text: "Failed to delete: " + response?.deleteAcademicCalendar?.error_msg, type: "error" });
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
    doc.text("Holiday List", 20, 10);
    doc.autoTable({
      head: [["from_date", "to_date", "day", "holiday_name", "details"]],
      body: currentAdmins.map(admin => [
        admin.from_date,
        admin.to_date,
        admin.day || "N/A",
        admin.holiday_name || "N/A",
        admin.details || "N/A"
      ]),
    });
    doc.save("admins.pdf");
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-28">
      <Navbar />
      <main className="container  bg-white p-6  shadow-md  mx-auto py-8 px-8 ">

      {showPopup && (
          <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white flex items-center gap-2 shadow-lg text-lg 
            ${popupMessage.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
            {popupMessage.type === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
            {popupMessage.text}
          </div>
        )}

{showupdatePopup && (
          <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white flex items-center gap-2 shadow-lg text-lg 
            ${showupdatePopup.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
            {showupdatePopup.type === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
            {showupdatePopup.text}
          </div>
        )}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        
        {/* Back Button */}
     
          <button  onClick={() => router.back()}  className="bg-blue-500 text-white px-4 py-2 shadow-md hover:bg-blue-600 transition duration-200 flex items-center gap-2 ">
            <FaArrowLeft className="text-white" />
            Go Back
          </button>
    

  
        <h1 className="text-3xl  text-gray-800">
        Academic Calendar List</h1>

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
          <Link href="/University_Management/Academic_Calendar_Form" className="bg-blue-600 text-white flex items-center px-4 py-2  hover:bg-blue-700 transition">
            <FaPlus className="mr-2" /> Add New
          </Link>
        </div>

      </div>

        <div className="overflow-x-auto">
      <div className="min-w-full inline-block align-middle">
             <div className="overflow-hidden border border-gray-300 shadow-lg">
         <table className="min-w-full bg-white border border-gray-300">
           <thead className="bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 border border-gray-300">
             <tr className="text-white text-sm font-semibold border border-gray-300">
               <th className="px-6 py-3 text-left border border-gray-300">program</th>
               <th className="px-6 py-3 text-left border border-gray-300">from_date</th>
               <th className="px-6 py-3 text-left border border-gray-300">to_date</th>
               <th className="px-6 py-3 text-left border border-gray-300">start_time</th>
               <th className="px-6 py-3 text-left border border-gray-300">end_time</th>
               <th className="px-6 py-3 text-left border border-gray-300">program_details</th>
               <th className="px-6 py-3 text-center border border-gray-300">Actions</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-300 border border-gray-300">
             {currentAdmins.map((admin) => (
               <tr key={admin.z_id} className="hover:bg-gray-50 transition duration-200 border border-gray-300">
             
                 <td className="px-6 py-4 truncate max-w-[200px] border border-gray-300">
                   <span className="text-gray-600">{admin.program}</span>
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                   <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded">
                     {admin.from_date || "N/A"}
                   </span>
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap text-gray-700 border border-gray-300">
                   {admin.to_date|| "N/A"}
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap text-gray-700 border border-gray-300">
                   {admin.start_time || "N/A"}
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap text-gray-700 border border-gray-300">
                   {admin.end_time || "N/A"}
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap text-gray-700 border border-gray-300">
                   {admin.program_details || "N/A"}
                 </td>
                 <td className="px-6 py-4 flex justify-center space-x-4  ">
                 <button onClick={() => handleEditClick(admin)} className="text-blue-500 hover:text-blue-700">
  <FaEdit size={16} />
</button>

                   <button
                     onClick={() => handleDelete(admin.z_id)}
                     className="text-red-500 hover:text-red-700"
                   >
                     <FaTrash size={16} />
                   </button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
      </div>
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

      {showEditPopup && selectedAdmin && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
    <h2 className="text-2xl font-semibold flex items-center gap-2 text-green-700 mb-4">
          <FaEdit className="text-green-700" /> Edit Academic Calendar
        </h2>

      {/* Grid Layout for Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1">Program:</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={selectedAdmin.program}
            onChange={(e) => setSelectedAdmin({ ...selectedAdmin, program: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1">From Date:</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={selectedAdmin.from_date}
            onChange={(e) => setSelectedAdmin({ ...selectedAdmin, from_date: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1">To Date:</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={selectedAdmin.to_date}
            onChange={(e) => setSelectedAdmin({ ...selectedAdmin, to_date: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1">Start Time:</label>
          <input
            type="time"
            className="w-full p-2 border rounded"
            value={selectedAdmin.start_time}
            onChange={(e) => setSelectedAdmin({ ...selectedAdmin, start_time: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-1">End Time:</label>
          <input
            type="time"
            className="w-full p-2 border rounded"
            value={selectedAdmin.end_time}
            onChange={(e) => setSelectedAdmin({ ...selectedAdmin, end_time: e.target.value })}
          />
        </div>

        <div className="md:col-span-3">
          <label className="block mb-1">Program Details:</label>
          <textarea
            className="w-full h-64 p-2 border rounded"
            value={selectedAdmin.program_details}
            onChange={(e) => setSelectedAdmin({ ...selectedAdmin, program_details: e.target.value })}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-4">
        <button onClick={() => setShowEditPopup(false)} className="px-4 py-2 bg-red-500 text-white">
          Cancel
        </button>
        <button onClick={handleUpdate} className="px-4 py-2 bg-green-700 text-white ">
          Update
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default Academic_Calendar_List;

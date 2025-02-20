"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { FaSearch, FaEdit, FaTrash, FaChevronRight, FaChevronLeft, FaPlus, FaArrowLeft, FaDownload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Image from "next/image";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { GET_USER_MANAGEMENT_DATA } from "../../query/userManagementDataQuery";
import { DELETE_USER_MANAGEMENT_DATA_MUTATION } from "../../mutation/deleteUserManagementData";
import { executeQuery, executeMutation } from "../../graphqlClient";
import Link from "next/link";
import Navbar from "../../navbar/page";

const TransportVehiclesData = () => {
  const [admins, setAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState({ text: "", type: "" });

  const adminsPerPage = 5;

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await executeQuery(GET_USER_MANAGEMENT_DATA);
        setAdmins(response?.getUserManagementData || []);
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
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        
        {/* Back Button */}
        <Link href="/dashboard" passHref>
          <button className="bg-blue-500 text-white px-4 py-2 shadow-md hover:bg-blue-600 transition duration-200 flex items-center gap-2 ">
            <FaArrowLeft className="text-white" />
            Go Back
          </button>
        </Link>

  
        <h1 className="text-3xl  text-gray-800">
        Staff_Management List</h1>

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
          <Link href="/Staff_Management/Staff_Management_Form" className="bg-blue-600 text-white flex items-center px-4 py-2  hover:bg-blue-700 transition">
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
               <th className="px-6 py-3 text-left border border-gray-300">Profile</th>
               <th className="px-6 py-3 text-left border border-gray-300">Name</th>
               <th className="px-6 py-3 text-left border border-gray-300">Email</th>
               <th className="px-6 py-3 text-left border border-gray-300">Role</th>
               <th className="px-6 py-3 text-left border border-gray-300">User ID</th>
               <th className="px-6 py-3 text-center border border-gray-300">Actions</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-300 border border-gray-300">
             {currentAdmins.map((admin) => (
               <tr key={admin.z_id} className="hover:bg-gray-50 transition duration-200 border border-gray-300">
                 <td className="px-6 py-4 border border-gray-300">
                   <Image
                     src={admin.profile_image || "/img/q.png"}
                     width={40}
                     height={40}
                     className="rounded-full object-cover w-10 h-10 border border-gray-300"
                     alt="Profile"
                   />
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                   <span className="font-medium text-gray-900">{`${admin.first_name} ${admin.last_name}`}</span>
                 </td>
                 <td className="px-6 py-4 truncate max-w-[200px] border border-gray-300">
                   <span className="text-gray-600">{admin.email}</span>
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                   <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded">
                     {admin.role || "N/A"}
                   </span>
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap text-gray-700 border border-gray-300">
                   {admin.userid || "N/A"}
                 </td>
                 <td className="px-6 py-4 flex justify-center space-x-4  ">
                   <button className="text-blue-500 hover:text-blue-700">
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
    </div>
  );
};

export default TransportVehiclesData;

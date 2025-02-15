"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { FaSearch, FaEdit, FaTrash, FaChevronRight, FaChevronLeft, FaPlus, FaDownload } from "react-icons/fa";
import Image from "next/image";
import * as XLSX from "xlsx";
import { GET_USER_MANAGEMENT_DATA } from "../../query/userManagementDataQuery";
import { DELETE_USER_MANAGEMENT_DATA_MUTATION } from "../../mutation/deleteUserManagementData";
import { executeQuery, executeMutation } from "../../graphqlClient";
import Link from "next/link";
import Navbar from "../../navbar/page";

const Button = ({ onClick, className, icon: Icon, children }) => (
  <button onClick={onClick} className={`btn ${className} flex items-center px-4 py-2 rounded-lg`}>
    <Icon className="mr-2" /> {children}
  </button>
);

const AdminRegistrationPage = () => {
  const [admins, setAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const adminsPerPage = 10;

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
        setSuccessMessage(response.deleteUserManagementData.success_msg);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      } else {
        alert("Failed to delete admin: " + response?.deleteUserManagementData?.error_msg);
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
      alert("An error occurred while deleting the admin.");
    }
  }, []);

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(currentAdmins);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Admins");
    XLSX.writeFile(wb, "admins.xlsx");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="container mx-auto py-32 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search by User ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none"
            />
            <FaSearch className="absolute right-4 top-3 text-gray-400" />
          </div>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Button onClick={handleDownloadExcel} className="bg-green-600 text-white" icon={FaDownload}>Download</Button>
            <Link href="/components/adminform" className="btn bg-blue-600 text-white flex items-center px-4 py-2 rounded-lg">
              <FaPlus className="mr-2" /> Add New
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white shadow rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-6 py-3">Profile</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">User ID</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAdmins.map((admin) => (
                <tr key={admin.z_id} className="border-b">
                  <td className="px-6 py-3">
                    <Image src={admin.profile_image || "/img/q.png"} width={40} height={40} className="rounded-full object-cover w-10 h-10" alt="Profile" />
                  </td>
                  <td className="px-6 py-3">{`${admin.first_name} ${admin.last_name}`}</td>
                  <td className="px-6 py-3">{admin.email}</td>
                  <td className="px-6 py-3">{admin.role || "N/A"}</td>
                  <td className="px-6 py-3">{admin.userid || "N/A"}</td>
                  <td className="px-6 py-3 flex space-x-2">
                    <button className="text-blue-500"><FaEdit /></button>
                    <button onClick={() => handleDelete(admin.z_id)} className="text-red-500"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center mt-4 space-x-4 text-gray-700 text-lg">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 rounded-lg">
            <FaChevronLeft />
          </button>
          <span>Page {currentPage} of {totalPages} (Total: {totalAdmins} admins)</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-300 rounded-lg">
            <FaChevronRight />
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminRegistrationPage;

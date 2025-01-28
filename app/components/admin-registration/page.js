"use client";

import { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTrash, FaSun,FaChevronRight,FaChevronLeft, FaPlus, FaMoon, FaDownload } from "react-icons/fa";
import Image from "next/image";
import * as XLSX from "xlsx";
import { GET_USER_MANAGEMENT_DATA } from "../../query/userManagementDataQuery";
import { DELETE_USER_MANAGEMENT_DATA_MUTATION } from "../../mutation/deleteUserManagementData";
import { executeQuery, executeMutation } from "../../graphqlClient";
import Link from "next/link";

const AdminRegistrationPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [user, setUser] = useState({
    username: "Admin User",
    profileImg: "/img/om.webp",
    profession: "Super Admin",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [adminsPerPage] = useState(10);

  // Fetch data using GET_USER_MANAGEMENT_DATA
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await executeQuery(GET_USER_MANAGEMENT_DATA);
        const data = response?.getUserManagementData || [];
        setAdmins(data);
        setFilteredAdmins(data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdmins();
  }, []);

  // Filter admins based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredAdmins(admins);
    } else {
      setFilteredAdmins(
        admins.filter((admin) =>
          admin.userid?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, admins]);

  // Pagination logic
  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = filteredAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (id) => {
    console.log("Edit admin with ID:", id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await executeMutation(DELETE_USER_MANAGEMENT_DATA_MUTATION, {
        z_id: id,
      });

      if (response?.deleteUserManagementData?.success_msg) {
        setAdmins(admins.filter((admin) => admin.z_id !== id));
        setSuccessMessage(response?.deleteUserManagementData?.success_msg);
        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      } else {
        alert("Failed to delete admin: " + response?.deleteUserManagementData?.error_msg);
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
      alert("An error occurred while deleting the admin.");
    }
  };

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(currentAdmins);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Admins");
    XLSX.writeFile(wb, "admins.xlsx");
  };

  // Get total number of pages
  const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"} min-h-screen transition-colors duration-500`}>
      {/* Header */}
      <header className="sticky top-0 flex items-center justify-between px-6 py-4 shadow-md bg-opacity-90 backdrop-blur-md z-10 border-b border-gray-300">
        <div className="flex items-center space-x-4">
          <Image
            src="/img/image.png"
            alt="University Logo"
            width={50}
            height={50}
            className="object-contain"
          />
          <h1 className="text-xl hidden sm:block">Dr. Ram Manohar Lohia Avadh University</h1>
        </div>

        <div className="flex items-center space-x-6">
          {user && (
            <div className="flex items-center space-x-3">
              <Image
                src={user.profileImg}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-xs">{user.profession}</p>
              </div>
            </div>
          )}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full focus:outline-none hover:scale-105 transition-transform duration-300"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400 text-2xl" />
            ) : (
              <FaMoon className="text-gray-600 text-2xl" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-6">
        <div className="mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search by User ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${
                  darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-800"
                } px-4 py-2 w-full rounded-full shadow-md border border-gray-300 focus:ring-2 focus:ring-blue-400 transition`}
              />
              <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex flex-wrap justify-start items-center mb-6 space-x-4">
              <button
                onClick={handleDownloadExcel}
                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors flex items-center"
              >
                <FaDownload className="mr-2 text-lg" />
                Download Excel
              </button>

              <Link href="/components/adminform">
                <button
                  onClick={() => console.log("Add new admin")}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center"
                >
                  <FaPlus className="mr-2 text-lg" />
                  Add New
                </button>
              </Link>
            </div>
          </div>

          {/* Admins Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="border-b bg-gray-100 dark:bg-gray-700">
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">Profile</th>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">Name</th>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">Email</th>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">Role</th>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">User ID</th>
                  <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentAdmins.map((admin) => (
                  <tr key={admin.z_id} className="border-b">
                    <td className="py-3 px-6 whitespace-nowrap">
                      <Image
                        src={admin.profile_image || "/img/default-profile.png"}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </td>
                    <td className="py-3 px-6 whitespace-nowrap">{`${admin.first_name} ${admin.last_name}`}</td>
                    <td className="py-3 px-6 whitespace-nowrap">{admin.email}</td>
                    <td className="py-3 px-6 whitespace-nowrap">{admin.role || "N/A"}</td>
                    <td className="py-3 px-6 whitespace-nowrap">{admin.userid || "N/A"}</td>
                    <td className="py-3 px-6 whitespace-nowrap">
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleEdit(admin.z_id)}
                          className="text-blue-500 hover:text-blue-700 transition-transform transform hover:scale-110"
                          title="Edit"
                        >
                          <FaEdit className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDelete(admin.z_id)}
                          className="text-red-500 hover:text-red-700 transition-transform transform hover:scale-110"
                          title="Delete"
                        >
                          <FaTrash className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
<div className="flex justify-between items-center mt-4">
  <div className="text-sm text-gray-600 dark:text-gray-400">
    Total Entries: {filteredAdmins.length}
  </div>
  
  <div className="flex space-x-2">
    {/* Previous Button */}
    <button
      onClick={() => paginate(currentPage - 1)}
      disabled={currentPage === 1}
      className={`px-4 py-2 rounded-full flex items-center justify-center ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"} transition-colors`}
      aria-label="Previous page"
    >
      <FaChevronLeft className="text-lg" />
    </button>
    
    {/* Page Numbers */}
    {currentPage > 2 && (
      <>
        <button
          onClick={() => paginate(1)}
          className="px-4 py-2 rounded-full bg-gray-300 text-gray-600 hover:bg-gray-400 transition-colors"
        >
          1
        </button>
        <span className="px-2 py-2 text-gray-600">...</span>
      </>
    )}
    {Array.from({ length: totalPages }, (_, index) => {
      const pageNumber = index + 1;
      return (
        pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1 && (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={`px-4 py-2 rounded-full ${currentPage === pageNumber ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"} transition-colors`}
          >
            {pageNumber}
          </button>
        )
      );
    })}
    {currentPage < totalPages - 1 && (
      <>
        <span className="px-2 py-2 text-gray-600">...</span>
        <button
          onClick={() => paginate(totalPages)}
          className="px-4 py-2 rounded-full bg-gray-300 text-gray-600 hover:bg-gray-400 transition-colors"
        >
          {totalPages}
        </button>
      </>
    )}
    
    {/* Next Button */}
    <button
      onClick={() => paginate(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`px-4 py-2 rounded-full flex items-center justify-center ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"} transition-colors`}
      aria-label="Next page"
    >
      <FaChevronRight className="text-lg" />
    </button>
  </div>
</div>


          {/* Success Popup */}
          {showPopup && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg">
              {successMessage}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminRegistrationPage;

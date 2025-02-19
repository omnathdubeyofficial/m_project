"use client";

import { useState } from "react";
import { FaSearch, FaDownload, FaPlus,FaArrowLeft } from "react-icons/fa";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Navbar from "../../../navbar/page";
import Link from "next/link";


const holidayList = [
  { date: "2025-01-01", day: "Monday", name: "New Year", details: "Celebration of the new calendar year." },
  { date: "2025-01-26", day: "Sunday", name: "Republic Day", details: "Honoring the Constitution of India." },
  { date: "2025-08-15", day: "Friday", name: "Independence Day", details: "Commemorating India's independence." },
  { date: "2025-10-02", day: "Thursday", name: "Gandhi Jayanti", details: "Birthday of Mahatma Gandhi." },
  { date: "2025-12-25", day: "Thursday", name: "Christmas", details: "Celebration of the birth of Jesus Christ." },
];

const HolidayList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHolidays = holidayList.filter((holiday) =>
    holiday.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(holidayList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Holidays");
    XLSX.writeFile(workbook, "Holiday_List.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Holiday List", 20, 10);
    doc.autoTable({
      head: [["Date", "Day", "Holiday Name", "Details"]],
      body: holidayList.map((holiday) => [holiday.date, holiday.day, holiday.name, holiday.details]),
    });
    doc.save("Holiday_List.pdf");
  };

  return (
    <div>
      <Navbar /> 
    
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8 w-full pt-28">
      <div className="w-full  bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4 w-full">
        <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto justify-center">

        <Link href="/dashboard" passHref>
          <button className="bg-blue-500 text-white px-4 py-2 shadow-md hover:bg-blue-600 transition duration-200 flex items-center gap-2 ">
            <FaArrowLeft className="text-white" />
            Go Back
          </button>
        </Link>
          <h1 className="text-3xl  text-gray-800">Holiday List - 2025</h1>
      </div>
          <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto justify-center">
            <div className="relative flex items-center border rounded w-full sm:w-64">
              <FaSearch className="absolute left-3 text-gray-500" />
              <input
                type="text"
                placeholder="Search holidays..."
                className="w-full pl-10 pr-4 py-2 rounded focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Link href="/dashboard" >
            <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
              <FaPlus /> Add New
            </button>
            </Link>
            <button onClick={exportToExcel} className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700">
              <FaDownload /> Excel
            </button>
            <button onClick={exportToPDF} className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700">
              <FaDownload /> PDF
            </button>
          </div>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 text-white text-left border border-gray-300">
                <th className="p-2 whitespace-nowrap border border-gray-300">Date</th>
                <th className="p-2 whitespace-nowrap border border-gray-300">Day</th>
                <th className="p-2 whitespace-nowrap border border-gray-300">Holiday Name</th>
                <th className="p-2 min-w-[400px] max-w-[500px] border border-gray-300">Details</th>
                </tr>
            </thead>
            <tbody>
              {filteredHolidays.map((holiday, index) => (
                <tr key={index} className="border border-gray-300 text-left">
                  <td className="p-2 whitespace-nowrap border border-gray-300">{holiday.date}</td>
                  <td className="p-2 whitespace-nowrap border border-gray-300">{holiday.day}</td>
                  <td className="p-2 font-semibold whitespace-nowrap border border-gray-300">{holiday.name}</td>
                  <td className="p-2 min-w-[400px] max-w-[500px] break-words border border-gray-300">{holiday.details}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HolidayList;

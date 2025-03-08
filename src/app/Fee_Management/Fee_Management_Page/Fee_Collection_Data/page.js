"use client";

import React, { useState } from 'react';
import { ArrowLeft, FileText, File, Trash2, Edit,Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaWhatsapp, FaEnvelope,FaCreditCard, FaMoneyBillWave, FaFileInvoice } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import * as XLSX from 'xlsx';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Fee_Collection_Data = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const itemsPerPage = 10;

  const feeData = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `Student ${index + 1}`,
    rollNumber: `RN-${1000 + index}`,
    class: `Class ${index % 5 + 1}`,
    age: 15 + (index % 5),
    gender: index % 2 === 0 ? 'Male' : 'Female',
    parentName: `Parent ${index + 1}`,
    address: `Address ${index + 1}, City`,
    admissionDate: '2022-06-15',
    feePaid: '₹5000',
    pendingFee: '₹2000',
    totalFee: '₹7000',
    feeMonth: 'March 2025',
    dueDate: '2025-03-15',
    paymentMethod: index % 2 === 0 ? 'Online' : 'Offline',
    feeStatus: index % 3 === 0 ? 'Paid' : 'Pending',
    feeReceiptNumber: `REC-${1000 + index}`,
    mobileNumber: `9838381169`,
    email: `student${index + 1}@school.com`,
    feeDetails: Array.from({ length: 12 }, (_, monthIndex) => ({
        transactionId: `TXN-${index + 1}-${monthIndex + 1}`,
        month: `Month ${monthIndex + 1}`,
        paymentDate: '2025-03-10',
        dueDate: '2025-03-15',
        admissionDate: '2022-06-15',
        paymentMethod: monthIndex % 2 === 0 ? 'Online' : 'Offline',
        amountPaid: '₹5000',
        pendingAmount: '₹2000',
        totalAmount: '₹7000',
        status: monthIndex % 2 === 0 ? 'Paid' : 'Pending'
    })),
}));


const openModal = (student) => {
    setSelectedStudent(student);
    setIsOpen(true);
};

const closeModal = () => {
    setIsOpen(false);
    setSelectedStudent(null);
};

  const filteredData = feeData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedClass ? item.class === selectedClass : true) &&
    (selectedMonth ? item.feeMonth.includes(selectedMonth) : true)
  );

  const downloadstudentPDF = () => {
    const doc = new jsPDF();
    doc.text(`${selectedStudent.name}'s Details`, 10, 10);

    const tableData = selectedStudent.feeDetails.map(fee => ([
        fee.transactionId,
        fee.month,
        fee.paymentDate,
        fee.dueDate,
        fee.amountPaid,
        fee.pendingAmount,
        fee.totalAmount,
        fee.paymentMethod,
        fee.status
    ]));

    doc.autoTable({
        head: [['Transaction ID', 'Month', 'Payment Date', 'Due Date', 'Amount Paid', 'Pending Amount', 'Total Amount', 'Payment Method', 'Status']],
        body: tableData,
    });

    doc.save(`${selectedStudent.name}_Details.pdf`);
};

const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(selectedStudent.feeDetails);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Fee Details');
    XLSX.writeFile(workbook, `${selectedStudent.name}_Details.xlsx`);
};



  const downloadCSV = () => {
    const csvContent = [
      ['ID', 'Name', 'Class', 'Fee Paid', 'Pending Fee', 'Fee Month', 'Due Date', 'Payment Method'],
      ...filteredData.map((item) => [item.id, item.name, item.class, item.feePaid, item.pendingFee, item.feeMonth, item.dueDate, item.paymentMethod]),
    ]
      .map((e) => e.join(','))
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Student_Fee_Record.csv';
    link.click();
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('Student Fee Record Data', 20, 10);
    doc.autoTable({
      head: [['ID', 'Name', 'Class', 'Fee Paid', 'Pending Fee', 'Fee Month', 'Due Date', 'Payment Method']],
      body: filteredData.map((item) => [item.id, item.name, item.class, item.feePaid, item.pendingFee, item.feeMonth, item.dueDate, item.paymentMethod]),
      styles: { font: 'helvetica', halign: 'left' },
      headStyles: { fillColor: [22, 160, 133] },
    });
    doc.save('Student_Fee_Record.pdf');
  };



  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 mt-32">
      <div className="max-w-8xl mx-auto bg-white p-6  shadow-lg">
<div className="flex flex-wrap items-center gap-4">
  {/* Go Back Button */}
  <button 
    onClick={() => window.history.back()} 
    className="flex items-center gap-1 p-2 pr-4 bg-red-500 text-white  hover:bg-red-600 transition"
  >
    <ArrowLeft size={20} />
    Go Back
  </button>

  <h1 className="text-2xl flex-grow">
  Fee Collection Record 
  </h1>
</div>

{/* Container for Search, Filter, and Download Buttons */}
<div className="flex flex-wrap items-center gap-4 mt-4">

  {/* Search by Roll Number */}
  <div className="flex items-center border  flex-grow min-w-[200px] sm:min-w-[150px]">
    <FiSearch className="ml-2 text-gray-500" size={20} />
    <input
      type="text"
      placeholder="Search by Roll Number"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="p-2 flex-grow border-0 focus:outline-none"
    />
  </div>

  {/* Search by Student Name */}
  <div className="flex items-center border  flex-grow min-w-[200px] sm:min-w-[150px]">
    <FiSearch className="ml-2 text-gray-500" size={20} />
    <input
      type="text"
      placeholder="Search by Student Name"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="p-2 flex-grow border-0 focus:outline-none"
    />
  </div>

  {/* Filter by Class Dropdown */}
  <div className="flex items-center border pr-3 min-w-[250px] sm:min-w-[150px]">
    <select
      value={selectedClass}
      onChange={(e) => setSelectedClass(e.target.value)}
      className="p-2 flex-grow border-0 focus:outline-none"
    >
      <option value="">Filter by Class</option>
      {[1, 2, 3, 4, 5].map((cls) => (
        <option key={cls} value={`Class ${cls}`}>{`Class ${cls}`}</option>
      ))}
    </select>
  </div>
  <div className="flex items-center border pr-3 min-w-[250px] sm:min-w-[150px]">


  <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="p-2 flex-grow border-0 focus:outline-none"
        >
        <option value="">Filter by Month</option>
        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
          <option key={month} value={month}>{month}</option>
        ))}
      </select>
</div>
  {/* Download to Excel Button */}
  <button 
    onClick={downloadCSV} 
    className="flex items-center p-2 bg-green-500 text-white  hover:bg-green-600 transition min-w-[150px] w-full sm:w-auto"
  >
    <FileText className="mr-2" />
    Excel File
  </button>

  {/* Download to PDF Button */}
  <button 
    onClick={downloadPDF} 
    className="flex items-center p-2 bg-purple-500 text-white  hover:bg-purple-600 transition min-w-[150px] w-full sm:w-auto"
  >
    <File className="mr-2" />
    PDF File
  </button>

</div>
        <div className="overflow-x-auto w-full mt-4">
        <table className="w-full border-collapse bg-white">
  <thead>
    <tr className="bg-white text-left">
      <th className="p-3 border whitespace-nowrap">ID</th>
      <th className="p-3 border whitespace-nowrap">Name</th>
      <th className="p-3 border whitespace-nowrap">Roll Number</th>
      <th className="p-3 border whitespace-nowrap">Class</th>
      <th className="p-3 border whitespace-nowrap">Age</th>
      <th className="p-3 border whitespace-nowrap">Gender</th>
      <th className="p-3 border whitespace-nowrap">Parent Name</th>
      <th className="p-3 border whitespace-nowrap">Address</th>
      <th className="p-3 border whitespace-nowrap">Admission Date</th>
      <th className="p-3 border whitespace-nowrap">Fee Paid</th>
      <th className="p-3 border whitespace-nowrap">Pending Fee</th>
      <th className="p-3 border whitespace-nowrap">Total Fee</th>
      <th className="p-3 border whitespace-nowrap">Fee Month</th>
      <th className="p-3 border whitespace-nowrap">Due Date</th>
      <th className="p-3 border whitespace-nowrap">Payment Method</th>
      <th className="p-3 border whitespace-nowrap">Fee Status</th>
      <th className="p-3 border whitespace-nowrap">Receipt Number</th>
      <th className="p-3 border whitespace-nowrap">Mobile Number</th>
      <th className="p-3 border whitespace-nowrap">Email</th>
      <th className="p-3 border whitespace-nowrap">Action</th>

    </tr>
  </thead>
  <tbody>
    {paginatedData.map((item) => (
      <tr
        key={item.id}
        className={`border-b hover:bg-gray-100 transition ${
          item.feeStatus === 'Paid' ? 'bg-green-100' : 'bg-red-100'
        }`}
      >
        <td className="p-3 border whitespace-nowrap">{item.id}</td>
        <td className="p-3 border whitespace-nowrap">{item.name}</td>
        <td className="p-3 border whitespace-nowrap">{item.rollNumber}</td>
        <td className="p-3 border whitespace-nowrap">{item.class}</td>
        <td className="p-3 border whitespace-nowrap">{item.age}</td>
        <td className="p-3 border whitespace-nowrap">{item.gender}</td>
        <td className="p-3 border whitespace-nowrap">{item.parentName}</td>
        <td className="p-3 border whitespace-nowrap">{item.address}</td>
        <td className="p-3 border whitespace-nowrap">{item.admissionDate}</td>
        <td className="p-3 border text-green-500 whitespace-nowrap">{item.feePaid}</td>
        <td className="p-3 border text-red-500 whitespace-nowrap">{item.pendingFee}</td>
        <td className="p-3 border whitespace-nowrap">{item.totalFee}</td>
        <td className="p-3 border whitespace-nowrap">{item.feeMonth}</td>
        <td className="p-3 border whitespace-nowrap">{item.dueDate}</td>
        <td className="p-3 border whitespace-nowrap">{item.paymentMethod}</td>
        <td className="p-3 border font-bold whitespace-nowrap">{item.feeStatus}</td>
        <td className="p-3 border whitespace-nowrap">{item.feeReceiptNumber}</td>
        <td className="p-3 border whitespace-nowrap">{item.mobileNumber}</td>
        <td className="p-3 border whitespace-nowrap">{item.email}</td>
        <td className="p-3 border whitespace-nowrap">
        <button
  className="p-2 pl-3 gap-1 pr-4 flex items-center justify-center bg-blue-800 text-white"
  onClick={() => openModal(item)}
>
  <Eye size={20} />
  <span className="flex items-center">View Record</span>
</button>            
                            </td>
      </tr>
    ))}
  </tbody>
</table>

{isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 shadow-lg w-3/4 max-h-[80vh] mt-32 overflow-y-auto">
              {selectedStudent && (
                  <>
                      <h2 className="text-2xl mb-4">{selectedStudent.name}'s Details</h2>
                      <p><strong>Roll Number:</strong> {selectedStudent.rollNumber}</p>
                      <p><strong>Class:</strong> {selectedStudent.class}</p>
                      <p><strong>Parent Name:</strong> {selectedStudent.parentName}</p>
                      <p><strong>Mobile Number:</strong> {selectedStudent.mobileNumber}</p>
                      <p><strong>Email:</strong> {selectedStudent.email}</p>
      
                      <h3 className="text-xl mt-4 mb-2">Fee Details:</h3>
                      <table className="w-full border-collapse bg-white whitespace-nowrap">
                          <thead className=' text-left'>
                              <tr>
                                  <th className="p-2 border">Transaction ID</th>
                                  <th className="p-2 border">Month</th>
                                  <th className="p-2 border">Payment Date</th>
                                  <th className="p-2 border">Due Date</th>
                                  <th className="p-2 border">Amount Paid</th>
                                  <th className="p-2 border">Pending Amount</th>
                                  <th className="p-2 border">Total Amount</th>
                                  <th className="p-2 border">Payment Method</th>
                                  <th className="p-2 border font-bold">Status</th>
                              </tr>
                          </thead>
                          <tbody>
                              {selectedStudent.feeDetails.map((fee, index) => (
                                  <tr
                                      key={index}
                                      className={`border-b hover:bg-gray-100 transition ${
                                          fee.status === 'Paid' ? 'bg-green-100' : 'bg-red-100'
                                      }`}
                                  >
                                      <td className="p-2 border">{fee.transactionId}</td>
                                      <td className="p-2 border">{fee.month}</td>
                                      <td className="p-2 border">{fee.paymentDate}</td>
                                      <td className="p-2 border">{fee.dueDate}</td>
                                      <td className="p-2 border">{fee.amountPaid}</td>
                                      <td className="p-2 border">{fee.pendingAmount}</td>
                                      <td className="p-2 border">{fee.totalAmount}</td>
                                      <td className="p-2 border">{fee.paymentMethod}</td>
                                      <td className="p-2 border font-bold">{fee.status}</td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
      
                      <div className="mt-4 flex space-x-4 whitespace-nowrap">
                          <button className="bg-red-500 text-white px-4 py-2" onClick={closeModal}>Close</button>
                          <button className="bg-blue-500 text-white px-4 py-2" onClick={downloadstudentPDF}>Download PDF</button>
                          <button className="bg-green-500 text-white px-4 py-2" onClick={downloadExcel}>Download Excel</button>
                      </div>
                  </>
              )}
          </div>
      </div>
      
            )}
   
    </div>
    <div className="flex items-center justify-center gap-2 mt-4">
      <button 
        onClick={() => handlePageChange(currentPage - 1)} 
        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
      >
        <ChevronLeft size={24} />
      </button>
      <span className="text-lg ">
        Page {currentPage} of {totalPages}
      </span>
      <button 
        onClick={() => handlePageChange(currentPage + 1)} 
        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
      >
        <ChevronRight size={24} />
      </button>
    </div>
      </div>
    </div>
  );
};

export default Fee_Collection_Data;
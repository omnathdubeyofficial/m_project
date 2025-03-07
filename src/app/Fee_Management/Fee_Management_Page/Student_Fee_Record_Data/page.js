"use client";

import React, { useState } from 'react';
import { ArrowLeft, FileText, File, Trash2, Edit } from 'lucide-react';
import { FaWhatsapp, FaEnvelope,FaCreditCard, FaMoneyBillWave, FaFileInvoice } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const StudentFeeRecord = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const feeData = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `Student ${index + 1}`,
    class: `Class ${index % 5 + 1}`,
    feePaid: '₹5000',
    pendingFee: '₹2000',
    feeMonth: 'March 2025',
    dueDate: '2025-03-15',
    paymentMethod: index % 2 === 0 ? 'Online' : 'Offline',
    mobileNumber: `9838381169`,
    email: `student${index + 1}@school.com`,
  }));

  const filteredData = feeData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedClass ? item.class === selectedClass : true)
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

  const generateInvoice = (item) => {
    const doc = new jsPDF();
    doc.text('Invoice', 20, 10);
    doc.text(`Name: ${item.name}`, 20, 20);
    doc.text(`Class: ${item.class}`, 20, 30);
    doc.text(`Fee Paid: ${item.feePaid}`, 20, 40);
    doc.text(`Pending Fee: ${item.pendingFee}`, 20, 50);
    doc.save(`Invoice_${item.name}.pdf`);
  };

  const sendMessage = (item, platform) => {
    const message = `Dear ${item.name}, your pending fee is ${item.pendingFee}. Please pay at the earliest.`;
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/${item.mobileNumber}?text=${encodeURIComponent(message)}`);
    } else if (platform === 'email') {
      window.location.href = `mailto:${item.email}?subject=Pending Fee Alert&body=${encodeURIComponent(message)}`;
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
    Student Fee Record Data
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
            <th className="p-3 border whitespace-nowrap">Class</th>
            <th className="p-3 border whitespace-nowrap">Fee Paid</th>
            <th className="p-3 border whitespace-nowrap">Pending Fee</th>
            <th className="p-3 border whitespace-nowrap">Fee Month</th>
            <th className="p-3 border whitespace-nowrap">Due Date</th>
            <th className="p-3 border whitespace-nowrap">Payment Method</th>
            <th className="p-3 border whitespace-nowrap">Quick Payment</th>
            <th className="p-3 border whitespace-nowrap">Social Media</th>
            <th className="p-3 border whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-100 transition">
              <td className="p-3 border whitespace-nowrap">{item.id}</td>
              <td className="p-3 border whitespace-nowrap">{item.name}</td>
              <td className="p-3 border whitespace-nowrap">{item.class}</td>
              <td className="p-3 border text-green-500 whitespace-nowrap">{item.feePaid}</td>
              <td className="p-3 border text-red-500 whitespace-nowrap">{item.pendingFee}</td>
              <td className="p-3 border whitespace-nowrap">{item.feeMonth}</td>
              <td className="p-3 border whitespace-nowrap">{item.dueDate}</td>
              <td className="p-3 border whitespace-nowrap">{item.paymentMethod}</td>
              <td className="p-3 border flex gap-2 whitespace-nowrap">
  
  <button 
    className="p-2 pl-3 pr-4 bg-green-500 text-white flex items-center gap-2 "
  >
    <FaCreditCard size={20} />
    Pay Online
  </button>
  
  <button 
    className="p-2 pl-3 pr-4 bg-yellow-600 text-white flex items-center gap-2 "
  >
    <FaMoneyBillWave size={20} />
    Pay Offline
  </button>
  
  <button 
    onClick={() => generateInvoice(item)} 
    className="p-2 pl-3 pr-4 bg-purple-500 text-white flex items-center gap-2 "
  >
    <FaFileInvoice size={20} />
    Generate Invoice
  </button>

</td>
              <td className="p-3 border whitespace-nowrap">
  <div className="flex gap-3">
    <button 
      onClick={() => sendMessage(item, "whatsapp")} 
      className="p-2 pl-3 pr-4 flex items-center justify-center bg-green-500 gap-1 text-white"
    >
      <FaWhatsapp size={20} />  
      <span className="flex items-center">WhatsApp</span>
    </button>

    <button 
      onClick={() => sendMessage(item, "email")} 
      className="p-2 pl-3 pr-4 flex items-center justify-center bg-blue-500 gap-1 text-white "
    > 
      <FaEnvelope size={20} />
      <span className="flex items-center">Gmail</span>
    </button>
  </div>
</td>

              <td className="p-3 border  whitespace-nowrap">
              <div className='flex gap-3'>
                <button className="p-2 pl-3 gap-1 pr-4 flex items-center justify-center bg-blue-800 text-white "><Edit size={20}/>  <span className="flex items-center">Edit</span></button>
                <button className="p-2 pl-3 gap-1 pr-4 flex items-center justify-center bg-red-500 text-white "><Trash2 size={20}/>  <span className="flex items-center">Delete</span></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
    </div>
  );
};

export default StudentFeeRecord;
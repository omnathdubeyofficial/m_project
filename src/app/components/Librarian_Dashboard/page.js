"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { FaBook, FaUsers, FaBookReader, FaPlus,FaUserPlus,FaBookOpen, FaClipboardList, FaChartLine, FaMoneyBillWave } from "react-icons/fa";
// import "tailwindcss/tailwind.css";
// import SchoolNavbar from "../../navbar/page";
Chart.register(...registerables);

const LibraryDashboard = () => {
  const [stats] = useState({
    totalBooks: 5000,
    availableBooks: 3500,
    issuedBooks: 1200,
    members: 450,
    lateReturns: 300,
    fineCollected: 15000,
    membershipIncome: 30000,
    dueBooks: 4000
  });

  const router = useRouter();


  const [libraryData] = useState({
    categoryDistribution: {
      labels: ["Fiction", "Non-Fiction", "Science", "History", "Technology"],
      datasets: [
        { data: [1200, 900, 700, 500, 1700], backgroundColor: ["#4CAF50", "#DB4437", "#4285F4", "#FF9800", "#F0C674"] },
      ],
    },
     bookStatus : {
      labels: ["Available", "Issued", "Due"],
      datasets: [
        { 
          data: [stats.availableBooks, stats.issuedBooks, stats.dueBooks], 
          backgroundColor: ["#4CAF50", "#FF5733", "#FFC107"] 
        },
      ],
    },
    memberTypes: {
      labels: ["Students", "Teachers", "Guests"],
      datasets: [
        { data: [300, 100, 50], backgroundColor: ["#4285F4", "#FF5733", "#F0C674"] },
      ],
    },
    bookTrends: {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Books Issued",
          data: [400, 450, 420, 480, 500, 530],
          backgroundColor: "#4CAF50",
          borderColor: "#388E3C",
          borderWidth: 2,
        },
      ],
    },
    incomeTrends: {
      labels: ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"],
      datasets: [
        {
          label: "Income Trends",
          data: [2000, 10000, 30000, 90000, 360000],
          backgroundColor: "#FF9800",
          borderColor: "#F57C00",
          borderWidth: 2,
        },
      ],
    },
    newMembers: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "New Members",
          data: [40, 50, 45, 55, 60, 70],
          backgroundColor: "#4CAF50",
        },
        {
          label: "Free Visits",
          data: [20, 25, 30, 35, 40, 45],
          backgroundColor: "#FF5733",
        },
      ],
    },
  });

  useEffect(() => {
    // Fetch data if needed (e.g., from an API)
  }, []);

  return (
    <div>
    {/* <SchoolNavbar /> */}
    <div className="min-h-screen bg-gray-50 py-32 p-8 font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
        {[
          { title: "Total Books", value: stats.totalBooks, icon: <FaBook />, description: "Total books in the library." },
          { title: "Available Books", value: stats.availableBooks, icon: <FaClipboardList />, description: "Books available for borrowing." },
          { title: "Issued Books", value: stats.issuedBooks, icon: <FaBookReader />, description: "Books currently issued." },
          { title: "Total Members", value: stats.members, icon: <FaUsers />, description: "Registered library members." },
          { title: "Late Returns", value: stats.lateReturns, icon: <FaClipboardList />, description: "Number of books returned late." },
          { title: "Fine Collected", value: stats.fineCollected, icon: <FaChartLine />, description: "Total fine collected." },
          { title: "Membership Income", value: stats.membershipIncome, icon: <FaMoneyBillWave />, description: "Total income from memberships." },
          { title: "New Member", value: "Add", icon: <FaUserPlus />, description: "Register a new library member.", onClick: () => router.push('/new-member') },
          { title: "Issue Book", value: "Issue", icon: <FaBookOpen />, description: "Issue a book to a member.", onClick: () => router.push('/issue-book') },
          { title: "Add New Book", value: "Add Book", icon: <FaPlus />, description: "Add a new book to library.", path: "/add-book" }

        ].map((item, index) => (
          <div 
            key={index} 
            className="p-6 bg-white  flex items-center space-x-6 border border-gray-300 transition transform cursor-pointer"
            onClick={item.onClick ? item.onClick : null}
          >
            <div className="text-6xl text-green-600">{item.icon}</div>
            <div>
              <p className="text-lg font-semibold text-gray-700">{item.title}</p>
              <p className="text-4xl font-bold text-gray-900">{item.value}</p>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-8">
        <div className="bg-white p-8 ">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Category Distribution</h2>
          <Bar data={libraryData.categoryDistribution} />
        </div>

        <div className="bg-white p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Book Availability Status</h2>
          <Bar data={libraryData.bookStatus} />
        </div>

        <div className="bg-white p-8 ">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Library Member Types</h2>
          <Bar data={libraryData.memberTypes} />
        </div>

        <div className="bg-white p-8 ">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Monthly Book Issuance Trends</h2>
          <Bar data={libraryData.bookTrends} />
        </div>

        <div className="bg-white p-8 ">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Library Income Trends</h2>
          <Bar data={libraryData.incomeTrends} />
        </div>
        
        <div className="bg-white p-8 ">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">New Members & Free Visits</h2>
          <Bar data={libraryData.newMembers} />
        </div>
      </div>
    </div>
  </div>
  );
};

export default LibraryDashboard;

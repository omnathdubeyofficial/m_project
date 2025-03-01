"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { FaDesktop, FaServer, FaLaptop, FaPlus, FaUserPlus, FaClipboardList, FaChartLine, FaMoneyBillWave } from "react-icons/fa";
import "tailwindcss/tailwind.css";
import SchoolNavbar from "../../navbar/page";

Chart.register(...registerables);

const ComputerDashboard = () => {
  const [stats, setStats] = useState({
    totalComputers: 200,
    availableComputers: 150,
    usedComputers: 40,
    labMembers: 30,
    pendingMaintenance: 10,
    maintenanceCost: 5000,
    softwareExpenses: 20000,
    faultyComputers: 5
  });

  const router = useRouter();

  const [computerData, setComputerData] = useState({
    deviceTypes: {
      labels: ["Desktops", "Laptops", "Servers", "Tablets"],
      datasets: [
        { data: [120, 50, 20, 10], backgroundColor: ["#4CAF50", "#DB4437", "#4285F4", "#FF9800"] },
      ],
    },
    computerStatus: {
      labels: ["Available", "Used", "Faulty"],
      datasets: [
        { 
          data: [stats.availableComputers, stats.usedComputers, stats.faultyComputers], 
          backgroundColor: ["#4CAF50", "#FF5733", "#FFC107"] 
        },
      ],
    },
    memberRoles: {
      labels: ["Administrators", "Students", "Guests"],
      datasets: [
        { data: [10, 15, 5], backgroundColor: ["#4285F4", "#FF5733", "#F0C674"] },
      ],
    }
  });

  return (
    <div>
      <SchoolNavbar />
      <div className="min-h-screen bg-gray-50 py-32 p-8 font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
          {[{ title: "Total Computers", value: stats.totalComputers, icon: <FaDesktop /> },
            { title: "Available Computers", value: stats.availableComputers, icon: <FaClipboardList /> },
            { title: "Used Computers", value: stats.usedComputers, icon: <FaLaptop /> },
            { title: "Lab Members", value: stats.labMembers, icon: <FaServer /> },
            { title: "Pending Maintenance", value: stats.pendingMaintenance, icon: <FaClipboardList /> },
            { title: "Maintenance Cost", value: stats.maintenanceCost, icon: <FaChartLine /> },
            { title: "Software Expenses", value: stats.softwareExpenses, icon: <FaMoneyBillWave /> },
            { title: "Add Computer", value: "Add", icon: <FaPlus />, onClick: () => router.push('/add-computer') },
          ].map((item, index) => (
            <div 
              key={index} 
              className="p-6 bg-white flex items-center space-x-6 border border-gray-300 transition transform cursor-pointer"
              onClick={item.onClick ? item.onClick : null}
            >
              <div className="text-6xl text-green-600">{item.icon}</div>
              <div>
                <p className="text-lg font-semibold text-gray-700">{item.title}</p>
                <p className="text-4xl font-bold text-gray-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-8">
          <div className="bg-white p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Device Types Distribution</h2>
            <Bar data={computerData.deviceTypes} />
          </div>

          <div className="bg-white p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Computer Status</h2>
            <Bar data={computerData.computerStatus} />
          </div>

          <div className="bg-white p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Member Roles</h2>
            <Bar data={computerData.memberRoles} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputerDashboard;

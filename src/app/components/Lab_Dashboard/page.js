"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Doughnut, Pie, Line, Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { FaVial, FaMicroscope, FaFlask, FaPlus, FaUserPlus, FaClipboardList, FaChartLine, FaMoneyBillWave } from "react-icons/fa";
import "tailwindcss/tailwind.css";
import SchoolNavbar from "../../navbar/page";

Chart.register(...registerables);

const LabDashboard = () => {
  const [stats, setStats] = useState({
    totalExperiments: 500,
    availableExperiments: 350,
    conductedExperiments: 120,
    labMembers: 50,
    pendingReports: 30,
    equipmentMaintenanceCost: 15000,
    researchFunding: 50000,
    dueExperiments: 100
  });

  const router = useRouter();

  const [labData, setLabData] = useState({
    experimentTypes: {
      labels: ["Chemistry", "Biology", "Physics", "Microbiology", "Technology"],
      datasets: [
        { data: [120, 90, 70, 50, 170], backgroundColor: ["#4CAF50", "#DB4437", "#4285F4", "#FF9800", "#F0C674"] },
      ],
    },
    experimentStatus: {
      labels: ["Available", "Conducted", "Due"],
      datasets: [
        { 
          data: [stats.availableExperiments, stats.conductedExperiments, stats.dueExperiments], 
          backgroundColor: ["#4CAF50", "#FF5733", "#FFC107"] 
        },
      ],
    },
    memberRoles: {
      labels: ["Researchers", "Students", "Guests"],
      datasets: [
        { data: [30, 15, 5], backgroundColor: ["#4285F4", "#FF5733", "#F0C674"] },
      ],
    }
  });

  return (
    <div>
      <SchoolNavbar />
      <div className="min-h-screen bg-gray-50 py-32 p-8 font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
          {[{ title: "Total Experiments", value: stats.totalExperiments, icon: <FaVial /> },
            { title: "Available Experiments", value: stats.availableExperiments, icon: <FaClipboardList /> },
            { title: "Conducted Experiments", value: stats.conductedExperiments, icon: <FaFlask /> },
            { title: "Lab Members", value: stats.labMembers, icon: <FaMicroscope /> },
            { title: "Pending Reports", value: stats.pendingReports, icon: <FaClipboardList /> },
            { title: "Maintenance Cost", value: stats.equipmentMaintenanceCost, icon: <FaChartLine /> },
            { title: "Research Funding", value: stats.researchFunding, icon: <FaMoneyBillWave /> },
            { title: "Add Experiment", value: "Add", icon: <FaPlus />, onClick: () => router.push('/add-experiment') },
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
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Experiment Types Distribution</h2>
            <Bar data={labData.experimentTypes} />
          </div>

          <div className="bg-white p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Experiment Status</h2>
            <Bar data={labData.experimentStatus} />
          </div>

          <div className="bg-white p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Member Roles</h2>
            <Bar data={labData.memberRoles} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabDashboard;

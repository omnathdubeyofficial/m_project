"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {  Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { FaBus, FaUsers, FaRoute, FaBusAlt, FaClipboardList, FaChartLine, FaMoneyBillWave } from "react-icons/fa";
import "tailwindcss/tailwind.css";
// import SchoolNavbar from "../../navbar/page";
Chart.register(...registerables);

const TransportManagementDashboard = () => {
  const [stats] = useState({
    totalVehicles: 50,
    availableVehicles: 35,
    activeRoutes: 20,
    registeredStudents: 450,
    lateArrivals: 15,
    fuelCost: 50000,
    maintenanceCost: 30000,
    pendingMaintenance: 10
  });

  const router = useRouter();

  const [transportData] = useState({
    vehicleDistribution: {
      labels: ["Buses", "Vans", "Mini Buses", "Cars"],
      datasets: [
        { data: [20, 10, 15, 5], backgroundColor: ["#4CAF50", "#DB4437", "#4285F4", "#FF9800"] },
      ],
    },
    vehicleStatus: {
      labels: ["Available", "In Service", "Under Maintenance"],
      datasets: [
        { 
          data: [stats.availableVehicles, stats.activeRoutes, stats.pendingMaintenance], 
          backgroundColor: ["#4CAF50", "#FF5733", "#FFC107"] 
        },
      ],
    },
    routePerformance: {
      labels: ["Route 1", "Route 2", "Route 3", "Route 4", "Route 5"],
      datasets: [
        {
          label: "On-Time Arrivals",
          data: [90, 85, 80, 70, 95],
          backgroundColor: "#4CAF50",
          borderColor: "#388E3C",
          borderWidth: 2,
        },
      ],
    },
    costTrends: {
      labels: ["Fuel", "Maintenance", "Salaries", "Miscellaneous"],
      datasets: [
        {
          label: "Cost Distribution",
          data: [50000, 30000, 20000, 10000],
          backgroundColor: "#FF9800",
          borderColor: "#F57C00",
          borderWidth: 2,
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
          {[{
            title: "Total Vehicles", value: stats.totalVehicles, icon: <FaBus />, description: "Total vehicles in the transport fleet." 
          }, {
            title: "Available Vehicles", value: stats.availableVehicles, icon: <FaClipboardList />, description: "Vehicles ready for transport." 
          }, {
            title: "Active Routes", value: stats.activeRoutes, icon: <FaRoute />, description: "Currently active routes." 
          }, {
            title: "Registered Students", value: stats.registeredStudents, icon: <FaUsers />, description: "Students registered for transport." 
          }, {
            title: "Late Arrivals", value: stats.lateArrivals, icon: <FaClipboardList />, description: "Number of late arrivals." 
          }, {
            title: "Fuel Cost", value: stats.fuelCost, icon: <FaChartLine />, description: "Total fuel expenses." 
          }, {
            title: "Maintenance Cost", value: stats.maintenanceCost, icon: <FaMoneyBillWave />, description: "Total maintenance expenses." 
          }, {
            title: "Add Vehicle", value: "Add", icon: <FaBusAlt />, description: "Add a new vehicle to the fleet.", onClick: () => router.push('/add-vehicle')
          }, {
            title: "Add Route", value: "Add Route", icon: <FaRoute />, description: "Add a new transport route.", onClick: () => router.push('/add-route')
          }
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
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-8">
          <div className="bg-white p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Vehicle Distribution</h2>
            <Bar data={transportData.vehicleDistribution} />
          </div>

          <div className="bg-white p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Vehicle Status</h2>
            <Bar data={transportData.vehicleStatus} />
          </div>

          <div className="bg-white p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Route Performance</h2>
            <Bar data={transportData.routePerformance} />
          </div>

          <div className="bg-white p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Cost Distribution</h2>
            <Bar data={transportData.costTrends} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportManagementDashboard;

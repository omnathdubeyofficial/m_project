"use client";

import React, { useState, useEffect } from "react";
import { Bar, Doughnut, Line, Radar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { FaUserGraduate, FaChalkboardTeacher, FaMoneyBillWave, FaClipboardList, FaBell, FaSchool, FaBookOpen } from "react-icons/fa";
import "tailwindcss/tailwind.css";

Chart.register(...registerables);

const Dashboard = () => {
  const [stats, setStats] = useState({
    students: 1200,
    teachers: 75,
    feesCollected: 500000,
    pendingFees: 150000,
    classrooms: 50,
    courses: 25,
  });

  const [classData, setClassData] = useState({
    performance: {
      labels: ["Math", "Science", "English", "History", "Geography"],
      datasets: [
        { label: "Class A", data: [85, 90, 88, 95, 92], backgroundColor: "#4CAF50" },
        { label: "Class B", data: [78, 82, 80, 88, 85], backgroundColor: "#DB4437" },
      ],
    },
    attendance: {
      labels: ["LKG", "UKG", "Class 1", "Class 2", "Class 3"],
      datasets: [
        { label: "Present", data: [50, 48, 45, 43, 40], backgroundColor: "#4285F4" },
        { label: "Absent", data: [5, 8, 10, 12, 15], backgroundColor: "#FF5733" },
      ],
    },
    fees: {
      labels: ["Paid", "Pending"],
      datasets: [
        { data: [stats.feesCollected, stats.pendingFees], backgroundColor: ["#4CAF50", "#FF5733"] },
      ],
    },
    disciplinary: {
      labels: ["Tardiness", "Misbehavior", "Fighting", "Bullying"],
      datasets: [
        { label: "Incidents", data: [20, 15, 5, 3], backgroundColor: "#FF9800" },
      ],
    },
    teacherFeedback: {
      labels: ["Class A", "Class B", "Class C", "Class D"],
      datasets: [
        {
          label: "Performance",
          data: [80, 90, 85, 88],
          backgroundColor: "#4CAF50",
          borderColor: "#4CAF50",
          borderWidth: 1,
        },
        {
          label: "Feedback",
          data: [70, 75, 80, 85],
          backgroundColor: "#FF5722",
          borderColor: "#FF5722",
          borderWidth: 1,
        },
      ],
    },
    demographic: {
      labels: ["Male", "Female", "Other"],
      datasets: [
        { data: [600, 550, 50], backgroundColor: ["#4285F4", "#FF5733", "#F0C674"] },
      ],
    },
  });

  useEffect(() => {
    // Fetch data if needed (e.g., from an API)
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">School Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {[ 
          { title: "Total Students", value: stats.students, icon: <FaUserGraduate />, description: "Total number of enrolled students." },
          { title: "Total Teachers", value: stats.teachers, icon: <FaChalkboardTeacher />, description: "Total number of teaching staff." },
          { title: "Classrooms", value: stats.classrooms, icon: <FaSchool />, description: "Total number of classrooms available." },
          { title: "Courses Offered", value: stats.courses, icon: <FaBookOpen />, description: "Number of courses offered to students." },
          { title: "Fees Collected", value: `$${stats.feesCollected}`, icon: <FaMoneyBillWave />, description: "Total fees collected so far." },
          { title: "Pending Fees", value: `$${stats.pendingFees}`, icon: <FaClipboardList />, description: "Total pending fees to be collected." },
        ].map((item, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-lg flex items-center space-x-4 border border-gray-200 hover:shadow-xl transition">
            <div className="text-5xl text-green-500">{item.icon}</div>
            <div>
              <p className="text-lg font-semibold text-gray-700">{item.title}</p>
              <p className="text-3xl font-bold text-gray-900">{item.value}</p>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Student Performance */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Student Performance in Subjects</h2>
          <Doughnut data={classData.performance} options={{ plugins: { tooltip: { callbacks: { label: (tooltipItem) => `Score: ${tooltipItem.raw}%` } } } }} />
        </div>

        {/* Attendance Overview */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Class Attendance Overview</h2>
          <Doughnut data={classData.attendance} options={{ plugins: { tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} students` } } } }} />
        </div>

        {/* Fees Collection */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Fees Collection Overview</h2>
          <Doughnut data={classData.fees} options={{ plugins: { tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.raw} collected` } } } }} />
        </div>

        {/* Disciplinary Actions */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Disciplinary Actions in School</h2>
          <Doughnut data={classData.disciplinary} options={{ plugins: { tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.raw} incidents` } } } }} />
        </div>

        {/* Teacher Feedback */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Teacher Performance Feedback</h2>
          <Doughnut data={classData.teacherFeedback} options={{ plugins: { tooltip: { callbacks: { label: (tooltipItem) => `Rating: ${tooltipItem.raw}%` } } } }} />
        </div>

        {/* Student Demographics */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Student Demographic Distribution</h2>
          <Pie data={classData.demographic} options={{ plugins: { tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} students` } } } }} />
        </div>
      </div>

      {/* Latest Updates Section */}
      {/* <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Latest Updates & Events</h2>
        <ul className="space-y-3">
          {[
            "Annual Sports Meet on 15th Feb",
            "Parent-Teacher Meeting on 20th Feb",
            "Exams Schedule Released for March",
          ].map((update, index) => (
            <li key={index} className="flex items-center space-x-2 text-gray-700">
              <FaBell className="text-yellow-500 text-lg" />
              <span className="text-lg">{update}</span>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default Dashboard;

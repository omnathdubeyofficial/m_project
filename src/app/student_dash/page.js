"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const StudentDashboard = () => {
  const router = useRouter();
  const [student, setStudent] = useState({
    name: "Rahul Sharma",
    rollNumber: "STU12345",
    class: "10th Grade",
    section: "A",
    email: "rahul.sharma@example.com",
    phone: "+91 9876543210",
    profilePic: "/img/image copy.png",
  });

  const handleLogout = () => {
    Cookies.remove("authToken"); // Auth token remove karein
    localStorage.clear(); // Local storage clear karein
    sessionStorage.clear(); // Session storage clear karein
    router.replace("/login"); // Login page par redirect karein
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 w-screen h-screen p-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-7xl">
        <header className="flex flex-col md:flex-row items-center md:justify-between border-b pb-4">
          <div className="flex items-center space-x-4">
            <Image
              src={student.profilePic}
              alt="Profile"
              width={100}
              height={100}
              className="rounded-full border-4 border-blue-500"
            />
            <div>
              <h2 className="text-3xl font-bold">{student.name}</h2>
              <p className="text-gray-500">{student.email}</p>
              <p className="text-gray-600">Roll No: {student.rollNumber} | Class: {student.class} | Section: {student.section}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600">
              Edit Profile
            </button>
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {["📚 Assigned Homework", "📝 Online Test", "👨‍🏫 Teacher Complaints", "📊 Progress Report", "📅 Attendance", "💬 Messages", "📅 Timetable", "📖 Study Material", "💰 Fee Management", "📚 E-Library", "🎯 AI Performance Tracking", "🎓 Career Guidance", "🎵 Extra Curricular Activities", "🛠️ Settings", "🚀 Upcoming Events", "🔔 Notifications"].map((title, index) => (
            <div key={index} className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="text-sm text-gray-600">Details about {title.toLowerCase()}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;

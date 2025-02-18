// pages/AdminDashboard.js
"use client";
import { BarChart, Bar, XAxis,  YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
    FaUniversity, FaUserGraduate, FaUserTie,FaArrowLeft, FaChartBar, FaUsers, FaFileAlt, 
    FaBus, FaCogs, FaBook, FaFlask, FaDesktop, FaBroom, FaShieldAlt, FaClipboardCheck, 
    FaCalendarAlt, FaFutbol, FaTrophy, FaBell, FaUserPlus, FaMoneyBillWave 
  } from 'react-icons/fa';
import Navber from "../../navbar/page";
import Link from 'next/link';


// Sample data for fees, salary, and other metrics
const totalAdmissionsData = [
  { name: 'Jan', admissions: 50 },
  { name: 'Feb', admissions: 40 },
  { name: 'Mar', admissions: 55 },
  { name: 'Apr', admissions: 60 },
  { name: 'May', admissions: 65 },
  { name: 'Jun', admissions: 70 },
  { name: 'Jul', admissions: 75 },
  { name: 'Aug', admissions: 80 },
  { name: 'Sep', admissions: 85 },
  { name: 'Oct', admissions: 90 },
  { name: 'Nov', admissions: 95 },
  { name: 'Dec', admissions: 100 },
];

const menuItems = [
  { 
    name: 'Total Admissions in Year', 
    icon: FaChartBar, 
    link: '/dashboard/admin_dashboard', 
    bg: 'bg-blue-100', 
    text: 'text-blue-800',
    currentYear: 100,
    previousYear: 95
  },
  { 
    name: 'University Management', 
    icon: FaUniversity, 
    link: '/components/university', 
    bg: 'bg-green-100', 
    text: 'text-green-800',
    currentYear: 5, 
    previousYear: 4
  },
  { 
    name: 'Students Management', 
    icon: FaUserGraduate, 
    link: '/students', 
    bg: 'bg-purple-100', 
    text: 'text-purple-800',
    currentYear: 200, 
    previousYear: 180
  },
  { 
    name: 'Parents Management', 
    icon: FaUserTie, 
    link: '/parents', 
    bg: 'bg-yellow-100', 
    text: 'text-yellow-800',
    currentYear: 150, 
    previousYear: 140
  },
  { 
    name: 'Staff Management', 
    icon: FaUsers, 
    link: '/staff', 
    bg: 'bg-red-100', 
    text: 'text-red-800',
    currentYear: 50, 
    previousYear: 48
  },
  { 
    name: 'Transport Drivers', 
    icon: FaBus, 
    link: '/transport-drivers', 
    bg: 'bg-orange-100', 
    text: 'text-orange-800',
    currentYear: 15, 
    previousYear: 12
  },
  { 
    name: 'Transport Vehicles', 
    icon: FaCogs, 
    link: '/transport-vehicles', 
    bg: 'bg-teal-100', 
    text: 'text-teal-800',
    currentYear: 20, 
    previousYear: 18
  },
];


const classWiseAdmissionsPreviousYear = [
  { class: 'Class 1', admissions: 25 },
  { class: 'Class 2', admissions: 20 },
  { class: 'Class 3', admissions: 22 },
  { class: 'Class 4', admissions: 30 },
  { class: 'Class 5', admissions: 33 },
];

const classWiseAdmissionsCurrentYear = [
  { class: 'Class 1', admissions: 30 },
  { class: 'Class 2', admissions: 25 },
  { class: 'Class 3', admissions: 28 },
  { class: 'Class 4', admissions: 32 },
  { class: 'Class 5', admissions: 35 },
];


export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-28">
      <Navber />

      <Link href="/dashboard" passHref>
  <button 
    className="bg-blue-500 text-white px-4 py-2 shadow-md hover:bg-blue-600 transition duration-200 flex items-center gap-2"
  >
    <FaArrowLeft className="text-white" />
    Go Back
  </button>
</Link>  

 <div className="flex flex-col flex-1 ">
        <div className="w-full mx-auto p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menuItems.map((item, index) => (
              <div 
                key={index} 
                onClick={() => router.push(item.link)} 
                className={`p-6 ${item.bg} shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer`}
              >
                <item.icon className={`text-4xl ${item.text}`} />
                <h2 className={`text-xl font-semibold ${item.text} mt-4`}>{item.name}</h2>
                <div className="text-sm mt-2 text-gray-500">
                  <div>Current Year: {item.currentYear} Admissions</div>
                  <div>Previous Year: {item.previousYear} Admissions</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Total Admissions */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
          <h2 className="text-xl font-medium mb-4 text-gray-700">Total Admissions in Year</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={totalAdmissionsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="admissions" stroke="#4F46E5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Previous Year vs Current Year Admissions */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
          <h2 className="text-xl font-medium mb-4 text-gray-700">Previous Year vs Current Year Admissions</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classWiseAdmissionsCurrentYear}>
              <XAxis dataKey="class" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="admissions" fill="#4F46E5" name="Current Year" />
              <Bar dataKey="admissions" fill="#FF9800" name="Previous Year" data={classWiseAdmissionsPreviousYear} />
            </BarChart>
          </ResponsiveContainer>
        </div>

       
      </div>
    </div>
  );
}

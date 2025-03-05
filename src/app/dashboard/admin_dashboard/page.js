// pages/AdminDashboard.js
"use client";
import { BarChart, Bar, XAxis,  YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
    FaUniversity, FaUserGraduate,FaBookOpen, FaHourglassHalf,FaArrowLeft, FaChalkboardTeacher,FaFileInvoice, FaUsers, FaFileAlt, 
    FaUserTie, FaCogs, FaBook,FaBus,FaBed,FaUtensils,FaUserCog, FaFlask, FaDesktop, FaBroom, FaShieldAlt, FaClipboardCheck, 
    FaCalendarAlt, FaFutbol, FaTrophy, FaBell,FaSchool,FaTools,FaCalendarCheck,FaClipboardList, FaUserPlus, FaMoneyBillWave 
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
    name: 'Total Teachers', 
    icon: FaChalkboardTeacher, 
    amount_data: "362",
    link: '/dashboard/admin_dashboard', 
    bg: 'bg-blue-200', 
    text: 'text-blue-800',
    currentYear: 100,
    previousYear: 95
  },
  { 
    name: 'Total Students', 
    icon: FaUsers, 
    amount_data: "36213",
    link: '/components/university', 
    bg: 'bg-green-200', 
    text: 'text-green-800',
    currentYear: 5, 
    previousYear: 4
  },
  { 
    name: 'Total Collected Fees', 
    icon: FaMoneyBillWave, 
    amount_data: "₹150000",
    link: '/students', 
    bg: 'bg-purple-200', 
    text: 'text-purple-800',
    currentYear: 200, 
    previousYear: 180
  },
  { 
    name: 'Pending Fees', 
    icon: FaHourglassHalf, 
    amount_data: "₹150000",
    link: '/parents', 
    bg: 'bg-yellow-200', 
    text: 'text-yellow-800',
    currentYear: 150, 
    previousYear: 140
  },
  { 
    name: 'Total Expenses', 
    amount_data: "₹500,000",
    icon: FaFileInvoice, 
    link: '/staff', 
    bg: 'bg-red-200', 
    text: 'text-red-800',
    currentYear: 50, 
    previousYear: 48
  },
  { 
    name: 'Salary Paid', 
    icon: FaUserTie, 
    amount_data: "₹500,000",
    link: '/transport-drivers', 
    bg: 'bg-orange-200', 
    text: 'text-orange-800',
    currentYear: 15, 
    previousYear: 12
  },
  { 
    name: 'Total Admissions', 
    icon: FaUserGraduate, 
    amount_data: "4321",
    link: '/transport-vehicles', 
    bg: 'bg-teal-200', 
    text: 'text-teal-800',
    currentYear: 20, 
    previousYear: 18
  },
  { 
    name: 'Total Courses', 
    icon: FaBookOpen, 
    amount_data: "4321",
    link: '/courses', 
    bg: 'bg-pink-200',
    text: 'text-pink-800',
    currentYear: 20, 
    previousYear: 18
  },
  { 
    name: 'Exams Conducted', 
    icon: FaClipboardCheck, 
    amount_data: "₹150000",
    link: '/exams', 
    bg: 'bg-indigo-200', 
    text: 'text-indigo-800',
    currentYear: 200, 
    previousYear: 180
  },
  { 
    name: 'Students Present Today', 
    amount_data: "4500",
    icon: FaUsers, 
    link: '/attendance', 
    bg: 'bg-gray-200', 
    text: 'text-gray-800',
    currentYear: 50, 
    previousYear: 48
  },
  { 
    name: 'Teachers Present Today', 
    icon: FaChalkboardTeacher, 
    amount_data: "95",
    link: '/teachers-attendance', 
    bg: 'bg-lime-200', 
    text: 'text-lime-800',
    currentYear: 150, 
    previousYear: 140
  },
  { 
    name: 'Total Revenue This Year', 
    icon: FaMoneyBillWave, 
    amount_data: "₹10,00,000",
    link: '/revenue', 
    bg: 'bg-emerald-200', 
    text: 'text-emerald-800',
    currentYear: 150, 
    previousYear: 140
  },
  { 
    name: 'Scholarship Amount Given', 
    icon: FaUniversity, 
    amount_data: "₹5,00,000",
    link: '/scholarships', 
    bg: 'bg-cyan-200', 
    text: 'text-cyan-800',
    currentYear: 150, 
    previousYear: 140
  },
  { 
    name: 'Library Books Available', 
    icon: FaBook, 
    amount_data: "12,000",
    link: '/library', 
    bg: 'bg-fuchsia-200', 
    text: 'text-fuchsia-800',
    currentYear: 500, 
    previousYear: 450
  },
  { 
    name: 'Labs Available', 
    icon: FaFlask, 
    amount_data: "25",
    link: '/labs', 
    bg: 'bg-rose-200', 
    text: 'text-rose-800',
    currentYear: 10, 
    previousYear: 9
  },
  { 
    name: 'Transport Buses', 
    icon: FaBus, 
    amount_data: "50",
    link: '/transport', 
    bg: 'bg-sky-200', 
    text: 'text-sky-800',
    currentYear: 30, 
    previousYear: 25
  },
  { 
    name: 'Hostel Students', 
    icon: FaBed, 
    amount_data: "1200",
    link: '/hostel', 
    bg: 'bg-violet-200', 
    text: 'text-violet-800',
    currentYear: 600, 
    previousYear: 550
  },
  { 
    name: 'Sports Facilities', 
    icon: FaFutbol, 
    amount_data: "15",
    link: '/sports', 
    bg: 'bg-amber-200', 
    text: 'text-amber-800',
    currentYear: 10, 
    previousYear: 8
  },
  { 
    name: 'Canteen Items Available', 
    icon: FaUtensils, 
    amount_data: "200",
    link: '/canteen', 
    bg: 'bg-lime-300', 
    text: 'text-lime-900',
    currentYear: 150, 
    previousYear: 140
  },
  { 
    name: 'Non-Teaching Staff', 
    icon: FaUserCog, 
    amount_data: "85",
    link: '/staff', 
    bg: 'bg-emerald-300', 
    text: 'text-emerald-900',
    currentYear: 40, 
    previousYear: 35
  },
  { 
    name: 'Classrooms Available', 
    icon: FaSchool, 
    amount_data: "75",
    link: '/infrastructure', 
    bg: 'bg-indigo-300', 
    text: 'text-indigo-900',
    currentYear: 70, 
    previousYear: 65
  },
  { 
    name: 'Labs Under Maintenance', 
    icon: FaTools, 
    amount_data: "5",
    link: '/labs', 
    bg: 'bg-rose-300', 
    text: 'text-rose-900',
    currentYear: 3, 
    previousYear: 2
  },
  { 
    name: 'Total Events Conducted', 
    icon: FaCalendarCheck, 
    amount_data: "20",
    link: '/events', 
    bg: 'bg-fuchsia-300', 
    text: 'text-fuchsia-900',
    currentYear: 15, 
    previousYear: 12
  },
  { 
    name: 'New Admissions This Month', 
    icon: FaUserPlus, 
    amount_data: "350",
    link: '/admissions', 
    bg: 'bg-lime-300', 
    text: 'text-lime-900',
    currentYear: 200, 
    previousYear: 180
  },
  { 
    name: 'Exam Results Published', 
    icon: FaClipboardList, 
    amount_data: "45",
    link: '/exams', 
    bg: 'bg-teal-300', 
    text: 'text-teal-900',
    currentYear: 30, 
    previousYear: 28
  },
  { 
    name: 'Sports Achievements', 
    icon: FaTrophy, 
    amount_data: "10",
    link: '/sports', 
    bg: 'bg-yellow-300', 
    text: 'text-yellow-900',
    currentYear: 8, 
    previousYear: 6
  },
  { 
    name: 'Canteen Revenue', 
    icon: FaUtensils, 
    amount_data: "₹2,00,000",
    link: '/canteen', 
    bg: 'bg-cyan-300', 
    text: 'text-cyan-900',
    currentYear: 20, 
    previousYear: 18
  },
  { 
    name: 'Hostel Rooms Available', 
    icon: FaBed, 
    amount_data: "30",
    link: '/hostel', 
    bg: 'bg-violet-300', 
    text: 'text-violet-900',
    currentYear: 20, 
    previousYear: 18
  }
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


const staffSalaryData = [
  { month: 'Jan', salary: 50000 },
  { month: 'Feb', salary: 52000 },
  { month: 'Mar', salary: 51000 },
  { month: 'Apr', salary: 53000 },
  { month: 'May', salary: 54000 },
  { month: 'Jan', salary: 50000 },
  { month: 'Feb', salary: 52000 },
  { month: 'Mar', salary: 51000 },
  { month: 'Apr', salary: 53000 },
  { month: 'May', salary: 54000 },
  { month: 'May', salary: 54000 },

  
];


const feesCollectionData = [
  { month: 'Jan', fees: 20000 },
  { month: 'Feb', fees: 18000 },
  { month: 'Mar', fees: 22000 },
  { month: 'Apr', fees: 25000 },
  { month: 'May', fees: 23000 },
  { month: 'Jan', fees: 20000 },
  { month: 'Feb', fees: 18000 },
  { month: 'Mar', fees: 22000 },
  { month: 'Apr', fees: 25000 },
  { month: 'May', fees: 23000 },
  { month: 'May', fees: 23000 },
];


export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-28">
      {/* <Navber /> */}

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
                <h2 className={`text-4xl font-semibold text-green-600 mt-4`}>{item.amount_data}</h2>
                {/* <div className="text-sm mt-2 text-gray-500">
                  <div>Current Year: {item.currentYear} Admissions</div>
                  <div>Previous Year: {item.previousYear} Admissions</div>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
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

        {/* Staff Salary */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
          <h2 className="text-xl font-medium mb-4 text-gray-700">Monthly Staff Salary</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={staffSalaryData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="salary" stroke="#FF9800" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>



         {/* Fees Collection */}
         <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
          <h2 className="text-xl font-medium mb-4 text-gray-700">Monthly Fees Collection</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={feesCollectionData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="fees" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>


    </div>
  );
}

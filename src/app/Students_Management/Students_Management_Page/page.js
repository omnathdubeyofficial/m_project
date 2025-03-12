"use client";

import { 
  FaUserGraduate, FaClipboardList,FaArrowLeft, FaCalendarCheck, FaComments, FaLaptop, FaAward, FaRupeeSign, FaBook
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Students_Management_Page = () => {
  const router = useRouter();

  const studentsServices = [
    { name: "New Admission", icon: <FaUserGraduate />, path: "/Students_Management/Students_Management_Page/New_Admission_Lists" },
    { name: "Attendance Management", icon: <FaClipboardList />, path: "/Students_Management/Students_Management_Page/Id_Card" },
    { name: "Class Scheduling", icon: <FaCalendarCheck />, path: "/students/class-scheduling" },
    { name: "Feedback & Communication", icon: <FaComments />, path: "/students/feedback-communication" },
    { name: "Digital Access Portal", icon: <FaLaptop />, path: "/students/digital-access" },
    { name: "Budget Request", icon: <FaRupeeSign />, path: "/students/budget-request" },
    { name: "Performance Evaluation", icon: <FaAward />, path: "/students/performance-evaluation" },
    { name: "Library Management", icon: <FaBook />, path: "/students/library-management" }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen pt-32">
      <main className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 bg-white border-2 border-gray-300 shadow-md">
              <button   onClick={() => window.history.back()}  className="bg-blue-500 text-white px-4 py-2 shadow-md hover:bg-blue-600 transition duration-200 flex items-center gap-2 ">
                   <FaArrowLeft className="text-white" />
                   Go Back
                 </button>
            <h2 className="text-3xl text-center flex items-center gap-3 text-gray-800 font-semibold">
              <FaUserGraduate className="text-blue-500 text-3xl animate-pulse" />
              Students Management
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {studentsServices.map((service, index) => (
              <Link href={service.path} key={index}>
                <div
                  className="p-8 shadow-lg flex flex-col items-center cursor-pointer border border-gray-300 bg-white transition-transform hover:scale-105 hover:shadow-2xl  text-gray-900 hover:bg-blue-50 hover:border-blue-400"
                >
                  <div className="text-5xl mb-4 text-blue-700">{service.icon}</div>
                  <h3 className="text-lg font-semibold text-center">{service.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Students_Management_Page;

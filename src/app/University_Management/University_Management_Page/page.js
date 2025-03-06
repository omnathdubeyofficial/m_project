"use client";

import { 
  FaUniversity, FaUserGraduate, FaChalkboardTeacher, FaClipboardList, FaCalendarCheck, FaComments, FaLaptop, FaAward, FaRupeeSign, FaBook
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const University_Management_Page = () => {
  const router = useRouter();

  const universityServices = [
    { name: "University Information Management", icon: <FaUniversity />, path: "/university/information-management" },
    { name: "Student Management", icon: <FaUserGraduate />, path: "/university/student-management" },
    { name: "Faculty Management", icon: <FaChalkboardTeacher />, path: "/university/faculty-management" },
    { name: "Attendance Management", icon: <FaClipboardList />, path: "/university/attendance" },
    { name: "Class Scheduling", icon: <FaCalendarCheck />, path: "/university/class-scheduling" },
    { name: "Feedback & Communication", icon: <FaComments />, path: "/university/feedback-communication" },
    { name: "Digital Access Portal", icon: <FaLaptop />, path: "/university/digital-access" },
    { name: "Budget Management", icon: <FaRupeeSign />, path: "/university/budget-management" },
    { name: "Performance Evaluation", icon: <FaAward />, path: "/university/performance-evaluation" },
    { name: "Library Management", icon: <FaBook />, path: "/university/library-management" }
  ];

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 min-h-screen pt-32">
      <main className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 bg-white border-2 border-gray-300 shadow-md">
            <button 
              onClick={() => router.push("/dashboard")}
              className="bg-yellow-600 text-white px-6 py-2 flex items-center gap-2 shadow-md hover:bg-yellow-700 transition-all"
            >
              Go Back
            </button>
            <h2 className="text-3xl text-center flex items-center gap-3 text-gray-800 font-semibold">
              <FaUniversity className="text-yellow-500 text-3xl animate-pulse" />
              University Management
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {universityServices.map((service, index) => (
              <Link href={service.path} key={index}>
                <div
                  className="p-8 shadow-lg flex flex-col items-center cursor-pointer border border-gray-300 bg-white transition-transform hover:scale-105 hover:shadow-2xl rounded-lg text-gray-900 hover:bg-yellow-50 hover:border-yellow-400"
                >
                  <div className="text-5xl mb-4 text-yellow-700">{service.icon}</div>
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

export default University_Management_Page;

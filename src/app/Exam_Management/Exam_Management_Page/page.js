"use client";

import { FaClipboardList, FaCalendarAlt, FaUserGraduate, FaCheckCircle, FaBook, FaUserEdit, FaChartLine, FaFileAlt, FaFileUpload } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Exam_Management_Page = () => {
  const router = useRouter();

  const examServices = [
    { name: "Exam Schedule", icon: <FaCalendarAlt />, path: "/exam/schedule" },
    { name: "Student Management", icon: <FaUserGraduate />, path: "/exam/student-management" },
    { name: "Exam Creation", icon: <FaBook />, path: "/exam/creation" },
    { name: "Result Management", icon: <FaCheckCircle />, path: "/exam/result-management" },
    { name: "Evaluation Process", icon: <FaUserEdit />, path: "/exam/evaluation" },
    { name: "Performance Analysis", icon: <FaChartLine />, path: "/exam/performance-analysis" },
    { name: "Question Paper Management", icon: <FaFileAlt />, path: "/exam/question-paper" },
    { name: "Upload Exam Materials", icon: <FaFileUpload />, path: "/exam/upload-materials" }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen pt-32">
      <main className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5 border-2 border-gray-300 p-4 bg-white">
            <button 
              onClick={() => router.push("/dashboard")}
              className="bg-blue-600 text-white px-4 py-2 flex items-center gap-2 shadow-md hover:bg-blue-700"
            >
              Go Back
            </button>
            <h2 className="text-2xl text-center flex items-center gap-3">
              <FaClipboardList className="text-blue-500 text-2xl animate-pulse" />
              <span className="tracking-wide text-gray-800">Exam Management</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {examServices.map((service, index) => (
              <Link href={service.path} key={index}>
                <div
                  className="p-8 shadow-lg flex flex-col items-center cursor-pointer border border-gray-300 transition-transform hover:scale-105 hover:shadow-2xl bg-white text-gray-900 hover:bg-blue-50 hover:border-blue-400"
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

export default Exam_Management_Page;

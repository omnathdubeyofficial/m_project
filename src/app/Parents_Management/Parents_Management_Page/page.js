"use client";

import { 
  FaUserFriends, FaClipboardList, FaCalendarCheck, FaComments, FaLaptop, FaAward, FaRupeeSign
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Parents_Management_Page = () => {
  const router = useRouter();

  const parentsServices = [
    { name: "Parent Information Management", icon: <FaUserFriends />, path: "/parents/information-management" },
    { name: "Attendance Management", icon: <FaClipboardList />, path: "/parents/attendance" },
    { name: "Meeting Scheduling", icon: <FaCalendarCheck />, path: "/parents/meeting-scheduling" },
    { name: "Feedback & Communication", icon: <FaComments />, path: "/parents/feedback-communication" },
    { name: "Digital Access Portal", icon: <FaLaptop />, path: "/parents/digital-access" },
    { name: "Budget Request", icon: <FaRupeeSign />, path: "/parents/budget-request" },
    { name: "Performance Evaluation", icon: <FaAward />, path: "/parents/performance-evaluation" }
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
              <FaUserFriends className="text-yellow-500 text-3xl animate-pulse" />
              Parents Management
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {parentsServices.map((service, index) => (
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

export default Parents_Management_Page;

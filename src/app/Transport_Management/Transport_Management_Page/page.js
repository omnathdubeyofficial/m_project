"use client";

import { 
  FaBus, FaUserTie, FaClipboardList, FaCalendarCheck, FaRoute, FaLaptop, FaAward, FaRupeeSign
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Transport_Management_Page = () => {
  const router = useRouter();

  const transportServices = [
    { name: "Driver Management", icon: <FaUserTie />, path: "/transport/driver-management" },
    { name: "Route Management", icon: <FaRoute />, path: "/transport/route-management" },
    { name: "Vehicle Management", icon: <FaBus />, path: "/transport/vehicle-management" },
    { name: "Transport Scheduling", icon: <FaCalendarCheck />, path: "/transport/scheduling" },
    { name: "Attendance Management", icon: <FaClipboardList />, path: "/transport/attendance" },
    { name: "Digital Transport Access", icon: <FaLaptop />, path: "/transport/digital-access" },
    { name: "Budget Request", icon: <FaRupeeSign />, path: "/transport/budget-request" },
    { name: "Performance Evaluation", icon: <FaAward />, path: "/transport/performance-evaluation" }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen pt-32">
      <main className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 bg-white border-2 border-gray-300 shadow-md">
            <button 
              onClick={() => router.push("/dashboard")}
              className="bg-blue-600 text-white px-6 py-2 flex items-center gap-2 shadow-md hover:bg-blue-700 transition-all"
            >
              Go Back
            </button>
            <h2 className="text-3xl text-center flex items-center gap-3 text-gray-800 font-semibold">
              <FaBus className="text-blue-500 text-3xl animate-pulse" />
              Transport Management
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {transportServices.map((service, index) => (
              <Link href={service.path} key={index}>
                <div
                  className="p-8 shadow-lg flex flex-col items-center cursor-pointer border border-gray-300 bg-white transition-transform hover:scale-105 hover:shadow-2xl rounded-lg text-gray-900 hover:bg-blue-50 hover:border-blue-400"
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

export default Transport_Management_Page;

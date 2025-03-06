"use client";

import { 
  FaShieldAlt, FaUserShield, FaClipboardList, FaClock, FaExclamationTriangle, FaBoxOpen, FaAward, FaRupeeSign
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Security_Staff_Management_Page = () => {
  const router = useRouter();

  const securityServices = [
    { name: "Security Staff Management", icon: <FaUserShield />, path: "/security/staff-management" },
    { name: "Shift Scheduling", icon: <FaClock />, path: "/security/shift-scheduling" },
    { name: "Attendance Management", icon: <FaClipboardList />, path: "/security/attendance" },
    { name: "Performance Evaluation", icon: <FaAward />, path: "/security/performance-evaluation" },
    { name: "Equipment Request", icon: <FaBoxOpen />, path: "/security/equipment-request" },
    { name: "Budget Request", icon: <FaRupeeSign />, path: "/security/budget-request" },
    { name: "Resource Allocation", icon: <FaBoxOpen />, path: "/security/resource-allocation" },
    { name: "Medical Form", icon: <FaClipboardList />, path: "/security/medical-form" },
    { name: "Risk Management", icon: <FaExclamationTriangle />, path: "/security/risk-management" }
  ];

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 min-h-screen pt-32">
      <main className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 bg-white border-2 border-gray-300 shadow-md">
            <button 
              onClick={() => router.push("/dashboard")}
              className="bg-green-600 text-white px-6 py-2 flex items-center gap-2 shadow-md hover:bg-green-700 transition-all"
            >
              Go Back
            </button>
            <h2 className="text-2xl text-center flex items-center gap-3 text-gray-800 ">
              <FaShieldAlt className="text-green-500 text-3xl animate-pulse" />
              Security Staff Management
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {securityServices.map((service, index) => (
              <Link href={service.path} key={index}>
                <div
                  className="p-8 shadow-lg flex flex-col items-center cursor-pointer border border-gray-300 bg-white transition-transform hover:scale-105 hover:shadow-2xl rounded-lg text-gray-900 hover:bg-green-50 hover:border-green-400"
                >
                  <div className="text-5xl mb-4 text-green-700">{service.icon}</div>
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

export default Security_Staff_Management_Page;

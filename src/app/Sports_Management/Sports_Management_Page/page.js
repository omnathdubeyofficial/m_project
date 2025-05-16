"use client";

import { 
  FaShieldAlt, FaUserShield, FaClipboardList, FaClipboard, FaHandshake, FaClock, FaBullhorn, FaTruck, FaExclamationTriangle, FaBoxOpen, FaAward, FaRupeeSign
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
    { name: "Sponsorship Management", icon: <FaHandshake />, path: "/security/sponsorship" },
    { name: "Resource Allocation", icon: <FaBoxOpen />, path: "/security/resource-allocation" },
    { name: "Medical Form", icon: <FaClipboardList />, path: "/security/medical-form" },
    { name: "Feedback Form", icon: <FaClipboard />, path: "/security/feedback" },
    { name: "Transport and Logistics", icon: <FaTruck />, path: "/security/transport-logistics" },
    { name: "Risk Management", icon: <FaExclamationTriangle />, path: "/security/risk-management" },
    { name: "Certificate Generation", icon: <FaAward />, path: "/security/certificate-generation" },
    { name: "Media and Promotion", icon: <FaBullhorn />, path: "/security/media-promotion" },
    { name: "Facility Management", icon: <FaClipboardList />, path: "/security/facility-management" }
  ];

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen pt-32">
      <main className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5 border-2 border-gray-300 p-4 bg-white">
            <button 
              onClick={() => router.push("/dashboard")}
              className="bg-gray-600 text-white px-4 py-2 flex items-center gap-2 shadow-md hover:bg-gray-700"
            >
              Go Back
            </button>
            <h2 className="text-2xl text-center flex items-center gap-3">
              <FaShieldAlt className="text-gray-500 text-2xl animate-pulse" />
              <span className="tracking-wide text-gray-800">Security Staff Management</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {securityServices.map((service, index) => (
              <Link href={service.path} key={index}>
                <div
                  className="p-8 shadow-lg flex flex-col items-center cursor-pointer border border-gray-300 transition-transform hover:scale-105 hover:shadow-2xl bg-white text-gray-900 hover:bg-gray-50 hover:border-gray-400"
                >
                  <div className="text-5xl mb-4 text-gray-700">{service.icon}</div>
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

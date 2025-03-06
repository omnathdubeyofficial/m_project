"use client";

import { 
  FaFlask, FaClipboardList, FaCalendarCheck, FaUserCog, FaMicroscope, FaVial, FaAward, FaRupeeSign
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Lab_Management_Page = () => {
  const router = useRouter();

  const labServices = [
    { name: "Lab Staff Management", icon: <FaUserCog />, path: "/lab/staff-management" },
    { name: "Test Scheduling", icon: <FaCalendarCheck />, path: "/lab/test-scheduling" },
    { name: "Inventory Management", icon: <FaVial />, path: "/lab/inventory" },
    { name: "Equipment Maintenance", icon: <FaMicroscope />, path: "/lab/equipment-maintenance" },
    { name: "Performance Evaluation", icon: <FaAward />, path: "/lab/performance-evaluation" },
    { name: "Budget Request", icon: <FaRupeeSign />, path: "/lab/budget-request" },
    { name: "Resource Allocation", icon: <FaClipboardList />, path: "/lab/resource-allocation" },
    { name: "Safety Management", icon: <FaFlask />, path: "/lab/safety-management" }
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
              <FaFlask className="text-blue-500 text-3xl animate-pulse" />
              Lab Management
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {labServices.map((service, index) => (
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

export default Lab_Management_Page;
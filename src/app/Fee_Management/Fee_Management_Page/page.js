"use client";

import { 
  FaRupeeSign, FaClipboardList, FaUsers, FaClipboard, FaBullhorn, FaCalculator, FaFileInvoiceDollar
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Fee_Management_Page = () => {
  const router = useRouter();

  const feeServices = [
    { name: "Fee Collection", icon: <FaRupeeSign />, path: "/fee/collection" },
    { name: "Fee Structure Management", icon: <FaClipboardList />, path: "/fee/structure" },
    { name: "Student Fee Records", icon: <FaUsers />, path: "/fee/student-records" },
    { name: "Generate Invoices", icon: <FaFileInvoiceDollar />, path: "/fee/invoices" },
    { name: "Fee Calculator", icon: <FaCalculator />, path: "/fee/calculator" },
    { name: "Communication on Dues", icon: <FaBullhorn />, path: "/fee/communication" }
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
            <h2 className="text-3xl text-center flex items-center gap-3 text-gray-800 font-semibold">
              <FaRupeeSign className="text-green-500 text-3xl animate-pulse" />
              Fee Management
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {feeServices.map((service, index) => (
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

export default Fee_Management_Page;

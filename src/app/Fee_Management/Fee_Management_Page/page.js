"use client";

import { 
  FaRupeeSign, FaClipboardList, FaUsers, FaFileInvoiceDollar
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Fee_Management_Page = () => {
  const router = useRouter();

  const feeServices = [
    { name: "Fee Collection", icon: <FaRupeeSign />, path: "/Fee_Management/Fee_Management_Page/Fee_Collection_Data" },
    { name: "Fee Structure Management", icon: <FaClipboardList />, path: "/Fee_Management/Fee_Management_Page/Fee_Structure_List" },
    { name: "Student Fee Records", icon: <FaUsers />, path: "/Fee_Management/Fee_Management_Page/Student_Fee_Record_Data" },
    { name: "Generate Invoices", icon: <FaFileInvoiceDollar />, path: "/Fee_Management/Fee_Management_Page/Generator_Invoice" },
  ];

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 min-h-screen pt-32">
      <main className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 bg-white border-2 border-gray-300 ">
            <button 
              onClick={() => router.push("/dashboard")}
              className="bg-green-600 text-white px-6 py-2 flex items-center gap-2  hover:bg-green-700 transition-all"
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
                  className="p-8 shadow-lg flex flex-col items-center cursor-pointer border border-gray-300 bg-white transition-transform hover:scale-105   text-gray-900 hover:bg-green-50 hover:border-green-400"
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

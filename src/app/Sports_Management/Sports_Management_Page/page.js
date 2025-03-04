"use client";

import { 
  FaFutbol, FaRunning, FaSwimmer, FaTableTennis, FaBasketballBall, FaVolleyballBall, FaTrophy, FaCalendarCheck, FaUsers, FaClipboardList, FaClipboard, FaHandshake, FaClock, FaBullhorn, FaTruck, FaExclamationTriangle, FaBoxOpen, FaAward, FaRupeeSign
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Sports_Management_Page = () => {
  const router = useRouter();

  const sportsServices = [
    { name: "Football Management", icon: <FaFutbol />, path: "/sports/football" },
    { name: "Running Events", icon: <FaRunning />, path: "/sports/running" },
    { name: "Swimming Competitions", icon: <FaSwimmer />, path: "/sports/swimming" },
    { name: "Table Tennis Tournaments", icon: <FaTableTennis />, path: "/sports/table-tennis" },
    { name: "Basketball Management", icon: <FaBasketballBall />, path: "/sports/basketball" },
    { name: "Volleyball Tournaments", icon: <FaVolleyballBall />, path: "/sports/volleyball" },
    { name: "Award Management", icon: <FaTrophy />, path: "/sports/awards" },
    { name: "Event Scheduling", icon: <FaCalendarCheck />, path: "/sports/scheduling" },
    { name: "Participant Management", icon: <FaUsers />, path: "/sports/participants" },
    { name: "Team Management Form", icon: <FaClipboard />, path: "/sports/team-management" },
    { name: "Match Scheduling Form", icon: <FaClock />, path: "/sports/match-scheduling" },
    { name: "Event Creation Form", icon: <FaClipboard />, path: "/sports/event-creation" },
    { name: "Attendance Form", icon: <FaClipboardList />, path: "/sports/attendance" },
    { name: "Performance Evaluation Form", icon: <FaAward />, path: "/sports/performance-evaluation" },
    { name: "Equipment Request Form", icon: <FaBoxOpen />, path: "/sports/equipment-request" },
    { name: "Budget Request Form", icon: <FaRupeeSign />, path: "/sports/budget-request" },
    { name: "Sponsorship Form", icon: <FaHandshake />, path: "/sports/sponsorship" },
    { name: "Resource Allocation Form", icon: <FaBoxOpen />, path: "/sports/resource-allocation" },
    { name: "Medical Form", icon: <FaClipboardList />, path: "/sports/medical-form" },
    { name: "Feedback Form", icon: <FaClipboard />, path: "/sports/feedback" },
    { name: "Transport and Logistics Form", icon: <FaTruck />, path: "/sports/transport-logistics" },
    { name: "Risk Management Form", icon: <FaExclamationTriangle />, path: "/sports/risk-management" },
    { name: "Certificate Generation Form", icon: <FaAward />, path: "/sports/certificate-generation" },
    { name: "Media and Promotion Form", icon: <FaBullhorn />, path: "/sports/media-promotion" },
    { name: "Facility Management Form", icon: <FaClipboardList />, path: "/sports/facility-management" },
    { name: "Coach/Staff Management Form", icon: <FaUsers />, path: "/sports/coach-staff-management" },
    { name: "Payment Management Form", icon: <FaRupeeSign />, path: "/sports/payment-management" }
  ];

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 min-h-screen pt-32">
      <main className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5 border-2 border-gray-300 p-4 bg-white">
            <button 
              onClick={() => router.push("/dashboard")}
              className="bg-green-600 text-white px-4 py-2 flex items-center gap-2 shadow-md hover:bg-green-700"
            >
              Go Back
            </button>
            <h2 className="text-2xl text-center flex items-center gap-3">
              <FaTrophy className="text-green-500 text-2xl animate-pulse" />
              <span className="tracking-wide text-gray-800">Sports Management</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sportsServices.map((service, index) => (
              <Link href={service.path} key={index}>
                <div
                  className="p-8 shadow-lg flex flex-col items-center cursor-pointer border border-gray-300 transition-transform hover:scale-105 hover:shadow-2xl bg-white text-gray-900 hover:bg-green-50 hover:border-green-400"
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

export default Sports_Management_Page;

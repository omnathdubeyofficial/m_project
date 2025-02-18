"use client";
import { 
  FaUniversity, FaUserGraduate, FaUserTie, FaChartBar, FaUsers, FaFileAlt, 
  FaBus, FaCogs, FaBook, FaFlask, FaDesktop, FaBroom, FaShieldAlt, FaClipboardCheck, 
  FaCalendarAlt, FaFutbol, FaTrophy, FaBell, FaUserPlus, FaMoneyBillWave 
} from 'react-icons/fa';
import './style.css';
import { useRouter } from 'next/navigation';
import Navbar from '../navbar/page';

const Dashboard = () => {
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', icon: FaChartBar, link: '/dashboard/admin_dashboard', bg: 'bg-blue-100', text: 'text-blue-800' },
    { name: 'University Management', icon: FaUniversity, link: '/components/university', bg: 'bg-green-100', text: 'text-green-800' },
    { name: 'Students Management', icon: FaUserGraduate, link: '/students', bg: 'bg-purple-100', text: 'text-purple-800' },
    { name: 'Parents Management', icon: FaUserTie, link: '/parents', bg: 'bg-yellow-100', text: 'text-yellow-800' },
    { name: 'Staff Management', icon: FaUsers, link: '/staff', bg: 'bg-red-100', text: 'text-red-800' },
    { name: 'Transport Drivers', icon: FaBus, link: '/transport-drivers', bg: 'bg-orange-100', text: 'text-orange-800' },
    { name: 'Transport Vehicles', icon: FaCogs, link: '/transport-vehicles', bg: 'bg-teal-100', text: 'text-teal-800' },
    { name: 'Library Management', icon: FaBook, link: '/library', bg: 'bg-pink-100', text: 'text-pink-800' },
    { name: 'Lab Management', icon: FaFlask, link: '/lab', bg: 'bg-indigo-100', text: 'text-indigo-800' },
    { name: 'Computer Section', icon: FaDesktop, link: '/computer-section', bg: 'bg-cyan-100', text: 'text-cyan-800' },
    { name: 'Housekeeping Staff', icon: FaBroom, link: '/housekeeping', bg: 'bg-lime-100', text: 'text-lime-800' },
    { name: 'Security Staff', icon: FaShieldAlt, link: '/security-staff', bg: 'bg-amber-100', text: 'text-amber-800' },
    { name: 'Exam Management', icon: FaClipboardCheck, link: '/exam-management', bg: 'bg-emerald-100', text: 'text-emerald-800' },
    { name: 'Event Management', icon: FaCalendarAlt, link: '/event-management', bg: 'bg-fuchsia-100', text: 'text-fuchsia-800' },
    { name: 'Sports Management', icon: FaFutbol, link: '/sports-management', bg: 'bg-gray-100', text: 'text-gray-800' },
    { name: 'Competition Management', icon: FaTrophy, link: '/competition-management', bg: 'bg-rose-100', text: 'text-rose-800' },
    { name: 'Report Management', icon: FaFileAlt, link: '/report-management', bg: 'bg-sky-100', text: 'text-sky-800' },
    { name: 'Notification Management', icon: FaBell, link: '/notification-management', bg: 'bg-violet-100', text: 'text-violet-800' },
    { name: 'Admission Management', icon: FaUserPlus, link: '/admission-management', bg: 'bg-stone-200', text: 'text-stone-800' },
    { name: 'Fee Management', icon: FaMoneyBillWave, link: '/fee-management', bg: 'bg-zinc-300', text: 'text-zinc-900' },

  ];

  return (
    <div >
      <Navbar />
      <div className="flex flex-col flex-1 p-6 pt-24">
        <div className="w-full mx-auto p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menuItems.map((item, index) => (
              <div 
                key={index} 
                onClick={() => router.push(item.link)} 
                className={`p-6 ${item.bg}  shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer`}
              >
                <item.icon className={`text-4xl ${item.text}`} />
                <h2 className={`text-xl font-semibold ${item.text} mt-4`}>{item.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
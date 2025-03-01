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
    { name: 'University Management', icon: FaUniversity, link: '/components/University_Dashboard', bg: 'bg-green-100', text: 'text-green-800' },
    { name: 'Students Management', icon: FaUserGraduate, link: '/Students_Management/Students_Management_Data', bg: 'bg-purple-100', text: 'text-purple-800' },
    { name: 'Parents Management', icon: FaUserTie, link: '/Parents_Management/Parents_Management_Data', bg: 'bg-yellow-100', text: 'text-yellow-800' },
    { name: 'Staff Management', icon: FaUsers, link: '/Staff_Management/Staff_Management_Data', bg: 'bg-red-100', text: 'text-red-800' },
    { name: 'Transport Drivers', icon: FaBus, link: '/Drivers_Transport/Drivers_Transport_Data', bg: 'bg-orange-100', text: 'text-orange-800' },
    { name: 'Transport Vehicles', icon: FaCogs, link: '/transport_vhicles/transportVehiclesData', bg: 'bg-teal-100', text: 'text-teal-800' },
    { name: 'Library Management', icon: FaBook, link: '/components/Librarian_Dashboard', bg: 'bg-pink-100', text: 'text-pink-800' },
    { name: 'Lab Management', icon: FaFlask, link: '/Lab_Management/Lab_Management_Data', bg: 'bg-indigo-100', text: 'text-indigo-800' },
    { name: 'Computer Section', icon: FaDesktop, link: '/Computer_Section/Computer_Section_Data', bg: 'bg-cyan-100', text: 'text-cyan-800' },
    { name: 'Housekeeping Staff', icon: FaBroom, link: '/Housekeeping_Staff/Housekeeping_Staff_Data', bg: 'bg-lime-100', text: 'text-lime-800' },
    { name: 'Security Staff', icon: FaShieldAlt, link: '/Security_Staff/Security_Staff_Data', bg: 'bg-amber-100', text: 'text-amber-800' },
    { name: 'Exam Management', icon: FaClipboardCheck, link: '/Exam_Management/Exam_Management_Data', bg: 'bg-emerald-100', text: 'text-emerald-800' },
    { name: 'Event Management', icon: FaCalendarAlt, link: '/Event_Management/Event_Management_Data', bg: 'bg-fuchsia-100', text: 'text-fuchsia-800' },
    { name: 'Sports Management', icon: FaFutbol, link: '/Sports_Management/Sports_Management_Data', bg: 'bg-gray-100', text: 'text-gray-800' },
    { name: 'Competition Management', icon: FaTrophy, link: '/Competition_Management/Competition_Management_Data', bg: 'bg-rose-100', text: 'text-rose-800' },
    { name: 'Report Management', icon: FaFileAlt, link: '/Report_Management/Report_Management_Data', bg: 'bg-sky-100', text: 'text-sky-800' },
    { name: 'Notification Management', icon: FaBell, link: '/Notification_Management/Notification_Management_Data', bg: 'bg-violet-100', text: 'text-violet-800' },
    { name: 'Admission Management', icon: FaUserPlus, link: '/Admission_Management/Admission_Management_Data', bg: 'bg-stone-200', text: 'text-stone-800' },
    { name: 'Fee Management', icon: FaMoneyBillWave, link: '/Fee_Management/Fee_Management_Data', bg: 'bg-zinc-300', text: 'text-zinc-900' },

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
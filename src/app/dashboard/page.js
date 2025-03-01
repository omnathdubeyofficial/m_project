"use client";
import { 
  FaUniversity, FaUserGraduate, FaUserTie, FaChartBar, FaUsers, FaFileAlt, 
  FaBus, FaCogs, FaBook, FaFlask, FaDesktop, FaBroom, FaShieldAlt, FaClipboardCheck, 
  FaCalendarAlt, FaFutbol, FaTrophy, FaBell, FaUserPlus, FaMoneyBillWave 
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Navbar from '../navbar/page';

const Dashboard = () => {
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', icon: FaChartBar, link: '/dashboard/admin_dashboard' },
    { name: 'University Management', icon: FaUniversity, link: '/components/University_Dashboard' },
    { name: 'Students Management', icon: FaUserGraduate, link: '/Students_Management/Students_Management_Data' },
    { name: 'Parents Management', icon: FaUserTie, link: '/Parents_Management/Parents_Management_Data' },
    { name: 'Transport Management', icon: FaCogs, link: '/components/Transport_Dashboard' },
    { name: 'Library Management', icon: FaBook, link: '/components/Librarian_Dashboard' },
    { name: 'Lab Management', icon: FaFlask, link: '/components/Lab_Dashboard' },
    { name: 'Staff Management', icon: FaUsers, link: '/Staff_Management/Staff_Management_Data' },
    { name: 'Transport Drivers', icon: FaBus, link: '/Drivers_Transport/Drivers_Transport_Data' },

    { name: 'Computer Section', icon: FaDesktop, link: '/Computer_Section/Computer_Section_Data' },
    { name: 'Housekeeping Staff', icon: FaBroom, link: '/Housekeeping_Staff/Housekeeping_Staff_Data' },
    { name: 'Security Staff', icon: FaShieldAlt, link: '/Security_Staff/Security_Staff_Data' },
    { name: 'Exam Management', icon: FaClipboardCheck, link: '/Exam_Management/Exam_Management_Data' },
    { name: 'Event Management', icon: FaCalendarAlt, link: '/Event_Management/Event_Management_Data' },
    { name: 'Sports Management', icon: FaFutbol, link: '/Sports_Management/Sports_Management_Data' },
    { name: 'Competition Management', icon: FaTrophy, link: '/Competition_Management/Competition_Management_Data' },
    { name: 'Report Management', icon: FaFileAlt, link: '/Report_Management/Report_Management_Data' },
    { name: 'Notification Management', icon: FaBell, link: '/Notification_Management/Notification_Management_Data' },
    { name: 'Admission Management', icon: FaUserPlus, link: '/Admission_Management/Admission_Management_Data' },
    { name: 'Fee Management', icon: FaMoneyBillWave, link: '/Fee_Management/Fee_Management_Data' },
  ];

  return (
    <div>
      <Navbar />
      <div className="flex flex-col flex-1 p-6 pt-24 bg-white min-h-screen">
        <div className="w-full mx-auto p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menuItems.map((item, index) => (
              <div 
                key={index} 
                onClick={() => router.push(item.link)} 
                className="p-6 bg-green-50 text-gray-800 shadow-md hover:shadow-lg transition-all transform hover:scale-105 cursor-pointer  border border-gray-200 flex flex-col items-center justify-center"
              >
                <item.icon className="text-5xl mb-4 text-gray-600" />
                <h2 className="text-lg font-medium">{item.name}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

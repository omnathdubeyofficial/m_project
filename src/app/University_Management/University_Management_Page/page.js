"use client";
import {
  FaUniversity, FaUserGraduate, FaUserTie, FaChartBar, FaUsers, FaFileAlt,
  FaBus, FaCogs, FaBook, FaFlask, FaDesktop, FaBroom, FaShieldAlt, FaClipboardCheck,
  FaCalendarAlt, FaFutbol, FaTrophy, FaBell, FaUserPlus, FaMoneyBillWave,FaSignOutAlt,FaArrowLeft
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Loading from '../../Loader/page';
import Panel_Header from '../../dashboard/panel_header';

const University_Management_Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  const menuItems = [
    { name: 'University Information Management', icon: FaChartBar, link: '/University_Management/University_Management_Page/Academic_Calendar_List' },
    { name: 'Student Management', icon: FaUniversity, link: "/University_Management/University_Management_Page/Academic_Calendar_Form" },
    { name: 'Class Data Form', icon: FaFlask, link: '/University_Management/University_Management_Page/Class_Data_Form' },
  ];

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7ff] via-[#e6f0fa] to-[#e0f2e9] pt-24 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       
     <Panel_Header/>
        {/* Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => router.push(item.link)}
              className="group relative bg-white  shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer p-6 flex flex-col items-center text-center overflow-hidden border border-gray-100 hover:border-indigo-300"
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

              {/* Icon */}
              <div className="relative z-10 bg-indigo-100 p-4 rounded-full mb-4 group-hover:bg-indigo-200 transition-colors duration-300">
                <item.icon className="text-3xl text-indigo-600 group-hover:text-indigo-800 transition-transform duration-300 group-hover:scale-110" />
              </div>

              {/* Menu Name */}
              <span className="relative z-10 text-base font-medium text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">
                {item.name}
              </span>

              {/* Subtle Hover Effect */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default University_Management_Page;
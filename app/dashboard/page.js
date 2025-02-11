"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaUniversity, FaUserGraduate, FaUserTie, FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';
import './style.css';

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = {
      profileImg: '/img/om.webp',
      username: 'Omnath Dubey',
      profession: 'Super Admin',
      userId: '123456',
    };
    setUser(userData);
  }, []);

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative">
      {/* Background Video */}
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
        <source src="/video/sch.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="w-full max-w-6xl p-8 bg-white shadow-2xl rounded-none lg:rounded-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 sm:mb-8">
          {/* Logo and Title */}
          <div className="flex flex-col items-center md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Image src="/img/image.png" alt="College Logo" width={60} height={60} />
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center md:text-left text-gray-800">
              Dr. Ram Manohar Lohia Avadh University
            </h1>
          </div>

          {/* Profile Section */}
          {user && (
            <div className="flex items-center space-x-4 pt-4 md:pt-8">
              <div className="text-center md:text-right">
                <h1 className="text-sm sm:text-base text-gray-800">{user.username}</h1>
                <p className="text-xs sm:text-sm text-gray-600">{user.profession}</p>
                <p className="text-xs sm:text-sm text-gray-600">User ID: {user.userId}</p>
              </div>
              <Image src={user.profileImg} alt="Profile" width={64} height={64} className="rounded-full border-2 border-gray-300" />
            </div>
          )}
        </div>

        {/* Corners Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mt-6">
          <div onClick={() => router.push('/components/university')} className="p-4 sm:p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer">
            <FaUniversity className="text-3xl sm:text-4xl text-blue-800" />
            <h2 className="text-lg sm:text-xl font-semibold text-blue-800 mt-2 sm:mt-4">University Corner</h2>
            <p className="text-gray-700 text-sm sm:text-base mt-1 sm:mt-2">Manage university operations and settings.</p>
          </div>

          <div onClick={() => router.push('/student')} className="p-4 sm:p-6 bg-gradient-to-r from-green-100 to-green-200 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer">
            <FaUserGraduate className="text-3xl sm:text-4xl text-green-800" />
            <h2 className="text-lg sm:text-xl font-semibold text-green-800 mt-2 sm:mt-4">Student Corner</h2>
            <p className="text-gray-700 text-sm sm:text-base mt-1 sm:mt-2">View and manage student profiles and progress.</p>
          </div>

          <div onClick={() => router.push('/parent')} className="p-4 sm:p-6 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer">
            <FaUserTie className="text-3xl sm:text-4xl text-purple-800" />
            <h2 className="text-lg sm:text-xl font-semibold text-purple-800 mt-2 sm:mt-4">Parent Corner</h2>
            <p className="text-gray-700 text-sm sm:text-base mt-1 sm:mt-2">Access reports and communication tools for parents.</p>
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center mt-6 sm:mt-8">
          <button onClick={handleLogout} className="flex items-center px-6 sm:px-8 py-2 sm:py-3 bg-red-500 text-white text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:bg-red-600 transition-all">
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaUniversity, FaUserGraduate, FaUserTie, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa'; // Added sun and moon icons
import Image from 'next/image'; // Import Next.js Image component
import './style.css';

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Default is false (light mode)

  // Toggle the theme between light and dark
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark'); // Save theme preference to localStorage
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      router.push('/login'); // Redirect to login if not authenticated
    }

    // Fetch user data (example from localStorage or API)
    const userData = {
      profileImg: '/img/om.webp', // Replace with actual image path in public directory
      username: 'Omnath Dubey',
      profession: 'Super Admin',
      userId: '123456',
    };
    setUser(userData);

    // Check for theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }

    // Apply dark mode or light mode based on the state
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove authentication token
    router.push('/login'); // Redirect to login page
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen relative`}>
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="/video/sch.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="w-full max-w-6xl p-8 bg-white dark:bg-gray-800 shadow-2xl rounded-2xl">
        
        {/* Header Section - Logo on left and Profile on right */}
        <div className="flex items-center justify-between mb-8">
          {/* College Logo */}
          <div className="flex items-center space-x-4">
            <Image
              src="/img/image.png" // Add the college logo in the public folder
              alt="College Logo"
              width={60} // Adjust size as necessary
              height={60} // Adjust size as necessary
            />
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dr. Ram Manohar Lohia Avadh University</h1>
          </div>

          {/* Profile Section */}
          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <h1 className="text-1xl font-bold text-gray-800 dark:text-white">{user.username}</h1>
                <p className="text-gray-600 dark:text-gray-400">{user.profession}</p>
                <p className="text-gray-600 dark:text-gray-300">User ID: {user.userId}</p>
              </div>
              <Image
                src={user.profileImg}
                alt="Profile"
                width={96}
                height={96}
                className="rounded-full border-2 border-gray-300"
              />
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center p-3 bg-gray-100 rounded-full shadow-lg hover:bg-gray-200 transition-all"
          >
            {isDarkMode ? (
              <FaSun className="text-yellow-400" size={24} />
            ) : (
              <FaMoon className="text-gray-800" size={24} />
            )}
          </button>
        </div>

        {/* University, Student, Parent Corners Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* University Corner */}
          <div
            onClick={() => router.push('/university')} // Navigate to university page
            className="p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
          >
            <FaUniversity className="text-4xl text-blue-800" />
            <h2 className="text-xl font-semibold text-blue-800 mt-4">University Corner</h2>
            <p className="text-gray-700 mt-2">Manage university operations and settings.</p>
          </div>

          {/* Student Corner */}
          <div
            onClick={() => router.push('/student')} // Navigate to student page
            className="p-6 bg-gradient-to-r from-green-100 to-green-200 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
          >
            <FaUserGraduate className="text-4xl text-green-800" />
            <h2 className="text-xl font-semibold text-green-800 mt-4">Student Corner</h2>
            <p className="text-gray-700 mt-2">View and manage student profiles and progress.</p>
          </div>

          {/* Parent Corner */}
          <div
            onClick={() => router.push('/parent')} // Navigate to parent page
            className="p-6 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
          >
            <FaUserTie className="text-4xl text-purple-800" />
            <h2 className="text-xl font-semibold text-purple-800 mt-4">Parent Corner</h2>
            <p className="text-gray-700 mt-2">Access reports and communication tools for parents.</p>
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLogout}
            className="flex items-center px-8 py-3 bg-red-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-red-600 transition-all"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

'use client';

import React, { useEffect, useState } from 'react';
import { FaSignOutAlt, FaArrowLeft, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { GET_TOKAN_MANAGEMENT_DATA } from '../query/authTokanQuery';
import { LOGOUT_MUTATION } from '../mutation/logoutMutation/logoutMutation';
import { executeQuery, executeMutation } from '../graphqlClient';

const Dashboard = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [logoutMessage, setLogoutMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await executeQuery(GET_TOKAN_MANAGEMENT_DATA);
        const userData = response?.getUserDataFromToken;

        if (userData && userData.first_name) {
          setFirstName(userData.first_name);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const onLogout = async () => {
    try {
      const response = await executeMutation(LOGOUT_MUTATION);
      const message = response?.logout?.message;

      if (message) {
        // Success popup
        setIsError(false);
        setLogoutMessage(message);
        setShowPopup(true);

        localStorage.removeItem('auth_token');

        setTimeout(() => {
          setShowPopup(false);
          router.push('/login');
        }, 3000);
      }
    } catch (error) {
      // Error popup
      setIsError(true);
      setLogoutMessage('Logout failed. Please try again.');
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="relative">
      {/* Logout Popup */}
      {showPopup && (
        <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          ${isError ? 'bg-red-600' : 'bg-green-600'} 
          text-white px-8 py-6 rounded-xl shadow-2xl z-50 flex items-center gap-4 max-w-md w-full`}>
          <div className="text-4xl">
            {isError ? <FaTimesCircle className="text-white" /> : <FaCheckCircle className="text-white" />}
          </div>
          <div className="text-lg font-medium">{logoutMessage}</div>
        </div>
      )}

      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 py-4 mb-2 bg-white shadow-md">
        {/* Left Section - Back Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-sm text-gray-600 hover:text-indigo-600 transition"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
        </div>

        {/* Center - Title */}
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center">
  Hello{' '}
  <span className="bg-green-600 px-2 text-white rounded">
    {/* Mobile View - Truncated Name */}
    <span className="inline sm:hidden">
      {(firstName && firstName.length > 6)
        ? `${firstName.slice(0, 6)}...`
        : (firstName || '...')}
    </span>
    {/* Desktop View - Full Name */}
    <span className="hidden sm:inline">
      {firstName || '...'}
    </span>
  </span>
</h1>


        {/* Right Section - Logout */}
        <div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-1 hover:bg-red-600 transition duration-300 font-semibold shadow-sm"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </header>
    </div>
  );
};

export default Dashboard;

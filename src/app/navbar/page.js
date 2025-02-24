'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, LogOut, User, Settings, Edit, MessageSquare } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { GET_TOKAN_MANAGEMENT_DATA } from "../query/authTokanQuery";
import {LOGOUT_MUTATION} from "../mutation/logoutMutation/logoutMutation"
import { executeQuery,executeMutation } from "../graphqlClient";

export default function SchoolNavbar({ role }) {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState('');
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const messageRef = useRef(null);


  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await executeQuery(GET_TOKAN_MANAGEMENT_DATA);
  
        if (response && response.getUserDataFromToken) {
          const userData = response.getUserDataFromToken;
          setUser(userData); 
        }
      } catch (error) {
        console.error("Error Fetching User Data:", error);
      }
    };
  
    fetchUserData();
  }, [router]);
  





  const closeAllMenus = (event) => {
    if (
      profileRef.current && !profileRef.current.contains(event.target) &&
      notificationRef.current && !notificationRef.current.contains(event.target) &&
      messageRef.current && !messageRef.current.contains(event.target)
    ) {
      setShowProfileMenu(false);
      setShowNotifications(false);
      setShowMessages(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await executeMutation(LOGOUT_MUTATION);
      
      if (response ) {
        setLogoutMessage('' + response.logout.message);
        
        setTimeout(() => {
          window.location.reload(); 
        }, 1000);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeAllMenus);
    return () => document.removeEventListener("click", closeAllMenus);
  }, []);


  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //       <h1 className="text-xl font-semibold text-gray-700">Loading...</h1>
  //     </div>
  //   );
  // }

  return (
<nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 text-white p-4 shadow-lg flex justify-between items-center z-50 backdrop-blur-md bg-opacity-90 border-b border-white/10">
{/* School Logo & Name */}
      <div className="flex items-center gap-2">
  <Image src="/img/logo.png" alt="School Logo" width={90} height={90} className="rounded-full" />
  {/* <h1 className="text-lg font-bold hidden md:block">VaeKon InfoTech School</h1> */}
</div>


      {/* Icons: Notifications, Messages, Profile */}
      <div className="flex gap-4 items-center relative">
        {/* Notifications */}
        <button 
          ref={notificationRef}
          onClick={(e) => { 
            e.stopPropagation();
            setShowNotifications(!showNotifications);
            setShowMessages(false);
            setShowProfileMenu(false);
          }}
          className="relative p-2 bg-white text-blue-600 rounded-full shadow-md"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">3</span>
        </button>

       {/* Notification Dropdown */}
{showNotifications && (
  <div className="absolute right-20 top-14 w-64 sm:w-72 bg-white text-gray-800 shadow-lg rounded-lg p-4 z-50 border border-gray-200">
    <h3 className="font-semibold text-lg mb-3 text-gray-700">Notifications</h3>
    <ul className="text-sm space-y-2">
      <li className="py-3 border-b hover:bg-gray-100 p-2 rounded-md transition">
        <Link href="/homework" className="text-gray-700 text-sm flex-1 truncate">
          📌 New homework assigned
        </Link>
      </li>
      <li className="py-3 border-b hover:bg-gray-100 p-2 rounded-md transition">
        <Link href="/events" className="text-gray-700 text-sm flex-1 truncate">
          📅 Upcoming PTM on March 5
        </Link>
      </li>
      <li className="py-3 hover:bg-gray-100 p-2 rounded-md transition">
        <Link href="/results" className="text-gray-700 text-sm flex-1 truncate">
          🎯 Exam results available
        </Link>
      </li>
    </ul>
  </div>
)}


        {/* Messages */}
        <button 
          ref={messageRef}
          onClick={(e) => { 
            e.stopPropagation();
            setShowMessages(!showMessages);
            setShowNotifications(false);
            setShowProfileMenu(false);
          }}
          className="relative p-2 bg-white text-blue-600 rounded-full shadow-md"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">3</span>

        </button>

       {/* Messages Dropdown */}
{showMessages && (
  <div className="absolute right-10 top-14 w-64 sm:w-72 bg-white text-gray-800 shadow-lg rounded-lg p-4 z-50 border border-gray-200">
    <h3 className="font-semibold text-lg mb-3 text-gray-700">Teachers</h3>
    <ul className="text-sm space-y-2">
      <li className="flex items-center gap-3 py-3 border-b hover:bg-gray-100 p-2 rounded-md transition">
        <Image src="/teacher1.jpg" alt="Teacher" width={32} height={32} className="rounded-full" />
        <Link href="/chat/mr-sharma" className="text-gray-700 text-sm flex-1 truncate">
          Mr. Sharma
        </Link>
      </li>
      <li className="flex items-center gap-3 py-3 border-b hover:bg-gray-100 p-2 rounded-md transition">
        <Image src="/teacher2.jpg" alt="Teacher" width={32} height={32} className="rounded-full" />
        <Link href="/chat/ms-gupta" className="text-gray-700 text-sm flex-1 truncate">
          Ms. Gupta
        </Link>
      </li>
      <li className="flex items-center gap-3 py-3 hover:bg-gray-100 p-2 rounded-md transition">
        <Image src="/teacher3.jpg" alt="Teacher" width={32} height={32} className="rounded-full" />
        <Link href="/chat/dr-verma" className="text-gray-700 text-sm flex-1 truncate">
          Dr. Verma
        </Link>
      </li>
    </ul>
  </div>
)}


        {/* Profile */}


      
        <button 
  ref={profileRef}
  onClick={(e) => { 
    e.stopPropagation();
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
    setShowMessages(false);
  }}
  className="w-[50px] h-[50px] rounded-full overflow-hidden"
>
  <Image 
    src="/img/q.png" 
    alt="Profile" 
    width={85}  
    height={85} 
    className="rounded-full object-cover object-center w-full h-full"
  />
</button>






     {/* Profile Dropdown */}
{showProfileMenu && user && (
  <div className="absolute right-0 top-14 w-64 sm:w-72 bg-white text-gray-800 shadow-lg rounded-lg p-4 z-50 border border-gray-200">
    <h3 className="font-semibold text-lg mb-3 text-gray-700">Profile</h3>
    <ul className="text-sm space-y-2">
      <li className="flex flex-col gap-1 py-3 border-b p-2">
        <span className="text-blue-600 font-semibold text-base truncate">{user.first_name} {user.last_name}</span>
        <span className="text-gray-500 text-xs truncate">{user.email}</span>
      </li>
      <li className="flex items-center gap-3 py-3 border-b hover:bg-gray-100 p-2 rounded-md transition">
        <User className="w-5 h-5 text-blue-600" />
        <span className="text-sm flex-1 truncate">User ID - <span className="text-blue-600">{user.userid}</span></span>
      </li>
      <li className="flex items-center gap-3 py-3 border-b hover:bg-gray-100 p-2 rounded-md transition">
        <Edit className="w-4 h-4 text-gray-600" />
        <Link href="/profile/edit" className="flex-1 truncate">Edit Profile</Link>
      </li>
      <li className="flex items-center gap-3 py-3 border-b hover:bg-gray-100 p-2 rounded-md transition">
        <Settings className="w-4 h-4 text-gray-600" />
        <Link href="/settings" className="flex-1 truncate">Settings</Link>
      </li>
      <li className="flex items-center gap-3 py-3 text-red-600 hover:bg-gray-100 p-2 rounded-md transition">
        <LogOut className="w-4 h-4 text-red-600" />
        <button onClick={handleLogout} className="text-red-600 ">Logout</button>
      </li>
    </ul>
  </div>
)}


{logoutMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg flex items-center space-x-2 z-50">
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>{logoutMessage}</span>
        </div>
      )}

      </div>
    </nav>
  );
}

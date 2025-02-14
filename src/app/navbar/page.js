'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, LogOut, User, Settings, Edit, MessageSquare } from 'lucide-react';
import Cookies from "js-cookie";

export default function SchoolNavbar({ role }) {
  const router = useRouter();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const messageRef = useRef(null);

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

  const handleLogout = () => {
    Cookies.remove("authToken"); // Auth token remove karein
    localStorage.clear(); // Local storage clear karein
    sessionStorage.clear(); // Session storage clear karein
    router.replace("/login"); // Login page par redirect karein
  };

  useEffect(() => {
    document.addEventListener("click", closeAllMenus);
    return () => document.removeEventListener("click", closeAllMenus);
  }, []);

  return (
<nav className="fixed top-0 left-0 w-full bg-blue-600 text-white p-4 shadow-md flex justify-between items-center  z-50">
{/* School Logo & Name */}
      <div className="flex items-center gap-2">
  <Image src="/img/logo.png" alt="School Logo" width={90} height={90} className="rounded-full" />
  <h1 className="text-lg font-bold hidden md:block">VaeKon InfoTech School</h1>
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
          <div className="absolute right-20 top-12 w-64 bg-white text-gray-800 shadow-lg rounded-lg p-3">
            <h3 className="font-semibold mb-2">Notifications</h3>
            <ul className="text-sm">
              <li className="py-2 border-b hover:bg-gray-100 p-2">
                <Link href="/homework">New homework assigned</Link>
              </li>
              <li className="py-2 border-b hover:bg-gray-100 p-2">
                <Link href="/events">Upcoming PTM on March 5</Link>
              </li>
              <li className="py-2 hover:bg-gray-100 p-2">
                <Link href="/results">Exam results available</Link>
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
          <div className="absolute right-10 top-12 w-64 bg-white text-gray-800 shadow-lg rounded-lg p-3">
            <h3 className="font-semibold mb-2">Teachers</h3>
            <ul className="text-sm">
              <li className="flex items-center gap-2 py-2 border-b hover:bg-gray-100 p-2">
                <Image src="/teacher1.jpg" alt="Teacher" width={24} height={24} className="rounded-full" />
                <Link href="/chat/mr-sharma">Mr. Sharma</Link>
              </li>
              <li className="flex items-center gap-2 py-2 border-b hover:bg-gray-100 p-2">
                <Image src="/teacher2.jpg" alt="Teacher" width={24} height={24} className="rounded-full" />
                <Link href="/chat/ms-gupta">Ms. Gupta</Link>
              </li>
              <li className="flex items-center gap-2 py-2 hover:bg-gray-100 p-2">
                <Image src="/teacher3.jpg" alt="Teacher" width={24} height={24} className="rounded-full" />
                <Link href="/chat/dr-verma">Dr. Verma</Link>
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
          className="p-2 bg-white text-blue-600 rounded-full shadow-md"
        >
          <User className="w-5 h-5" />
        </button>

        {/* Profile Dropdown */}
        {showProfileMenu && (
          <div className="absolute right-0 top-12 w-48 bg-white text-gray-800 shadow-lg rounded-lg p-3">
            <h3 className="font-semibold mb-2">Profile</h3>
            <ul className="text-sm">
            <li className="flex items-center gap-2 py-2 border-b hover:bg-gray-100 p-2">
            <User className="w-5 h-5" />
                <Link href="/profile/edit">User ID - <span className='text-blue-600'>783993</span></Link>
              </li>
              <li className="flex items-center gap-2 py-2 border-b hover:bg-gray-100 p-2">
                <Edit className="w-4 h-4" />
                <Link href="/profile/edit">Edit Profile</Link>
              </li>
              <li className="flex items-center gap-2 py-2 border-b hover:bg-gray-100 p-2">
                <Settings className="w-4 h-4" />
                <Link href="/settings">Settings</Link>
              </li>
              <li className="flex items-center gap-2 py-2 text-red-600 hover:bg-gray-100 p-2">
  <LogOut className="w-4 h-4" />
  <button onClick={handleLogout} className="text-red-600">Logout</button>
</li>

            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

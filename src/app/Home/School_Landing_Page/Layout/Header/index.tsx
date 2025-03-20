"use client";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {useMemo, useState, useEffect, useRef } from 'react';
import { headerData } from "../Header/Navigation/menuData";
import Logo from "./Logo";
import HeaderLink from "../Header/Navigation/HeaderLink";
import MobileHeaderLink from "../Header/Navigation/MobileHeaderLink";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { GET_TOKAN_MANAGEMENT_DATA } from "../../../../query/authTokanQuery";
import {LOGOUT_MUTATION} from "../../../../mutation/logoutMutation/logoutMutation"
import { executeQuery,executeMutation } from "../../../../graphqlClient";


const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState('');
  const [user, setUser] = useState(null);


  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setSticky(window.scrollY >= 20);
  };


  
  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) { // Avoid redundant API calls
          const response = await executeQuery(GET_TOKAN_MANAGEMENT_DATA);
          if (response && response.getUserDataFromToken) {
            setUser(response.getUserDataFromToken);
          }
        }
      } catch (error) {
        console.error("Error Fetching User Data:", error);
      }
    };

    fetchUserData();
  }, [user]);

useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-menu')) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);


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
    if ( navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [ navbarOpen]);

  return (
    <header
    className={`fixed top-0 z-40 w-full transition-all duration-300 ${sticky ? " shadow-lg bg-white py-4" : "shadow-none bg-white py-4"
      }`}
  >
    <div className="lg:py-0 py-2">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md flex items-center justify-between px-4">
        <Logo />
        <nav className="hidden lg:flex flex-grow items-center gap-8 justify-center">
          {headerData.map((item, index) => (
            <HeaderLink key={index} item={item} />
          ))} 


        </nav>
        <div className='flex items-center gap-4'>
      {!user?.userid ? (
        <>
          <Link
            href='/login'
            className='bg-primary text-white hover:bg-primary/15 hover:text-primary text-lg py-2 px-6 rounded-full transition-all duration-300'
          >
            Login
          </Link>
          {/* <Link
            href='/student_dash/students_forms/admission_form'
            className='bg-primary text-white hover:bg-primary/15 hover:text-primary  text-lg py-2 px-6 rounded-full transition-all duration-300'
          >
            Admission Form
          </Link> */}
        </>
      ) : (
        <div className='relative'>
          <div
            className='w-14 h-14 rounded-full bg-gray-200 cursor-pointer overflow-hidden profile-menu'
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <Image
              src='/img/q.png'
              alt='Profile'
              width={500}
              height={500}
              className='w-full h-full object-cover transition-transform duration-200 hover:scale-105'
            />
          </div>

        
          {isProfileOpen && (
  <div className='absolute top-16 right-0 bg-white shadow-2xl rounded-2xl p-4 z-50 w-64 transition-all duration-300 ease-in-out transform scale-95 hover:scale-100 animate-fade-in'>
    <div className='flex items-center gap-3 mb-4 p-3 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl shadow-md'>
      <Icon icon='tabler:id' className='text-white' />
      <div className='flex-1 overflow-hidden'>
        <span className='block font-semibold truncate'>{user.userid}</span>
        <span className='block text-sm opacity-80'>User ID</span>
      </div>
    </div>
    <Link href='/ProfilePage_Management/Admin_Profile' className='flex items-center gap-3 mb-2 p-3 rounded-xl bg-gray-50 hover:bg-green-50 transition-all'>
      <Icon icon='tabler:user' className='text-green-500' />
      <span className='text-gray-800 font-medium'>Profile</span>
    </Link>
    <Link href='/ProfilePage_Management/Settings_Page' className='flex items-center gap-3 mb-2 p-3 rounded-xl bg-gray-50 hover:bg-green-50 transition-all'>
      <Icon icon='tabler:settings' className='text-green-500' />
      <span className='text-gray-800 font-medium'>Settings</span>
    </Link>
    <Link href='/ProfilePage_Management/Help_Page' className='flex items-center gap-3 mb-2 p-3 rounded-xl bg-gray-50 hover:bg-green-50 transition-all'>
      <Icon icon='tabler:help-circle' className='text-green-500' />
      <span className='text-gray-800 font-medium'>Help</span>
    </Link>
    <Link href='/notifications' className='flex items-center gap-3 mb-2 p-3 rounded-xl bg-gray-50 hover:bg-green-50 transition-all'>
      <Icon icon='tabler:bell' className='text-green-500' />
      <span className='text-gray-800 font-medium'>Notifications</span>
    </Link>
    <Link href='/ProfilePage_Management/Support_Page' className='flex items-center gap-3 mb-2 p-3 rounded-xl bg-gray-50 hover:bg-green-50 transition-all'>
      <Icon icon='tabler:lifebuoy' className='text-green-500' />
      <span className='text-gray-800 font-medium'>Support</span>
    </Link>
    <button
      onClick={handleLogout}
      className='flex items-center gap-3 w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-red-50 transition-all'
    >
      <Icon icon='tabler:logout' className='text-red-500' />
      <span className='text-red-600 font-medium'>Logout</span>
    </button>
  </div>
)}

        </div>
      )}

          
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="block lg:hidden p-2 rounded-lg"
            aria-label="Toggle mobile menu"
          >
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
            <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
          </button>
        </div>
      </div>
      {navbarOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40" />
      )}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 max-w-xs ${navbarOpen ? "translate-x-0" : "translate-x-full"
          } z-50`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-bold text-black">
            <Logo />
          </h2>

          <button
  onClick={() => setNavbarOpen(false)}
  className="w-5 h-5 absolute top-0 right-0 mr-8 mt-8"
  aria-label="Close menu Modal"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full text-black"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
</button>

        </div>
        <nav className="flex flex-col items-start p-4">
          {headerData.map((item, index) => (
            <MobileHeaderLink key={index} item={item} />
          ))}
          
        </nav>
      </div>
    </div>


{logoutMessage && (
            <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg flex items-center space-x-2 animate-fade-in">

              <FontAwesomeIcon icon={faSignOutAlt} className="w-6 h-6 text-white"  />
              <span className="font-semibold text-lg">{logoutMessage}</span>
            </div>
          )}
  </header>

  );
};

export default Header;

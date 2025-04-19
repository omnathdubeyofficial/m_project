// pages/Dashboard.jsx
"use client";
import {
  FaUniversity, FaUserGraduate, FaUserTie, FaChartBar, FaUsers, FaFileAlt,
  FaCogs, FaBook, FaFlask, FaDesktop, FaBroom, FaShieldAlt, FaClipboardCheck,
  FaCalendarAlt, FaFutbol, FaTrophy, FaBell, FaUserPlus, FaMoneyBillWave,
} from 'react-icons/fa';
import MenuGrid from '../dashboard/ReusableDash/page';
import Panel_Header from './panel_header';

const Dashboard = () => {
  const menuItems = [
    { name: 'Dashboard', icon: FaChartBar, link: '/dashboard/admin_dashboard' },
    { name: 'University Management', icon: FaUniversity, link: '/University_Management/University_Management_Page' },
    { name: 'Students Management', icon: FaUserGraduate, link: '/Students_Management/Students_Management_Page' },
    { name: 'Parents Management', icon: FaUserTie, link: '/Parents_Management/Parents_Management_Page' },
    { name: 'Transport Management', icon: FaCogs, link: '/Transport_Management/Transport_Management_Page' },
    { name: 'Library Management', icon: FaBook, link: '/Library_Management/Library_Management_Page' },
    { name: 'Lab Management', icon: FaFlask, link: '/Lab_Management/Lab_Management_Page' },
    { name: 'Staff Management', icon: FaUsers, link: '/Staff_Management/Staff_Management_Data' },
    { name: 'Computer Management', icon: FaDesktop, link: '/Computer_Section/Computer_Management_Page' },
    { name: 'Housekeeping Staff', icon: FaBroom, link: '/Housekeeping_Staff/Housekeeping_Staff_Page' },
    { name: 'Security Staff', icon: FaShieldAlt, link: '/Security_Staff/Security_Staff_Page' },
    { name: 'Exam Management', icon: FaClipboardCheck, link: '/Exam_Management/Exam_Management_Page' },
    { name: 'Event Management', icon: FaCalendarAlt, link: '/Event_Management/Event_Management_Page' },
    { name: 'Sports Management', icon: FaFutbol, link: '/Sports_Management/Sports_Management_Page' },
    { name: 'Competition Management', icon: FaTrophy, link: '/Competition_Management/Competition_Management_Page' },
    { name: 'Report Management', icon: FaFileAlt, link: '/Report_Management/Report_Management_Page' },
    { name: 'Notification Management', icon: FaBell, link: '/Notification_Management/Notification_Management_Page' },
    { name: 'Admission Management', icon: FaUserPlus, link: '/Admission_Management/Admission_Management_Page' },
    { name: 'Fee Management', icon: FaMoneyBillWave, link: '/Fee_Management/Fee_Management_Page' },
  ];

  return <MenuGrid menuItems={menuItems} headerComponent={Panel_Header} />;
};

export default Dashboard;
// pages/University_Management/University_Management_Page.jsx
"use client";
import { FaBaby, FaCheckCircle, FaIdCard } from 'react-icons/fa';
import MenuGrid from '../../dashboard/ReusableDash/page';
import Panel_Header from '../../dashboard/panel_header';

const University_Management_Page = () => {
  const menuItems = [
    {
      name: 'New Nursery Admission',
      icon: FaBaby,
      link: '/Students_Management/Students_Management_Page/New_Admission_Lists',
    },
    {
      name: 'Admission Completed',
      icon: FaCheckCircle,
      link: '/Students_Management/Students_Management_Page/Admission_Completed_List',
    },
    {
      name: 'All Identity Card',
      icon: FaIdCard,
      link: '/Students_Management/Students_Management_Page/Id_Card',
    },
  ];

  return <MenuGrid menuItems={menuItems} headerComponent={Panel_Header} />;
};

export default University_Management_Page;
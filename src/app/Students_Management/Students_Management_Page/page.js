"use client";
import {
  MdLooksOne,
  MdLooksTwo,
  MdLooks3,
  MdLooks4,
  MdLooks5,
  MdLooks6
} from 'react-icons/md';
import {  FaChalkboardTeacher, FaAddressCard } from 'react-icons/fa';
import MenuGrid from '../../dashboard/ReusableDash/page';
import Panel_Header from '../../dashboard/panel_header';

const NumberBadge = ({ label }) => (
  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold shadow-md">
    {label}
  </div>
);

const University_Management_Page = () => {
  const menuItems = [
    {
      name: 'Nursery Admission',
      icon: () => <NumberBadge label="N" />,
      link: '/Students_Management/Students_Management_Page/New_Admission_Lists',
    },
    {
      name: 'LKG Admission',
      icon: () => <NumberBadge label="L" />,
      link: '/Students_Management/Students_Management_Page/LKG_Admission',
    },
    {
      name: 'UKG Admission',
      icon: () => <NumberBadge label="U" />,
      link: '/Students_Management/Students_Management_Page/UKG_Admission',
    },
    {
      name: 'Class 1 Admission',
      icon: MdLooksOne,
      link: '/Students_Management/Students_Management_Page/Class_1_Admission',
    },
    {
      name: 'Class 2 Admission',
      icon: MdLooksTwo,
      link: '/Students_Management/Students_Management_Page/Class_2_Admission',
    },
    {
      name: 'Class 3 Admission',
      icon: MdLooks3,
      link: '/Students_Management/Students_Management_Page/Class_3_Admission',
    },
    {
      name: 'Class 4 Admission',
      icon: MdLooks4,
      link: '/Students_Management/Students_Management_Page/Class_4_Admission',
    },
    {
      name: 'Class 5 Admission',
      icon: MdLooks5,
      link: '/Students_Management/Students_Management_Page/Class_5_Admission',
    },
    {
      name: 'Class 6 Admission',
      icon: MdLooks6,
      link: '/Students_Management/Students_Management_Page/Class_6_Admission',
    },
    {
      name: 'Class 7 Admission',
      icon: () => <NumberBadge label="7" />,
      link: '/Students_Management/Students_Management_Page/Class_7_Admission',
    },
    {
      name: 'Class 8 Admission',
      icon: () => <NumberBadge label="8" />,
      link: '/Students_Management/Students_Management_Page/Class_8_Admission',
    },
    {
      name: 'Class 9 Admission',
      icon: () => <NumberBadge label="9" />,
      link: '/Students_Management/Students_Management_Page/Class_9_Admission',
    },
    {
      name: 'Class 10 Admission',
      icon: () => <NumberBadge label="10" />,
      link: '/Students_Management/Students_Management_Page/Class_10_Admission',
    },
    {
      name: 'Class 11 Admission',
      icon: () => <NumberBadge label="11" />,
      link: '/Students_Management/Students_Management_Page/Class_11_Admission',
    },
    {
      name: 'Class 12 Admission',
      icon: () => <NumberBadge label="12" />,
      link: '/Students_Management/Students_Management_Page/Class_12_Admission',
    },
    // {
    //   name: 'Admission Completed',
    //   icon: FaChalkboardTeacher,
    //   link: '/Students_Management/Students_Management_Page/Admission_Completed_List',
    // },
    // {
    //   name: 'All Identity Card',
    //   icon: FaAddressCard,
    //   link: '/Students_Management/Students_Management_Page/Id_Card',
    // }
  ];

  return <MenuGrid menuItems={menuItems} headerComponent={Panel_Header} />;
};

export default University_Management_Page;

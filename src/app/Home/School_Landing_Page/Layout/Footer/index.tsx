import React, { FC } from "react";
import Link from "next/link";
import { headerData } from "../Header/Navigation/menuData";
import { Icon } from "@iconify/react";
import Logo from "../Header/Logo";

const Footer: FC = () => {
  return (
    <footer className="pt-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 text-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 pb-8 text-center sm:text-left">
          <div className="md:col-span-2 flex flex-col items-center sm:items-start">
            <Logo />
            <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-600 mt-5 mb-8 max-w-full sm:max-w-[90%]">
              Empowering education with modern solutions for schools.
            </p>
            <div className="flex gap-4 items-center justify-center sm:justify-start">
              {/* Facebook - Official color: #1877F2 */}
              <Link href="#" className="group bg-blue-100 hover:bg-[#1877F2] rounded-full shadow-md p-2 transition duration-300">
                <Icon icon="fa6-brands:facebook-f" width="16" height="16" className="text-[#1877F2] group-hover:text-white" />
              </Link>
              {/* Instagram - Official gradient approximated: #E1306C to #F77737 */}
              <Link href="#" className="group bg-blue-100 hover:bg-gradient-to-r hover:from-[#E1306C] hover:via-[#F77737] hover:to-[#FCAF45] rounded-full shadow-md p-2 transition duration-300">
                <Icon icon="fa6-brands:instagram" width="16" height="16" className="text-[#E1306C] group-hover:text-white" />
              </Link>
              {/* Twitter (X) - Official color: #000000 (Black) */}
              <Link href="#" className="group bg-blue-100 hover:bg-black rounded-full shadow-md p-2 transition duration-300">
                <Icon icon="fa6-brands:x-twitter" width="16" height="16" className="text-black group-hover:text-white" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-gray-800 mb-6 font-semibold text-lg">School</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-600 hover:text-blue-500 text-sm transition">About Us</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-500 text-sm transition">Admissions</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-500 text-sm transition">Academics</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-500 text-sm transition">Events</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-500 text-sm transition">Contact Us</Link></li>
            </ul>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-gray-800 mb-6 font-semibold text-lg">Resources</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-600 hover:text-blue-500 text-sm transition">Library</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-500 text-sm transition">e-Learning</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-500 text-sm transition">Parent Portal</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-500 text-sm transition">Student Portal</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-blue-500 text-sm transition">Support</Link></li>
            </ul>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-gray-800 mb-6 font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {headerData.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-gray-600 hover:text-blue-500 text-sm transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 py-6 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4">
          <p className="text-xs text-gray-600 text-center md:text-left">
            @2025 - School Management System. All Rights Reserved by <Link href="#" className="hover:text-blue-500 transition">Your School Name</Link>
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link href="#" className="text-xs text-gray-600 px-3 border-r border-gray-300 hover:text-blue-500 transition">Privacy Policy</Link>
            <Link href="#" className="text-xs text-gray-600 px-3 hover:text-blue-500 transition">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
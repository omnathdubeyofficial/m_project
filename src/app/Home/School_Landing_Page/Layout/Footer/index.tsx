import React, { FC } from "react";
import Link from "next/link";
import { headerData } from "../Header/Navigation/menuData";
import { Icon } from "@iconify/react";
import Logo from "../Header/Logo";

const Footer: FC = () => {
  return (
    <footer className="pt-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 pb-8 text-center sm:text-left">
          <div className="md:col-span-2 flex flex-col items-center sm:items-start">
            <Logo />
            <p className="text-4xl font-medium text-gray-700 mt-5 mb-8 max-w-[90%]">
              Empowering education with modern solutions for schools.
            </p>
            <div className="flex gap-4 items-center justify-center sm:justify-start">
              <Link href="#" className="group bg-white hover:bg-primary rounded-full shadow-md p-2">
                <Icon icon="fa6-brands:facebook-f" width="16" height="16" className="group-hover:text-white text-black" />
              </Link>
              <Link href="#" className="group bg-white hover:bg-primary rounded-full shadow-md p-2">
                <Icon icon="fa6-brands:instagram" width="16" height="16" className="group-hover:text-white text-black" />
              </Link>
              <Link href="#" className="group bg-white hover:bg-primary rounded-full shadow-md p-2">
                <Icon icon="fa6-brands:x-twitter" width="16" height="16" className="group-hover:text-white text-black" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-black mb-6 font-semibold text-lg">School</h4>
            <ul>
              <li className="pb-3"><Link href="#" className="text-gray-700 hover:text-primary text-sm">About Us</Link></li>
              <li className="pb-3"><Link href="#" className="text-gray-700 hover:text-primary text-sm">Admissions</Link></li>
              <li className="pb-3"><Link href="#" className="text-gray-700 hover:text-primary text-sm">Academics</Link></li>
              <li className="pb-3"><Link href="#" className="text-gray-700 hover:text-primary text-sm">Events</Link></li>
              <li className="pb-3"><Link href="#" className="text-gray-700 hover:text-primary text-sm">Contact Us</Link></li>
            </ul>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-black mb-6 font-semibold text-lg">Resources</h4>
            <ul>
              <li className="pb-3"><Link href="#" className="text-gray-700 hover:text-primary text-sm">Library</Link></li>
              <li className="pb-3"><Link href="#" className="text-gray-700 hover:text-primary text-sm">e-Learning</Link></li>
              <li className="pb-3"><Link href="#" className="text-gray-700 hover:text-primary text-sm">Parent Portal</Link></li>
              <li className="pb-3"><Link href="#" className="text-gray-700 hover:text-primary text-sm">Student Portal</Link></li>
              <li className="pb-3"><Link href="#" className="text-gray-700 hover:text-primary text-sm">Support</Link></li>
            </ul>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="text-black mb-6 font-semibold text-lg">Quick Links</h4>
            <ul>
              {headerData.map((item, index) => (
                <li key={index} className="pb-3">
                  <Link href={item.href} className="text-gray-700 hover:text-primary text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 py-6 flex flex-col md:flex-row justify-center md:justify-between items-center">
          <p className="text-xs text-gray-700 mb-2 md:mb-0">
            @2025 - School Management System. All Rights Reserved by <Link href="#" className="hover:text-primary">Your School Name</Link>
          </p>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <Link href="#" className="text-xs text-gray-700 px-3 border-r border-gray-300 hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="text-xs text-gray-700 px-3 hover:text-primary">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

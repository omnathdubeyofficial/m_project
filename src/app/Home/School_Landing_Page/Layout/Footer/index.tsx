import React, { FC } from "react";
import Link from "next/link";
import { headerData } from "../Header/Navigation/menuData";
import { Icon } from "@iconify/react";
import Logo from "../Header/Logo";

const Footer: FC = () => {
  return (
    <footer className="pt-16 bg-white">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="grid grid-cols-1 sm:grid-cols-5 lg:gap-20 md:gap-6 sm:gap-12 gap-6 pb-16">
          <div className="col-span-2">
            <Logo />
            <p className="text-xs font-medium text-gray-700 mt-5 mb-16 max-w-70%">
              Open an account in minutes, get full financial
              control for much longer.
            </p>
            <div className="flex gap-6 items-center">
              <Link href="#" className="group bg-white hover:bg-primary rounded-full shadow-xl p-3">
                <Icon icon="fa6-brands:facebook-f" width="16" height="16" className="group-hover:text-white text-black" />
              </Link>
              <Link href="#" className="group bg-white hover:bg-primary rounded-full shadow-xl p-3">
                <Icon icon="fa6-brands:instagram" width="16" height="16" className="group-hover:text-white text-black" />
              </Link>
              <Link href="#" className="group bg-white hover:bg-primary rounded-full shadow-xl p-3">
                <Icon icon="fa6-brands:x-twitter" width="16" height="16" className="group-hover:text-white text-black" />
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-black mb-9 font-semibold text-xl">Company</h4>
            <ul>
              <li className="pb-5"><Link href="#" className="text-gray-700 hover:text-primary text-base">About</Link></li>
              <li className="pb-5"><Link href="#" className="text-gray-700 hover:text-primary text-base">Careers</Link></li>
              <li className="pb-5"><Link href="#" className="text-gray-700 hover:text-primary text-base">Mobile</Link></li>
              <li className="pb-5"><Link href="#" className="text-gray-700 hover:text-primary text-base">Blog</Link></li>
              <li className="pb-5"><Link href="#" className="text-gray-700 hover:text-primary text-base">How we work?</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-black mb-9 font-semibold text-xl">Information</h4>
            <ul>
              <li className="pb-5"><Link href="#" className="text-gray-700 hover:text-primary text-base">Help/FAQ</Link></li>
              <li className="pb-5"><Link href="#" className="text-gray-700 hover:text-primary text-base">Press</Link></li>
              <li className="pb-5"><Link href="#" className="text-gray-700 hover:text-primary text-base">Affiliates</Link></li>
              <li className="pb-5"><Link href="#" className="text-gray-700 hover:text-primary text-base">Hotel owners</Link></li>
              <li className="pb-5"><Link href="#" className="text-gray-700 hover:text-primary text-base">Partners</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-black mb-9 font-semibold text-xl">More</h4>
            <ul>
              {headerData.map((item, index) => (
                <li key={index} className="pb-4">
                  <Link href={item.href} className="text-gray-700 hover:text-primary text-base">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 py-10 flex justify-between items-center">
          <p className="text-sm text-gray-700">
            @2025 - Chef's kitchen. All Rights Reserved by <Link href="https://getnextjstemplates.com/" className="hover:text-primary">GetNextjsTemplates</Link>
          </p>
          <div>
            <Link href="#" className="text-sm text-gray-700 px-5 border-r border-gray-300 hover:text-primary">Privacy policy</Link>
            <Link href="#" className="text-sm text-gray-700 px-5 hover:text-primary">Terms & conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
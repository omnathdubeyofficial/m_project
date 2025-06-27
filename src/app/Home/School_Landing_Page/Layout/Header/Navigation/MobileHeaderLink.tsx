"use client";
import { useState } from "react";
import Link from "next/link";
import { IconType } from "react-icons";
// ✅ Local HeaderItem interface defined
interface HeaderItem {
  label: string;
  href: string;
  icon?: IconType;
  submenu?: HeaderItem[];
}

const MobileHeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setSubmenuOpen((prev) => !prev);
  };

  return (
    <div className="w-full">
      <div
        className="flex items-center justify-between px-4 py-2 text-black font-medium cursor-pointer hover:bg-gray-100"
        onClick={toggleSubmenu}
      >
        <Link href={item.href} className="flex-1">
          {item.label}
        </Link>
        {item.submenu && (
          <svg
            className={`w-4 h-4 ml-2 transition-transform ${
              submenuOpen ? "rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </div>

      {submenuOpen && item.submenu && (
        <div className="ml-4 border-l border-gray-200">
          {item.submenu.map((subItem, index) => (
            <MobileHeaderLink key={index} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;

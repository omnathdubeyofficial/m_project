"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { FaBook, FaChalkboardTeacher, FaUsers, FaCalendarAlt, FaHome, FaInfoCircle, FaAngleRight } from "react-icons/fa";

const HeaderLink: React.FC<{ item: HeaderItem & { icon?: IconType } }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const path = usePathname();

  const handleMouseEnter = () => {
    if (item.submenu) {
      setSubmenuOpen(true);
    }
  };

  const handleMouseLeave = () => {
    setSubmenuOpen(false);
  };

  const IconComponent = item.icon ? <item.icon className="mr-2" /> : null;

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        className={`text-xl flex items-center font-medium duration-300  ${
          path === item.href
            ? "text-primary"
            : "text-black/50 hover:text-primary"
        }`}
      >
        {IconComponent}
        {item.label}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m7 10l5 5l5-5"
            />
          </svg>
        )}
      </Link>
      {submenuOpen && item.submenu && (
        <div
          className="absolute py-2 left-0 mt-0.5 w-60 bg-white  "
          data-aos="fade-up"
          data-aos-duration="500"
        >
          {item.submenu.map((subItem, index) => (
            <div key={index} className="relative group">
              <Link
                href={subItem.href}
                className={`block px-4 py-2 flex items-center justify-between ${
                  path === subItem.href
                    ? "bg-primary text-white"
                    : "text-black hover:bg-primary hover:text-white"
                }`}
              >
                <div className="flex items-center">
                  {subItem.icon && <subItem.icon className="mr-2" />}
                  {subItem.label}
                </div>
                {subItem.submenu && <FaAngleRight />}
              </Link>
              {subItem.submenu && (
                <div className="absolute top-0 left-full hidden group-hover:block w-60 bg-white  ">
                  {subItem.submenu.map((nestedItem, nestedIndex) => (
                    <Link
                      key={nestedIndex}
                      href={nestedItem.href}
                      className={`block px-4 py-2 flex items-center ${
                        path === nestedItem.href
                          ? "bg-primary text-white"
                          : "text-black hover:bg-primary hover:text-white"
                      }`}
                    >
                      {nestedItem.icon && <nestedItem.icon className="mr-2" />}
                      {nestedItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderLink;

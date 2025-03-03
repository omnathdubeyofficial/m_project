import { useState } from "react";
import Link from "next/link";
import { HeaderItem } from "../../../../types/menu";

const MobileHeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [nestedMenuOpen, setNestedMenuOpen] = useState<{
    [key: number]: boolean;
  }>({});

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const handleNestedToggle = (index: number) => {
    setNestedMenuOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="relative w-full">
      <button
        onClick={handleToggle}
        className="flex items-center justify-between w-full py-2 px-4 text-muted focus:outline-none hover:bg-primary hover:text-white transition-colors duration-300"
      >
        {item.label}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
            className={`transition-transform duration-300 ${submenuOpen ? "rotate-90" : "rotate-0"}`}
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
      </button>

      {submenuOpen && item.submenu && (
        <div className="bg-white pl-4 w-full border-l-2 border-primary">
          {item.submenu.map((subItem, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => handleNestedToggle(index)}
                className="flex items-center justify-between w-full py-2 px-4 text-gray-600 hover:bg-primary hover:text-white focus:outline-none transition-colors duration-300"
              >
                {subItem.label}
                {subItem.submenu && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                    className={`transition-transform duration-300 ${nestedMenuOpen[index] ? "rotate-90" : "rotate-0"}`}
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
              </button>
              {nestedMenuOpen[index] && subItem.submenu && (
                <div className="bg-gray-100 pl-4 w-full border-l-2 border-primary">
                  {subItem.submenu.map((nestedItem, nestedIndex) => (
                    <Link
                      key={nestedIndex}
                      href={nestedItem.href}
                      className="block py-2 px-4 text-gray-600 hover:bg-primary hover:text-white transition-colors duration-300"
                    >
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

export default MobileHeaderLink;

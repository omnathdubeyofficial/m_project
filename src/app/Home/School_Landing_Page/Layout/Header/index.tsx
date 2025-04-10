"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

// Navigation data with dropdown support
const navData = [
  { name: "Home", href: "/" },
  {
    name: "About Us",
    href: "/about",
    dropdown: [
      { name: "Why Arise", href: "/about/vision" },
      { name: "President", href: "/about/mission" },
      { name: "Secretory", href: "/about/team" },
      { name: "Voice President", href: "/about/vision" },
      { name: "Managing Director", href: "/about/mission" },
      { name: "Director Principal", href: "/about/team" },
      { name: "Our Institution", href: "/about/vision" },
      { name: "Media Coverage", href: "/about/mission" },
      { name: "Arise Team", href: "/about/team" },
    ],
  },
  {
    name: "Academics",
    href: "/academics",
    dropdown: [
      { name: "Curriculum", href: "/academics/curriculum" },
      { name: "Faculty", href: "/academics/faculty" },
      { name: "Achievements", href: "/academics/achievements" },
      { name: "Learning Resources", href: "/academics/achievements" },
      { name: "Infrastructure", href: "/academics/achievements" },
    ],
    
  },
  { name: "Parents Corner", href: "/parents" },
  { name: "Students Corner", href: "/parents" },
  { name: "Infrastructure", href: "/infrastructure" },
  {
    name: "Admissions",
    href: "/admissions",
    dropdown: [
      { name: "Admission Process", href: "/admissions/process" },
      { name: "Fee Structure", href: "/admissions/fees" },
      { name: "Admission Enquiry", href: "/admissions/enquiry" },
      { name: "Apply For Admission", href: "/admissions/enquiry" },
      { name: "Schedule for School Visit", href: "/admissions/enquiry" },
      { name: "School Brochure", href: "/admissions/enquiry" },
    ],
    
  },
  { name: "Career", href: "/career" },
];

const SchoolHeader: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Handle sticky header on scroll
  const handleScroll = () => {
    setIsSticky(window.scrollY >= 50);
  };

  // Close mobile menu or dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      isMenuOpen
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Toggle dropdown for desktop and mobile
  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isSticky ? "shadow-lg" : ""
      }`}
    >
      {/* Top Bar - Hidden on Mobile */}
      <div
        className={`bg-[#8B0000] text-white py-2 transition-all duration-300 hidden md:block ${
          isSticky ? "hidden" : "block"
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <Icon icon="mdi:school" className="text-white" width={16} />
              <span>SchoolShopper</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon icon="mdi:email" className="text-white" width={16} />
              <span>foe.bh@ariseinternational.in</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon icon="mdi:phone" className="text-white" width={16} />
              <span>+91-99665795376</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => router.push("/admissions/enquiry")}
              className="bg-gray-300 text-gray-800 px-3 py-1 rounded-full flex items-center gap-1 hover:bg-gray-400 transition-all duration-300 w-full md:w-auto justify-center text-xs"
              aria-label="Admission Enquiry"
            >
              <Icon icon="mdi:information" width={16} />
              <span className="font-medium">Admission Enquiry</span>
            </button>
            <button
              onClick={() => router.push("/fees/payment")}
              className="bg-[#8B0000] text-white px-3 py-1 rounded-full flex items-center gap-1 hover:bg-[#6B0000] transition-all duration-300 border border-white w-full md:w-auto justify-center text-xs"
              aria-label="Online Fee Payment"
            >
              <Icon icon="mdi:credit-card" width={16} />
              <span className="font-medium">Online Fee Payment</span>
            </button>
            <button
              onClick={() => router.push("/login")}
              className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-1 hover:bg-blue-700 transition-all duration-300 w-full md:w-auto justify-center text-xs"
              aria-label="Edunext ERP Login"
            >
              <Icon icon="mdi:login" width={16} />
              <span className="font-medium">Edunext ERP™ Login</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
  className={`bg-white transition-all duration-300 
    ${isSticky ? "py-2" : "py-2"} 
    max-sm:py-4`}
>

        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo/image.png" // Replace with your school logo path
              alt="Arise International School Logo"
              width={isSticky ? 40 : 50}
              height={isSticky ? 40 : 50}
              className="object-contain transition-all duration-300"
            />
            <div>
              <h1
                className={`font-bold text-[#8B0000] transition-all duration-300 ${
                  isSticky ? "text-lg" : "text-xl"
                }`}
              >
                Arise International School
              </h1>
              <p
                className={`text-[10px] text-gray-600 `}
              >
                CBSE Affiliation No. 1131036
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navData.map((item, index) => (
              <div key={index} className="relative group">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`text-gray-800 hover:text-[#8B0000] font-medium py-1 px-2 text-sm transition-all duration-300 flex items-center gap-1 border-b-2 ${
                        pathname === item.href
                          ? "border-[#8B0000]"
                          : "border-transparent"
                      } focus:outline-none focus:border-[#8B0000]`}
                      aria-expanded={activeDropdown === item.name}
                      aria-haspopup="true"
                    >
                      {item.name}
                      <Icon
                        icon="mdi:chevron-down"
                        width={16}
                        className={`transition-transform duration-300 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
  className={`absolute top-full left-0 bg-white shadow-lg border-b-2 py-1 w-40 transition-all duration-300 transform ${
    activeDropdown === item.name
      ? "opacity-100 scale-y-100"
      : "opacity-0 scale-y-0 pointer-events-none"
  } origin-top z-50 border-b-2 border-[#8B0000]`}
>
  {item.dropdown.map((subItem, subIndex) => (
    <Link
      key={subIndex}
      href={subItem.href}
      className="block px-3 py-2 text-gray-700 hover:bg-[#8B0000] hover:text-white transition-all duration-200 text-sm border-b border-gray-200 last:border-b-0"
    >
      {subItem.name}
    </Link>
  ))}
</div>

                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-gray-800 hover:text-[#8B0000] font-medium py-1 px-2 text-sm transition-all duration-300 border-b-2 ${
                      pathname === item.href
                        ? "border-[#8B0000]"
                        : "border-transparent"
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-1 text-gray-800"
            aria-label="Toggle mobile menu"
          >
            <Icon
              icon={isMenuOpen ? "mdi:close" : "mdi:menu"}
              width={24}
              height={24}
            />
          </button>
        </div>

        {/* Desktop Navigation Bar (Red Border) */}
        <div className="hidden lg:block border-t-[1.5px] border-[#8B0000] mt-1"></div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
  <>
    {/* Overlay */}
    <div className="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden transition-opacity duration-300" />
    
    {/* Mobile Menu */}
    <div
      ref={mobileMenuRef}
      className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-500 lg:hidden z-50 ease-in-out translate-x-0 rounded-l-2xl"
    >
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-white text-white rounded-tl-2xl">
        <img src="/images/logo/image.png" alt="School Logo" className="h-16" />
        <button
          onClick={() => setIsMenuOpen(false)}
          className="text-black hover:text-gray-300 transition"
          aria-label="Close mobile menu"
        >
          <Icon icon="mdi:close" width={24} height={24} />
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex flex-col p-4 gap-2 text-sm">
        {navData.map((item, index) => (
          <div key={index}>
            {item.dropdown ? (
              <>
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className="w-full text-left text-gray-900 hover:text-white font-medium py-3 px-4 flex items-center justify-between border-b border-gray-300 transition-colors duration-300 hover:bg-red-600 rounded-md"
                >
                  {item.name}
                  <Icon
                    icon="mdi:chevron-down"
                    width={18}
                    className={`transition-transform duration-300 ${activeDropdown === item.name ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`flex flex-col pl-4 transition-all duration-500 overflow-hidden ${activeDropdown === item.name ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  {item.dropdown.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="py-2 px-4 text-gray-700 hover:bg-red-600 hover:text-white transition-all duration-300 rounded-md border-b border-gray-300"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-900 hover:text-white font-medium py-3 px-4 border-b border-gray-300 transition-colors duration-300 hover:bg-red-600 rounded-md"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
        
        {/* Mobile Action Buttons */}
        <div className="mt-4 flex flex-col gap-3">
          <button
            onClick={() => {
              router.push("/admissions/enquiry");
              setIsMenuOpen(false);
            }}
            className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-300 transition-all duration-300 justify-center shadow-sm"
            aria-label="Admission Enquiry"
          >
            <Icon icon="mdi:information" width={18} />
            <span className="font-medium">Admission Enquiry</span>
          </button>
          <button
            onClick={() => {
              router.push("/fees/payment");
              setIsMenuOpen(false);
            }}
            className="bg-gradient-to-r from-red-700 to-red-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-red-800 hover:to-red-950 transition-all duration-300 justify-center shadow-md"
            aria-label="Online Fee Payment"
          >
            <Icon icon="mdi:credit-card" width={18} />
            <span className="font-medium">Online Fee Payment</span>
          </button>
          <button
            onClick={() => {
              router.push("/login");
              setIsMenuOpen(false);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all duration-300 justify-center shadow-md"
            aria-label="Edunext ERP Login"
          >
            <Icon icon="mdi:login" width={18} />
            <span className="font-medium">Edunext ERP™ Login</span>
          </button>
        </div>
      </nav>
    </div>
  </>
)
}
    </header>
  );
};

export default SchoolHeader;
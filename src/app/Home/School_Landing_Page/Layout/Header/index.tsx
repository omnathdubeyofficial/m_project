"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { headerData } from "../Header/Navigation/menuData";
import Logo from "./Logo";
import HeaderLink from "../Header/Navigation/HeaderLink";
import MobileHeaderLink from "../Header/Navigation/MobileHeaderLink";
import { Icon } from "@iconify/react/dist/iconify.js";
const Header: React.FC = () => {

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);
  const signInRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setSticky(window.scrollY >= 20);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      signInRef.current &&
      !signInRef.current.contains(event.target as Node)
    ) {
      setIsSignInOpen(false);
    }
    if (
      signUpRef.current &&
      !signUpRef.current.contains(event.target as Node)
    ) {
      setIsSignUpOpen(false);
    }
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node) &&
      navbarOpen
    ) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen, isSignInOpen, isSignUpOpen]);

  useEffect(() => {
    if (isSignInOpen || isSignUpOpen || navbarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isSignInOpen, isSignUpOpen, navbarOpen]);

  return (
    <header
    className={`fixed top-0 z-40 w-full transition-all duration-300 ${sticky ? " shadow-lg bg-white py-4" : "shadow-none py-8"
      }`}
  >
    <div className="lg:py-0 py-2">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md flex items-center justify-between px-4">
        <Logo />
        <nav className="hidden lg:flex flex-grow items-center gap-8 justify-center">
          {headerData.map((item, index) => (
            <HeaderLink key={index} item={item} />
          ))}
        </nav>
        <div className="flex items-center gap-4">
          {/* <Link href="#" className="text-lg font-medium hover:text-primary">
            <Icon
              icon="solar:phone-bold"
              className="text-primary text-3xl inline-block me-2"
            />
            +1(909) 235-9814
          </Link> */}
          <Link
            href="#"
            className="hidden lg:block text-primary bg-primary/15 hover:text-white hover:bg-primary font-medium text-lg py-4 px-8 rounded-full"
            onClick={() => {
              setIsSignInOpen(true);
            }}
          >
            Sign In
          </Link>
          {isSignInOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div
                ref={signInRef}
                className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg px-8 pt-14 pb-8 text-center bg-white bg-opacity-90 backdrop-blur-md"
              >
                <button
                  onClick={() => setIsSignInOpen(false)}
                  className="absolute top-0 right-0 mr-8 mt-8"
                  aria-label="Close Sign In Modal"
                >
                  <Icon
                    icon="tabler:currency-xrp"
                    className="text-black hover:text-primary text-24 inline-block me-2"
                  />
                </button>
                <Signin />
              </div>
            </div>
          )}
          <Link
            href="#"
            className="hidden lg:block bg-primary text-white hover:bg-primary/15 hover:text-primary font-medium text-lg py-4 px-8 rounded-full "
            onClick={() => {
              setIsSignUpOpen(true);
            }}
          >
            Sign Up
          </Link>
          {isSignUpOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div
                ref={signUpRef}
                className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-opacity-90 backdrop-blur-md px-8 pt-14 pb-8 text-center"
              >
                <button
                  onClick={() => setIsSignUpOpen(false)}
                  className="absolute top-0 right-0 mr-8 mt-8"
                  aria-label="Close Sign Up Modal"
                >
                  <Icon
                    icon="tabler:currency-xrp"
                    className="text-black hover:text-primary text-24 inline-block me-2"
                  />
                </button>
                <SignUp />
              </div>
            </div>
          )}
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="block lg:hidden p-2 rounded-lg"
            aria-label="Toggle mobile menu"
          >
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
            <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
          </button>
        </div>
      </div>
      {navbarOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40" />
      )}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 max-w-xs ${navbarOpen ? "translate-x-0" : "translate-x-full"
          } z-50`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-bold text-black">
            <Logo />
          </h2>

          <button
  onClick={() => setNavbarOpen(false)}
  className="w-5 h-5 absolute top-0 right-0 mr-8 mt-8"
  aria-label="Close menu Modal"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full text-black"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
</button>

        </div>
        <nav className="flex flex-col items-start p-4">
          {headerData.map((item, index) => (
            <MobileHeaderLink key={index} item={item} />
          ))}
          <div className="mt-4 flex flex-col space-y-4 w-full">
            <Link
              href="#"
              className="bg-transparent border border-primary text-primary px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white"
              onClick={() => {
                setIsSignInOpen(true);
                setNavbarOpen(false);
              }}
            >
              Sign In
            </Link>
            <Link
              href="#"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => {
                setIsSignUpOpen(true);
                setNavbarOpen(false);
              }}
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </div>
  </header>

  );
};

export default Header;

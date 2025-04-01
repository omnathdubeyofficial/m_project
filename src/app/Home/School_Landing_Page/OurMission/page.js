'use client';

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaTachometerAlt, FaArrowLeft } from 'react-icons/fa';
export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");
  const [circles, setCircles] = useState([]); // Store circle data
  const router = useRouter();  

  const fadeInUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
  const staggerChildren = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.4 } } };
  const glowEffect = { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 1.2 } } };

  // Section Data with Background Colors
  const sections = {
    overview: {
      title: "The Pulse of Clean Energy",
      desc1: "The White House criticized high tariffs imposed by India and other countries, stating they harm American exports. President Trump is set to announce reciprocal tariffs on April 2, aimed at addressing these unfair trade practices and benefiting American workers.",
      desc2: "The White House criticized high tariffs imposed by India and other countries, stating they harm American exports. President Trump is set to announce reciprocal tariffs on April 2, aimed at addressing these unfair trade practices and benefiting American workers.",
      desc3: "The White House criticized high tariffs imposed by India and other countries, stating they harm American exports. President Trump is set to announce reciprocal tariffs on April 2, aimed at addressing these unfair trade practices and benefiting American workers.",
      buttonText: "Dive Into the Future",
      buttonPath: "/overview",
      bgColor: "bg-gradient-to-br from-green-900/80 to-teal-900/80",
    },
    software: {
      title: "The Pulse of Clean Energy",
      desc1: "The White House criticized high tariffs imposed by India and other countries, stating they harm American exports. President Trump is set to announce reciprocal tariffs on April 2, aimed at addressing these unfair trade practices and benefiting American workers.",
      desc2: "The White House criticized high tariffs imposed by India and other countries, stating they harm American exports. President Trump is set to announce reciprocal tariffs on April 2, aimed at addressing these unfair trade practices and benefiting American workers.",
      desc3: "The White House criticized high tariffs imposed by India and other countries, stating they harm American exports. President Trump is set to announce reciprocal tariffs on April 2, aimed at addressing these unfair trade practices and benefiting American workers.",
      buttonText: "Dive Into the Future",
      buttonPath: "/software",
      bgColor: "bg-gradient-to-br from-green-900/80 to-teal-900/80",
    },
    tracking: {
      title: "Mapping Bioenergy’s Rise",
      desc1: "The White House criticized high tariffs imposed by India and other countries, stating they harm American exports. President Trump is set to announce reciprocal tariffs on April 2, aimed at addressing these unfair trade practices and benefiting American workers.",
      desc2: "The White House criticized high tariffs imposed by India and other countries, stating they harm American exports. President Trump is set to announce reciprocal tariffs on April 2, aimed at addressing these unfair trade practices and benefiting American workers.",
      desc3: "The White House criticized high tariffs imposed by India and other countries, stating they harm American exports. President Trump is set to announce reciprocal tariffs on April 2, aimed at addressing these unfair trade practices and benefiting American workers.",
      buttonText: "See the Flow",
      buttonPath: "/tracking",
      bgColor: "bg-gradient-to-br from-blue-900/80 to-indigo-900/80",
    },
    programmes: {
      title: "Bioenergy Ecosystems",
      desc1: "The White House criticized high tariffs imposed by India and other countries, stating they harm American exports. President Trump is set to announce reciprocal tariffs on April 2, aimed at addressing these unfair trade practices and benefiting American workers.",
      desc2: "The White House criticized high tariffs imposed by India and other countries, stating they harm American exports. President Trump is set to announce reciprocal tariffs on April 2, aimed at addressing these unfair trade practices and benefiting American workers.",
      desc3: "The White House criticized high tariffs imposed by India and other countries, stating they harm American exports. President Trump is set to announce reciprocal tariffs on April 2, aimed at addressing these unfair trade practices and benefiting American workers.",
      buttonText: "Shape the Future",
      buttonPath: "/programmes",
      bgColor: "bg-gradient-to-br from-emerald-900/80 to-lime-900/80",
    },
  };
  


  // Generate circles only once on client-side mount
  useEffect(() => {
    const generatedCircles = Array.from({ length: 30 }).map(() => ({
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));
    setCircles(generatedCircles);
  }, []); // Empty dependency array ensures it runs once on mount

  // Animated Circles Component
  const AnimatedCircles = () => {
    const circleVariants = {
      animate: {
        y: [0, -20, 0],
        opacity: [0.2, 0.8, 0.2],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      },
    };

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {circles.map((circle, idx) => (
          <motion.div
            key={idx}
            className="absolute rounded-full bg-gradient-to-r from-green-400/30 to-blue-500/30"
            style={{
              width: circle.width,
              height: circle.height,
              top: circle.top,
              left: circle.left,
            }}
            variants={circleVariants}
            animate="animate"
          />
        ))}
      </div>
    );
  };

  // Content Transition Animation
  const contentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeInOut" } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-green-950 to-blue-950 font-sans antialiased overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[80vh] pt-32 flex items-center justify-center">
        <AnimatedCircles />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50"></div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="container mx-auto px-4 sm:px-6 z-10 text-center text-white"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tight"
          >
            Our <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Mission
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl max-w-xs sm:max-w-md md:max-w-4xl mx-auto"
          >
            Empowering innovation with cutting-edge technology, seamless solutions, and a commitment to excellence and growth.
          </motion.p>


            {/* Buttons for navigation */}
                  <motion.div
                    variants={fadeInUp}
                    className="mt-6 flex justify-center space-x-2 sm:space-x-4"
                  >
          
                              {/* Back Button */}
                    <button
                      onClick={() => router.back()}  // Go back to the previous page
                      className="flex items-center py-2 px-4  text-white rounded-full shadow-md hover:bg-gray-700 transition-all duration-300"
                    >
                      <FaArrowLeft className="mr-2" /> Back
                    </button>
                    {/* Home Button */}
                    <button
                      onClick={() => router.push('/')}  // Navigate to Home
                      className="flex items-center py-2 px-4  text-white rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
                    >
                      <FaHome className="mr-2" /> Home
                    </button>
                    {/* Dashboard Button */}
                    {/* <button
                      onClick={() => router.push('/dashboard')}  // Navigate to Dashboard
                      className="flex items-center py-2 px-4  text-white rounded-full shadow-md hover:bg-green-700 transition-all duration-300"
                    >
                      <FaTachometerAlt className="mr-2" /> Dashboard
                    </button> */}
            
                  </motion.div>
        </motion.div>
      </section>

      {/* Scrollable Holographic Navigation */}
      <nav className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-md overflow-x-auto whitespace-nowrap py-4">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
            className="flex justify-start sm:justify-center gap-8 sm:gap-12"
          >
            {["Overview", "Tracking", "Programmes","software"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item.toLowerCase())}
                className={`relative text-base sm:text-lg font-medium uppercase tracking-wider ${
                  activeSection === item.toLowerCase() ? "text-green-400" : "text-gray-300"
                } hover:text-green-400 transition-all duration-500`}
              >
                <motion.span variants={glowEffect}>{item}</motion.span>
                {activeSection === item.toLowerCase() && (
                  <motion.div
                    className="absolute -bottom-2 left-0 w-full h-1 bg-green-400 rounded-full"
                    layoutId="underline"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </nav>

      <section id="content" className="container mx-auto px-4 sm:px-6 py-16 sm:py-28 relative overflow-hidden">


        <motion.div
          key={activeSection}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`relative flex flex-col md:flex-row items-center gap-10 md:gap-20 z-10 p-8 sm:p-12   backdrop-blur-xl border border-white/20 ${sections[activeSection].bgColor}`}
        >
          <div className="md:w-1/2 text-lg sm:text-xl text-gray-300">
          <motion.h2
            variants={fadeInUp}
            className="mb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight"
          >
            {sections[activeSection].title.split(" ").map((word, idx) =>
              ["Clean", "Rise", "Ecosystems"].includes(word) ? (
                <span key={idx} className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  {word} {" "}
                </span>
              ) : (
                `${word} `
              )
            )}           

          </motion.h2>
          <p className="mt-10">{sections[activeSection].desc1}</p>

          </div>

          <motion.div variants={fadeInUp} className="md:w-1/2 text-lg sm:text-xl text-gray-300">
            {/* <p>{sections[activeSection].desc1}</p> */}
            <p className="mt-5">{sections[activeSection].desc2}</p>
            <p className="mt-5">{sections[activeSection].desc3}</p>
            <Link href={sections[activeSection].buttonPath} passHref>
  <motion.div
    whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(34, 197, 94, 0.7)" }}
    // whileTap={{ scale: 0.95 }}
    className="inline-flex items-center justify-center mt-8 px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-full shadow-lg hover:from-green-700 hover:to-blue-700 transition-all duration-500 text-lg sm:text-xl font-semibold w-fit"
  >
    {sections[activeSection].buttonText}
  </motion.div>
</Link>

          </motion.div>
        </motion.div>

    </section>
    </div>
  );
}
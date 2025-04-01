'use client';

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [circles, setCircles] = useState([]); // Store circle data

  const fadeInUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
  const staggerChildren = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.4 } } };
  const glowEffect = { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 1.2 } } };

  // Section Data with Background Colors
  const sections = {
    overview: {
      title: "The Pulse of Clean Energy",
      desc1: "Bioenergy harnesses nature’s cycle, capturing carbon in real-time.",
      desc2: "A renewable force surpassing all, lighting the path ahead.",
      buttonText: "Dive Into the Future",
      bgColor: "bg-gradient-to-br from-green-900/80 to-teal-900/80",
    },
    tracking: {
      title: "Mapping Bioenergy’s Rise",
      desc1: "Real-time insights into global bioenergy adoption.",
      desc2: "Visualizing the shift to a sustainable world.",
      buttonText: "See the Flow",
      bgColor: "bg-gradient-to-br from-blue-900/80 to-indigo-900/80",
    },
    programmes: {
      title: "Bioenergy Ecosystems",
      desc1: "Pioneering initiatives for a thriving planet.",
      desc2: "Uniting innovators for a renewable tomorrow.",
      buttonText: "Shape the Future",
      bgColor: "bg-gradient-to-br from-emerald-900/80 to-lime-900/80",
    },
  };

  // Cards Data
  const cards = [
    {
      title: "Living Biomass",
      desc: "Organic energy from earth’s core materials.",
      img: "/img/biomass-orbit.png",
      glowColor: "rgba(34, 197, 94, 0.5)",
    },
    {
      title: "Emission Shift",
      desc: "Redefining energy with zero-waste cycles.",
      img: "/img/energy-wave.png",
      glowColor: "rgba(59, 130, 246, 0.5)",
    },
    {
      title: "Next Horizon",
      desc: "Innovations fueling bioenergy’s frontier.",
      img: "/img/future-sphere.png",
      glowColor: "rgba(234, 179, 8, 0.5)",
    },
  ];

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
      <section className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center justify-center">
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
            Igniting the{" "}
            <span className="block bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Bioenergy Cosmos
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl max-w-xs sm:max-w-md md:max-w-2xl mx-auto"
          >
            A renewable universe awaits—sustainable, boundless, alive.
          </motion.p>
        </motion.div>
      </section>

      {/* Responsive Holographic Navigation */}
      <nav className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              className="sm:hidden text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>

            {/* Navigation Links */}
            <motion.div
              className={`${
                isMenuOpen ? "flex" : "hidden"
              } sm:flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 absolute sm:static top-16 left-0 right-0 bg-gray-900/95 sm:bg-transparent p-4 sm:p-0`}
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
            >
              {["Overview", "Tracking", "Programmes"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setActiveSection(item.toLowerCase());
                    setIsMenuOpen(false);
                  }}
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
        </div>
      </nav>

      {/* Dynamic Content Section */}
      <section id="content" className="container mx-auto px-4 sm:px-6 py-12 sm:py-24 relative">
        <AnimatedCircles />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 z-10 p-6 sm:p-8 rounded-2xl backdrop-blur-md ${sections[activeSection].bgColor}`}
          >
            <motion.h2
              variants={fadeInUp}
              className="md:w-1/2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white"
            >
              {sections[activeSection].title.split(" ").map((word, idx) =>
                word === "Clean" || word === "Rise" || word === "Ecosystems" ? (
                  <span
                    key={idx}
                    className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
                  >
                    {word}{" "}
                  </span>
                ) : (
                  `${word} `
                )
              )}
            </motion.h2>
            <motion.div variants={fadeInUp} className="md:w-1/2 text-base sm:text-lg text-gray-200">
              <p>{sections[activeSection].desc1}</p>
              <p className="mt-4">{sections[activeSection].desc2}</p>
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(34, 197, 94, 0.7)" }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-full shadow-lg hover:from-green-700 hover:to-blue-700 transition-all duration-500 text-sm sm:text-base"
              >
                {sections[activeSection].buttonText}
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Cards Section */}
      <section id="cards" className="container mx-auto px-4 sm:px-6 py-12 sm:py-24 relative">
        <AnimatedCircles />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-12"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={glowEffect}
              whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${card.glowColor}` }}
              className="relative bg-gray-800/50 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/50"
            >
              <Image
                src={card.img}
                alt={card.title}
                width={600}
                height={400}
                className="w-full h-48 sm:h-64 object-cover opacity-80"
              />
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-2xl font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm sm:text-base text-gray-300">{card.desc}</p>
              </div>
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: [0, 0.2, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ background: `radial-gradient(circle, ${card.glowColor}, transparent)` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
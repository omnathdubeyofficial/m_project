'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaBook, FaChalkboardTeacher, FaLightbulb } from 'react-icons/fa';

export default function OurMission() {
  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-700 to-gray-800 text-white px-6 py-44 flex flex-col space-y-20">
      {/* Section 1: Left Content, Right Image */}
      <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto space-y-10 md:space-y-0 md:space-x-10">
        {/* Left Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="md:w-1/2 text-left"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-teal-500">
            Our School’s Mission
          </h1>
          <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
            To nurture young minds, foster excellence, and prepare students for a world of opportunities with a blend of innovation and tradition.
          </p>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="md:w-1/2"
        >
          <Image
            src="/img/q.png" // Replace with your image
            alt="Our School in Action"
            width={500}
            height={300}
            className="rounded-xl shadow-2xl border-2 border-orange-400"
          />
        </motion.div>
      </div>

      {/* Section 2: Left Content, Right Cards */}
      <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto space-y-10 md:space-y-0 md:space-x-10">
        {/* Left Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="md:w-1/2 text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal-300">
            Our Core Pillars
          </h2>
          <p className="text-lg text-gray-200 leading-relaxed">
            We believe in a holistic approach to education, empowering students through inspiration, growth, and creativity.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="mt-6 px-8 py-3 text-lg bg-gradient-to-r from-teal-500 to-orange-400 text-white font-bold rounded-full shadow-xl hover:shadow-teal-500/50 transition-all"
          >
            Discover More
          </motion.button>
        </motion.div>

        {/* Right Cards */}
        <div className="md:w-1/2 grid grid-cols-1 gap-6">
          {[
            {
              title: "Inspire Learning",
              desc: "Encouraging a lifelong love for knowledge.",
              icon: <FaBook className="text-orange-400 text-4xl" />,
            },
            {
              title: "Empower Growth",
              desc: "Supporting every student to shine brightly.",
              icon: <FaChalkboardTeacher className="text-teal-400 text-4xl" />,
            },
            {
              title: "Ignite Ideas",
              desc: "Cultivating creativity and critical thinking.",
              icon: <FaLightbulb className="text-yellow-400 text-4xl" />,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-gray-700 p-5 rounded-xl shadow-lg flex items-start space-x-4 border border-gray-600 hover:border-teal-500 transition-all"
            >
              <div>{item.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-200 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
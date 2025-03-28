"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaBookReader,
  FaChalkboardTeacher,
  FaSchool,
  FaMedal,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";

export default function SectionBoard() {
  const sections = [
    { name: "Admissions", path: "/sections/admissions", icon: <FaUserGraduate /> },
    { name: "Academics", path: "/sections/academics", icon: <FaBookReader /> },
    { name: "Examinations", path: "/sections/examinations", icon: <FaChalkboardTeacher /> },
    { name: "Library", path: "/sections/library", icon: <FaBookReader /> },
    { name: "Faculty", path: "/sections/faculty", icon: <FaChalkboardTeacher /> },
    { name: "School Facilities", path: "/sections/facilities", icon: <FaSchool /> },
    { name: "Results", path: "/sections/results", icon: <FaClipboardList /> },
    { name: "Toppers List", path: "/sections/toppers", icon: <FaMedal /> },
    { name: "Student Activities", path: "/sections/activities", icon: <FaUsers /> },
  ];

  return (
    <div className="w-full h-auto bg-gradient-to-b from-[#EAF2F8] via-[#D4E6F1] to-[#A9CCE3] text-gray-900 flex flex-col items-center p-8 gap-10">
      <div className="max-w-7xl w-full flex flex-col items-center">
        <h2 className="text-4xl font-semibold text-center text-white bg-[#154360] w-full p-6">🏫 Section Board</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4 w-full bg-white shadow-2xl border-t-4 border-[#3498DB] ">
          {sections.map((section, index) => (
            <Link key={index} href={section.path} className="group">
              <motion.div
                className="bg-gray-50  p-6 text-center shadow-md border border-gray-300 transition-all flex flex-col items-center hover:bg-[#D6EAF8]"
              >
                <div className="text-[#3498DB] text-6xl mb-4">{section.icon}</div>
                <p className="font-semibold text-lg text-gray-800 mb-3">{section.name}</p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="mt-3 bg-[#3498DB] hover:bg-[#21618C] text-white text-sm py-2 px-5 rounded-lg transition-all font-medium"
                >
                  Explore
                </motion.button>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
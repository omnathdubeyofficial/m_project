"use client";
import Link from 'next/link';
import { FaChalkboard, FaMoneyBillWave, FaFileAlt, FaBookReader, FaUserShield, FaChartLine, FaLaptopCode, FaMobileAlt } from "react-icons/fa";

const DigitalServices = [
    {
        icon: <FaChalkboard className="text-purple-400 w-14 h-14 drop-shadow-lg" />, 
        heading: "Online Admission",
        subheading: "Simplify the admission process with an online application and tracking system."
    },
    {
        icon: <FaMoneyBillWave className="text-purple-400 w-14 h-14 drop-shadow-lg" />, 
        heading: "Online Fee Payment",
        subheading: "Securely pay fees online with multiple payment options and automated invoices."
    },
    {
        icon: <FaFileAlt className="text-purple-400 w-14 h-14 drop-shadow-lg" />, 
        heading: "Student Progress Report",
        subheading: "Get real-time academic progress and performance insights."
    },
    {
        icon: <FaBookReader className="text-purple-400 w-14 h-14 drop-shadow-lg" />, 
        heading: "E-Learning Support",
        subheading: "Access digital study materials, online tests, and interactive learning modules."
    },
    {
        icon: <FaUserShield className="text-purple-400 w-14 h-14 drop-shadow-lg" />, 
        heading: "Student Safety Monitoring",
        subheading: "Monitor student safety with attendance tracking and emergency alerts."
    },
    {
        icon: <FaChartLine className="text-purple-400 w-14 h-14 drop-shadow-lg" />, 
        heading: "Performance Analytics",
        subheading: "AI-driven insights to help students and teachers track academic growth."
    },
    {
        icon: <FaLaptopCode className="text-purple-400 w-14 h-14 drop-shadow-lg" />, 
        heading: "Digital Assignments & Exams",
        subheading: "Conduct online exams, assignments, and evaluations seamlessly."
    },
    {
        icon: <FaMobileAlt className="text-purple-400 w-14 h-14 drop-shadow-lg" />, 
        heading: "Parent & Student Login",
        subheading: "Stay connected with real-time updates on attendance, fees, and academics."
    }
];

const VaekonSchoolServices = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
            <div className="container mx-auto max-w-7xl px-6 text-left relative z-10">
                <p className="text-purple-400 text-lg font-semibold uppercase tracking-wide drop-shadow">Why Choose Vaekon School?</p>
                <h2 className="text-4xl lg:text-5xl font-bold mt-3 drop-shadow-lg text-white leading-tight">Advanced Digital Services for Modern Education</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {DigitalServices.map((item, i) => (
                        <div 
                            key={i} 
                            className="relative p-8 bg-gray-900 bg-opacity-70 backdrop-blur-lg shadow-xl flex items-center rounded-xl transition-transform border border-gray-700 hover:border-purple-400 overflow-hidden hover:scale-105 hover:shadow-2xl"
                        >
                            <div className="mr-4 flex-shrink-0">{item.icon}</div>
                            <div>
                                <h3 className="text-2xl text-purple-400 font-semibold">{item.heading}</h3>
                                <p className="text-lg font-light text-gray-300 mt-3">{item.subheading}</p>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-900 opacity-10 rounded-xl"></div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-16">
                    <Link href="/contact">
                        <button 
                            className="px-8 py-3 text-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 transition-all rounded-full shadow-lg hover:scale-105 hover:shadow-2xl"
                        >
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-800/10 to-transparent"></div>
        </section>
    );
}

export default VaekonSchoolServices;
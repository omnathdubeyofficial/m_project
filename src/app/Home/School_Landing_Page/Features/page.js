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
        <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="container mx-auto max-w-7xl px-6 text-left">
                <p className="text-purple-400 text-lg font-semibold uppercase tracking-wide drop-shadow">Why Choose Vaekon School?</p>
                <h2 className="text-4xl lg:text-5xl font-semibold mt-3 drop-shadow-lg">Advanced Digital Services for Modern Education</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-12">
                    {DigitalServices.map((item, i) => (
                        <div 
                            key={i} 
                            className="relative p-8 bg-gray-900 rounded-xl shadow-lg flex items-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl border border-gray-700 hover:border-purple-400"
                        >
                            <div className="mr-4">{item.icon}</div>
                            <div>
                                <h3 className="text-2xl text-purple-400 font-semibold">{item.heading}</h3>
                                <p className="text-lg font-normal text-gray-300 mt-3">{item.subheading}</p>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-900 opacity-10 rounded-xl"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default VaekonSchoolServices;

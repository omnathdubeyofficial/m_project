"use client";
import Link from 'next/link';
import { FaChalkboard, FaMoneyBillWave, FaFileAlt, FaBookReader, FaUserShield, FaChartLine, FaLaptopCode, FaMobileAlt } from "react-icons/fa";

const DigitalServices = [
    {
        icon: <FaChalkboard className="text-[#62006dbb] w-14 h-14" />, 
        heading: "Online Admission",
        subheading: "Simplify the admission process with an online application and tracking system."
    },
    {
        icon: <FaMoneyBillWave className="text-[#62006dbb] w-14 h-14" />, 
        heading: "Online Fee Payment",
        subheading: "Securely pay fees online with multiple payment options and automated invoices."
    },
    {
        icon: <FaFileAlt className="text-[#62006dbb] w-14 h-14" />, 
        heading: "Student Progress Report",
        subheading: "Get real-time academic progress and performance insights."
    },
    {
        icon: <FaBookReader className="text-[#62006dbb] w-14 h-14" />, 
        heading: "E-Learning Support",
        subheading: "Access digital study materials, online tests, and interactive learning modules."
    },
    {
        icon: <FaUserShield className="text-[#62006dbb] w-14 h-14" />, 
        heading: "Student Safety Monitoring",
        subheading: "Monitor student safety with attendance tracking and emergency alerts."
    },
    {
        icon: <FaChartLine className="text-[#62006dbb] w-14 h-14" />, 
        heading: "Performance Analytics",
        subheading: "AI-driven insights to help students and teachers track academic growth."
    },
    {
        icon: <FaLaptopCode className="text-[#62006dbb] w-14 h-14" />, 
        heading: "Digital Assignments & Exams",
        subheading: "Conduct online exams, assignments, and evaluations seamlessly."
    },
    {
        icon: <FaMobileAlt className="text-[#62006dbb] w-14 h-14" />, 
        heading: "Parent & Student login",
        subheading: "Stay connected with real-time updates on attendance, fees, and academics."
    }
];

const VaekonSchoolServices = () => {
    return (
        <section className="py-20 bg-gradient-to-r from-[#62006dbb] to-[#62006dbb]">
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md" id="digital-services-section">
                <div className="text-center mb-14">
                    <p className="text-white text-lg font-normal mb-3 tracking-widest uppercase">Why Choose Vaekon School?</p>
                    <h2 className="text-3xl lg:text-5xl font-semibold text-white mx-auto">Advanced Digital Services for Modern Education</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
                    {DigitalServices.map((item, i) => (
                        <div key={i} className="p-8 bg-white shadow-lg text-center flex flex-col items-center ">
                            <div className="mb-6">{item.icon}</div>
                            <h3 className="text-2xl text-[#62006dbb] font-semibold">{item.heading}</h3>
                            <p className="text-lg font-normal text-black/60 mt-2">{item.subheading}</p>
                            {/* <Link href="/" className="text-lg font-medium text-[#62006dbb] mt-4 flex items-center gap-2 hover:underline">
                                Learn More
                            </Link> */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default VaekonSchoolServices;
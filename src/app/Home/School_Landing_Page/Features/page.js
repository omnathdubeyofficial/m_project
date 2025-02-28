"use client";
import Link from 'next/link';
import { FaChevronRight, FaUserGraduate, FaChalkboardTeacher, FaClipboardList, FaMoneyCheckAlt } from "react-icons/fa";

const FeaturesData = [
    {
        icon: <FaUserGraduate className="text-primary w-14 h-14" />,
        heading: "Student Management",
        subheading: "Easily manage student records, admissions, and profiles in one place.",
    },
    {
        icon: <FaChalkboardTeacher className="text-primary w-14 h-14" />,
        heading: "Teacher & Staff Management",
        subheading: "Track teacher schedules, payroll, and performance efficiently.",
    },
    {
        icon: <FaClipboardList className="text-primary w-14 h-14" />,
        heading: "Attendance Tracking",
        subheading: "Automate attendance for students and staff with real-time reports.",
    },
    {
        icon: <FaMoneyCheckAlt className="text-primary w-14 h-14" />,
        heading: "Fee Management",
        subheading: "Manage student fees, invoices, and payments securely and seamlessly.",
    }
];

const Features = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md" id="features-section">
                <div className="text-center mb-14">
                    <p className="text-primary text-lg font-normal mb-3 tracking-widest uppercase">Features</p>
                    <h2 className="text-3xl lg:text-5xl font-semibold text-black mx-auto">Powerful Features for Smarter School Management</h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-10">
                    {FeaturesData.map((item, i) => (
                        <div key={i} className="p-8  bg-white shadow-lg text-center flex flex-col items-center">
                            <div className="mb-6">{item.icon}</div>
                            <h3 className="text-2xl text-black font-semibold">{item.heading}</h3>
                            <p className="text-lg font-normal text-black/60 mt-2">{item.subheading}</p>
                            <Link href="/" className="text-lg font-medium text-primary mt-4 flex items-center gap-2 hover:underline">
                                Learn More <FaChevronRight />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;

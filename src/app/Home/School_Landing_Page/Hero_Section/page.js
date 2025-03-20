"use client";
import Image from 'next/image';
import Link from 'next/link';
import { PlayCircle } from "lucide-react";

const Hero = () => {
    return (
        <section id="home-section" className="bg-gray-50 py-44">
            <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-screen-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-black">
                            Admissions Open for 2024-25 🎓
                        </h1>
                        <p className="text-black/60 text-lg md:text-xl leading-relaxed mb-8">
                            Enroll your child in a top-tier learning environment. Our advanced curriculum, expert faculty, and holistic development approach ensure a bright future. Apply now and secure admission for the upcoming session!
                        </p>
                        {/* CTA Buttons */}
                        <div className="flex flex-col md:flex-row items-center md:justify-center lg:justify-start gap-4">
                            <Link href="/Home/School_Landing_Page/ProfessionalCourses" className="text-lg font-medium rounded-full text-white py-4 px-8 bg-primary hover:bg-primary-dark border border-primary transition">
                                Apply for Admission
                            </Link>
                            <Link href="#about-section" className="flex items-center gap-2 text-lg font-medium py-4 px-8 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition">
                                <PlayCircle className="w-6 h-6" />
                                Explore now
                            </Link>
                        </div>
                    </div>
                    
                    {/* Right Content */}
                    <div className="relative flex justify-center">
                        {/* Floating Info Box */}
                        {/* <div className="absolute bottom-5 left-5 md:left-10 bg-white shadow-md p-3 md:p-4 rounded-xl flex items-center gap-4">
                            <Image src="/images/hero/pizza.svg" alt="icon" width={50} height={50} />
                            <p className="text-sm md:text-base font-medium">
                                More than 500+ <br className="hidden md:block" /> successful admissions.
                            </p>
                        </div> */}
                        {/* Hero Image (No Change) */}
                        <Image src="/img/hero.png" alt="Hero Image" width={600} height={500} className="w-full h-auto max-w-sm md:max-w-md lg:max-w-lg" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

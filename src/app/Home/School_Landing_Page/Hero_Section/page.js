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
                            Custom School Management Solutions 🚀
                        </h1>
                        <p className="text-black/60 text-lg md:text-xl leading-relaxed mb-8">
                            Empower your institution with a fully customized school management system. Automate attendance, streamline fee collection, enhance communication, and manage academics—all in one tailor-made solution. Built to fit your school's unique needs!
                        </p>
                        {/* CTA Buttons */}
                        <div className="flex flex-col md:flex-row items-center md:justify-center lg:justify-start gap-4">
                            <Link href="/login" className="text-lg font-medium rounded-full text-white py-4 px-8 bg-primary hover:bg-primary-dark border border-primary transition">
                                Go To Dashboard
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
                        <div className="absolute bottom-5 left-5 md:left-10 bg-white shadow-md p-3 md:p-4 rounded-xl flex items-center gap-4">
                            <Image src="/images/hero/pizza.svg" alt="icon" width={50} height={50} />
                            <p className="text-sm md:text-base font-medium">
                                More than 500+ <br className="hidden md:block" /> recipes.
                            </p>
                        </div>
                        {/* Hero Image */}
                        <Image src="/images/hero/banner-image.png" alt="Hero Image" width={600} height={500} className="w-full h-auto max-w-sm md:max-w-md lg:max-w-lg" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

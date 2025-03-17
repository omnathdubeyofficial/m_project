"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
    {
      color: "bg-[#ECF5FC]", // Extra Light Navy Blue
      image: "/img/crsc.png",
      title: "Smart School Management",
      description: "Efficiently manage your school's academics, attendance, and more.",
      buttonText: "Learn More",
      buttonLink: "/about"
    },
    {
      color: "bg-[#F4FCE8]", // Extra Light Green
      image: "/img/girl.png",
      title: "Empower Students with Technology",
      description: "Bring digital transformation to your classrooms for better learning.",
      buttonText: "Get Started",
      buttonLink: "/services"
    },
    {
      color: "bg-[#FAF0FA]", // Extra Light Purple
      image: "/img/boy.png",
      title: "Seamless Administration",
      description: "Streamline administration tasks with our AI-powered solutions.",
      buttonText: "Explore Now",
      buttonLink: "/contact"
    }
  ];
  
  

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section id="carousel-section" className="w-full h-screen relative overflow-hidden flex items-center justify-center">
      {/* Full-Screen Background */}
      <div className={`absolute inset-0 ${slides[currentIndex].color} transition-all duration-[1500ms] ease-in-out`}></div>
      
      {/* Content Wrapper */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 max-w-screen-xl h-full flex flex-col lg:flex-row items-center justify-center gap-10">
        {/* Left Content */}
        <div className="text-center lg:text-left w-full max-w-2xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-5 leading-tight text-gray-700">
            {slides[currentIndex].title}
          </h2>
          <p className="text-lg md:text-xl mb-10 leading-relaxed text-gray-500">
            {slides[currentIndex].description}
          </p>
          <Link href={slides[currentIndex].buttonLink} className="px-8 py-4 bg-gray-700 text-white text-lg md:text-xl rounded-full hover:opacity-80 transition duration-500">
            {slides[currentIndex].buttonText}
          </Link>
        </div>

        {/* Right Side Image */}
        <div className="relative w-full max-w-lg h-[300px] md:h-[400px] lg:h-[500px] flex justify-center">
        <Image
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            width={500}
            height={500}
            objectFit="cover"
            className="transition-all duration-[1500ms] ease-in-out scale-110 opacity-90"
          />
        </div>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
  {slides.map((_, index) => (
    <div 
      key={index}
      onClick={() => goToSlide(index)}
      className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-500 border ${
        index === currentIndex 
          ? "bg-[#0A1F44] border-[#0A1F44]"  // Active Slide (Custom Dark Navy Blue)
          : "bg-[#1E3A8A] border-[#1E3A8A]"  // Inactive Slide (Custom Light Navy Blue)
      }`}
    ></div>
  ))}
</div>




    </section>
  );
};

export default Carousel;
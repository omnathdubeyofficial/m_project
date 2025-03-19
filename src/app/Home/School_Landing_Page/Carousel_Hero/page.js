"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    video: "/videos/21472-318172509_small.mp4",
    title: "Smart School Management",
    description: "Efficiently manage your school's academics, attendance, and more.",
    buttonText: "Learn More",
    buttonLink: "/about"
  },
  {
    video: "/videos/41603-430090405_medium.mp4",
    title: "Empower Students with Technology",
    description: "Bring digital transformation to your classrooms for better learning.",
    buttonText: "Get Started",
    buttonLink: "/services"
  },
  {
    video: "/videos/69622-531621070_medium.mp4",
    title: "Seamless Administration",
    description: "Streamline administration tasks with our AI-powered solutions.",
    buttonText: "Explore Now",
    buttonLink: "/contact"
  }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
      setIsAnimating(false);
    }, 600);
  };

  const goToSlide = (index) => {
    if (index !== currentIndex) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, 600);
    }
  };

  return (
    <section id="carousel-section" className="w-full h-screen  relative overflow-hidden flex items-center justify-center">
      {/* Full-Screen Background Video */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        <video 
          key={currentIndex} // Important: This forces reloading the video on index change
          className={`w-full h-full object-cover transition-transform duration-1000 ${isAnimating ? "scale-105 opacity-75" : "scale-100 opacity-100"}`} 
          autoPlay 
          loop 
          muted
        >
          <source src={slides[currentIndex].video} type="video/mp4" />
        </video>
      </div>
      
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-65"></div>
      
      {/* Content Wrapper */}
      <div className={`relative z-10 container mx-auto px-6 md:px-12 lg:px-16 max-w-screen-xl h-full flex flex-col items-start justify-center text-left transition-all duration-1000 ease-in-out transform ${isAnimating ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"}`}>
        <h2 className={`text-4xl md:text-5xl lg:text-7xl font-semibold mb-5 leading-tight text-white transition-all duration-1000 ease-in-out ${isAnimating ? "opacity-0 translate-y-5" : "opacity-100 translate-y-0"}`}>{slides[currentIndex].title}</h2>
        <p className={`text-lg md:text-xl mb-6 leading-relaxed text-white transition-all duration-1000 ease-in-out ${isAnimating ? "opacity-0 translate-y-5" : "opacity-100 translate-y-0"}`}>{slides[currentIndex].description}</p>
        <Link href={slides[currentIndex].buttonLink} className="px-8 py-4 bg-gray-700 text-white text-lg md:text-xl rounded-full hover:opacity-80 transition-all duration-500 ease-in-out transform hover:scale-105">
          {slides[currentIndex].buttonText}
        </Link>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <div 
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-6 h-6 rounded-full cursor-pointer transition-all duration-500 border-2 border-yellow-400 ${
              index === currentIndex 
                ? "bg-[#0A1F44] scale-150 shadow-lg"
                : "bg-white opacity-70 hover:opacity-100"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Carousel;

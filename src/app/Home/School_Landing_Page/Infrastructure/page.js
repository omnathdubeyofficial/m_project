"use client";

import Image from 'next/image';
import { useEffect, useState } from "react";

const heroContent = [
  { image: "/img/ai-generated-8706224_1280.png", title: "World-Class Infrastructure", description: "Discover state-of-the-art facilities designed to inspire learning and growth." },
  { image: "/img/classroom-5405427_1280.png", title: "Modern Learning Spaces", description: "Our classrooms and labs foster creativity and innovation." },
  { image: "/img/books-436512_1920.jpg", title: "Sports Excellence", description: "Top-tier sports facilities to nurture athletic talent." },
];

export default function Infrastructure() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroContent.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {heroContent.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image src={item.image} layout="fill" objectFit="cover" alt="Infrastructure Hero Image" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-16 text-white max-w-7xl w-full px-6 text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{item.title}</h1>
              <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">{item.description}</p>
            </div>
          </div>
        ))}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
          {heroContent.map((_, index) => (
            <span
              key={index}
              className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentIndex ? "bg-[#FF6F61] scale-125" : "bg-white opacity-70"
              }`}
              onClick={() => handleIndicatorClick(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* Smart Classrooms Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <Image
                alt="Smart Classrooms"
                src="/img/books-436512_1920.jpg"
                width={700}
                height={400}
                className="rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-[#FF6F61] opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300" />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-semibold text-[#FF6F61]">Smart Classrooms</h2>
              <p className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">Interactive Learning Environments</p>
              <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                Our smart classrooms are equipped with interactive whiteboards, projectors, and high-speed internet, creating dynamic and engaging learning experiences for students.
              </p>
              <div className="mt-6">
                <button className="bg-[#FF6F61] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#E55A50] transition-colors duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Science & Computer Labs Section */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left order-last lg:order-first">
              <h2 className="text-lg font-semibold text-[#FF6F61]">Advanced Laboratories</h2>
              <p className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">Cutting-Edge Science & Tech Labs</p>
              <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                Our fully equipped science and computer labs provide hands-on learning opportunities, fostering innovation and practical skills in STEM disciplines.
              </p>
              <div className="mt-6">
                <button className="bg-[#FF6F61] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#E55A50] transition-colors duration-300">
                  Explore Labs
                </button>
              </div>
            </div>
            <div className="relative group">
              <Image
                alt="Science & Computer Labs"
                src="/img/classroom-5405427_1280.png"
                width={700}
                height={400}
                className="rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-[#FF6F61] opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Sports Facilities Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <Image
                alt="Sports Facilities"
                src="/img/ai-generated-8706224_1280.png"
                width={700}
                height={400}
                className="rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-[#FF6F61] opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300" />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-semibold text-[#FF6F61]">Sports Facilities</h2>
              <p className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">World-Class Athletic Amenities</p>
              <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                From sprawling fields to indoor courts, our sports facilities include a swimming pool, gymnasium, and tracks, encouraging physical fitness and teamwork.
              </p>
              <div className="mt-6">
                <button className="bg-[#FF6F61] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#E55A50] transition-colors duration-300">
                  View Facilities
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Library Section */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left order-last lg:order-first">
              <h2 className="text-lg font-semibold text-[#FF6F61]">Modern Library</h2>
              <p className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">A Sanctuary for Knowledge</p>
              <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                Our expansive library houses thousands of books, digital resources, and quiet study areas, creating an ideal environment for research and learning.
              </p>
              <div className="mt-6">
                <button className="bg-[#FF6F61] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#E55A50] transition-colors duration-300">
                  Explore Library
                </button>
              </div>
            </div>
            <div className="relative group">
              <Image
                alt="Library"
                src="/img/books-436512_1920.jpg"
                width={700}
                height={400}
                className="rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-[#FF6F61] opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-[#FF6F61] py-20 text-center text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Experience Our Campus</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Visit our state-of-the-art facilities and see how we create an inspiring environment for learning and growth.
          </p>
          <div className="mt-8">
            <button className="bg-white text-[#FF6F61] px-8 py-4 rounded-full font-semibold shadow-md hover:bg-gray-100 transition-colors duration-300">
              Schedule a Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
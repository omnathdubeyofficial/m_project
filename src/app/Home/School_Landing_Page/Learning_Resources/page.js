"use client";

import Image from 'next/image';
import { useEffect, useState } from "react";

const heroContent = [
  { image: "/img/library1.jpg", title: "Empowering Education", description: "Access a wide range of learning resources to support academic excellence and personal growth." },
  { image: "/img/study2.jpg", title: "Digital Learning Hub", description: "Explore our digital library and interactive tools designed to enhance learning experiences." },
  { image: "/img/tools3.jpg", title: "Resources for All", description: "From study materials to teacher guides, we provide resources for students and educators alike." },
  { image: "/img/classroom4.jpg", title: "Learn Anytime, Anywhere", description: "Our resources are accessible online, making learning flexible and convenient." },
];

export default function LearningResources() {
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
    <div>
      {/* Hero Section */}
      <div className="relative mt-24 w-full h-[500px] overflow-hidden">
        {heroContent.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image src={item.image} layout="fill" objectFit="cover" alt="Learning Resources Hero Image" />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 text-white max-w-7xl w-full px-10">
              <h1 className="text-4xl lg:text-6xl font-bold">{item.title}</h1>
              <p className="mt-4 text-lg lg:text-xl">{item.description}</p>
            </div>
          </div>
        ))}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
          {heroContent.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => handleIndicatorClick(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* Digital Library Section */}
      <div className="bg-[#F3E5F5] py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <Image
                alt="Digital Library"
                src="/img/digital-library.jpg"
                width={800}
                height={500}
                className="rounded-3xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#8E24AA] to-transparent opacity-20 rounded-3xl" />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-semibold text-[#8E24AA]">Digital Library</h2>
              <p className="mt-4 text-4xl font-semibold text-[#3B3B3B] sm:text-5xl">Access a Wealth of Knowledge</p>
              <p className="mt-6 text-lg font-semibold text-gray-700">
                Our digital library offers thousands of e-books, journals, and research papers accessible to students and teachers, fostering a culture of continuous learning.
              </p>
              <div className="mt-5">
                <button className="bg-[#8E24AA] text-white px-6 py-3 shadow-md hover:bg-[#6E1B85]">
                  Explore Library
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Study Materials Section */}
      <div className="bg-[#E3F2FD] py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <h2 className="text-lg font-semibold text-[#8E24AA]">Study Materials</h2>
              <p className="mt-4 text-4xl font-semibold text-[#3B3B3B] sm:text-5xl">Comprehensive Learning Resources</p>
              <p className="mt-6 text-lg font-semibold text-gray-700">
                Download curated study guides, worksheets, and revision notes tailored to the curriculum, designed to help students excel in their studies.
              </p>
              <div className="mt-5">
                <button className="bg-[#8E24AA] text-white px-6 py-3 shadow-md hover:bg-[#6E1B85]">
                  Access Study Materials
                </button>
              </div>
            </div>
            <div className="relative">
              <Image
                alt="Study Materials"
                src="/img/study-materials.jpg"
                width={800}
                height={500}
                className="rounded-3xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#8E24AA] to-transparent opacity-20 rounded-3xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tools Section */}
      <div className="bg-[#D1C4E9] py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <Image
                alt="Interactive Tools"
                src="/img/interactive-tools.jpg"
                width={800}
                height={500}
                className="rounded-3xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#8E24AA] to-transparent opacity-20 rounded-3xl" />
            </div>
            <div className="text-left">
              <h2 className="text-lg font-semibold text-[#8E24AA]">Interactive Tools</h2>
              <p className="mt-4 text-4xl font-semibold text-[#3B3B3B] sm:text-5xl">Engage with Dynamic Learning</p>
              <p className="mt-6 text-lg font-semibold text-gray-700">
                Utilize interactive simulations, quizzes, and educational apps to make learning fun and effective for students of all ages.
              </p>
              <div className="mt-5">
                <button className="bg-[#8E24AA] text-white px-6 py-3 shadow-md hover:bg-[#6E1B85]">
                  Try Interactive Tools
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Resources Section */}
      <div className="bg-[#F3E5F5] py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <h2 className="text-lg font-semibold text-[#8E24AA]">Teacher Resources</h2>
              <p className="mt-4 text-4xl font-semibold text-[#3B3B3B] sm:text-5xl">Empowering Educators</p>
              <p className="mt-6 text-lg font-semibold text-gray-700">
                Access lesson plans, teaching aids, and professional development resources to enhance classroom instruction and student engagement.
              </p>
              <div className="mt-5">
                <button className="bg-[#8E24AA] text-white px-6 py-3 shadow-md hover:bg-[#6E1B85]">
                  Explore Teacher Resources
                </button>
              </div>
            </div>
            <div className="relative">
              <Image
                alt="Teacher Resources"
                src="/img/teacher-resources.jpg"
                width={800}
                height={500}
                className="rounded-3xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#8E24AA] to-transparent opacity-20 rounded-3xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-[#8E24AA] py-20 sm:py-32 text-center text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">Unlock Your Learning Potential</h2>
          <p className="mt-4 text-lg">
            Explore our comprehensive resources to support your academic journey. Start learning today!
          </p>
          <div className="mt-8">
            <button className="bg-white text-[#8E24AA] px-8 py-4 rounded-full font-semibold shadow-md hover:bg-gray-100">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
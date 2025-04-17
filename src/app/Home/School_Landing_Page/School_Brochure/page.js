"use client";

import Image from 'next/image';
import { useState, useEffect } from "react";

const heroContent = [
  {
    image: "/img/admission-cinematic1.jpg",
    title: "Welcome to Our School",
    description: "Discover a nurturing environment where every child thrives academically and personally.",
  },
  {
    image: "/img/admission-cinematic2.jpg",
    title: "Excellence in Education",
    description: "Explore our innovative programs designed to inspire and empower young minds.",
  },
  {
    image: "/img/admission-cinematic3.jpg",
    title: "A Bright Future Awaits",
    description: "Learn about our world-class facilities and vibrant community that shapes tomorrow’s leaders.",
  },
];

export default function SchoolBrochure() {
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
    <div className="bg-[#FAF9F6] text-gray-900">
      {/* Hero Section */}
      <div className="relative w-full h-[750px] overflow-hidden">
        {heroContent.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={item.image}
                layout="fill"
                objectFit="cover"
                alt="School Brochure Hero Image"
                className="brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FAF9F6]/80"></div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 text-center max-w-7xl w-full px-6">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900">
                {item.title}
              </h1>
              <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-gray-700">
                {item.description}
              </p>
              <div className="mt-10">
                <a
                  href="/documents/school-brochure.pdf"
                  download
                  className="relative bg-[#D4A017] text-white px-10 py-5 rounded-full font-semibold text-lg shadow-lg hover:bg-[#B88C14] transition-all duration-300 transform hover:scale-105 overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-[#B88C14] scale-0 rounded-full group-hover:scale-150 transition-transform duration-300 origin-center"></span>
                  <span className="relative z-10">Download Brochure</span>
                </a>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4">
          {heroContent.map((_, index) => (
            <span
              key={index}
              className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentIndex ? "bg-[#D4A017] scale-125" : "bg-gray-300/70"
              }`}
              onClick={() => handleIndicatorClick(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* Brochure Content Section */}
      <div className="py-24 bg-[#D1E7DD]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900">
            About Our School
          </h2>
          <p className="mt-6 text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Learn why our school is the perfect place for your child’s education, from our nurturing environment to our innovative programs.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#FAF9F6] p-6 rounded-3xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]">
              <h3 className="text-2xl font-semibold text-gray-900">Our Mission</h3>
              <p className="mt-4 text-gray-600">
                We are dedicated to fostering a holistic education that empowers students to excel academically, socially, and emotionally, preparing them for a bright future.
              </p>
            </div>
            <div className="bg-[#FAF9F6] p-6 rounded-3xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]">
              <h3 className="text-2xl font-semibold text-gray-900">Academic Programs</h3>
              <p className="mt-4 text-gray-600">
                From Nursery to Grade 12, our curriculum blends academic rigor with creative exploration, offering programs like CBSE, extracurricular activities, and specialized early childhood education.
              </p>
            </div>
            <div className="bg-[#FAF9F6] p-6 rounded-3xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]">
              <h3 className="text-2xl font-semibold text-gray-900">World-Class Facilities</h3>
              <p className="mt-4 text-gray-600">
                Our campus features modern classrooms, science labs, a library, sports fields, and dedicated spaces for arts and music, ensuring a well-rounded learning experience.
              </p>
            </div>
            <div className="bg-[#FAF9F6] p-6 rounded-3xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]">
              <h3 className="text-2xl font-semibold text-gray-900">Achievements</h3>
              <p className="mt-4 text-gray-600">
                Our students consistently excel in academics, sports, and national competitions, with many securing top ranks and scholarships to prestigious institutions.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <a
              href="/documents/school-brochure.pdf"
              download
              className="relative bg-[#D4A017] text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:bg-[#B88C14] transition-all duration-300 transform hover:scale-105 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-[#B88C14] scale-0 rounded-full group-hover:scale-150 transition-transform duration-300 origin-center"></span>
              <span className="relative z-10">Download Our Brochure</span>
            </a>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900">
            Visit Our Campus
          </h2>
          <p className="mt-6 text-lg text-gray-600 text-center max-w-3xl mx-auto">
            Explore our state-of-the-art facilities in person. Schedule a visit to see our vibrant campus.
          </p>
          <div className="mt-12 bg-[#FAF9F6] rounded-3xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100 transition-transform duration-300 hover:scale-[1.02]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.336285614434!2d77.20802131508216!3d28.559282982447936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2a99b1f3c2b%3A0xdeb2b257384e64e8!2sDelhi%20Public%20School%2C%20R.K.%20Puram!5e0!3m2!1sen!2sin!4v1698765432109!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-24 bg-[#D1E7DD]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Join Our Community
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            Take the first step toward your child’s future. Download our brochure or contact our admissions team today.
          </p>
          <div className="mt-10 flex justify-center gap-6">
            <a
              href="/documents/school-brochure.pdf"
              download
              className="relative bg-[#D4A017] text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:bg-[#B88C14] transition-all duration-300 transform hover:scale-105 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-[#B88C14] scale-0 rounded-full group-hover:scale-150 transition-transform duration-300 origin-center"></span>
              <span className="relative z-10">Download Brochure</span>
            </a>
            <a
              href="/admissions"
              className="relative border-2 border-[#D4A017] text-[#D4A017] px-10 py-4 rounded-full font-semibold hover:bg-[#D4A017] hover:text-white transition-all duration-300 transform hover:scale-105 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-[#D4A017] scale-0 rounded-full group-hover:scale-150 transition-transform duration-300 origin-center"></span>
              <span className="relative z-10">Apply Now</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
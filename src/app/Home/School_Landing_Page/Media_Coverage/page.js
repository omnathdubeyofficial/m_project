"use client";

import Image from 'next/image';
import { useEffect, useState } from "react";
const heroContent = [
    { image: "/img/schooltwo.jpg", title: "Unlock Your Child’s Potential", description: "Give your child the best start in life with our engaging and interactive classes." },
    { image: "/img/street-2805643.jpg", title: "Innovative Learning Methods", description: "Our curriculum is designed to spark curiosity and encourage creativity in children." },
    { image: "/img/schoolfour.jpg", title: "Supportive Learning Environment", description: "We provide a safe and nurturing space for children to grow and develop." },
    { image: "/img/classroom-5405427_1280.png", title: "Join Our Community", description: "Be part of a learning journey that shapes the future of young minds." },
  ];
  

export default function Managing_Director() {

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
          <div className="relative mt-24 w-full h-[500px] overflow-hidden">
                {heroContent.map((item, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                      index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image src={item.image} layout="fill" objectFit="cover" alt="Hero Image" />
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
    <div className="bg-[#F3E5F5] py-20 sm:py-32">

       
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="relative">
          <Image
            alt="Prime Scholars Academy Campus"
            src="/img/sexc.jpg"
            width={800}
            height={500}
            className="rounded-3xl shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#8E24AA] to-transparent opacity-20 rounded-3xl" />
        </div>
        <div className="text-left">
          <h2 className="text-lg font-semibold text-[#8E24AA]">Shaping Tomorrow’s Leaders</h2>
          <p className="mt-4 text-4xl font-semibold text-[#3B3B3B] sm:text-5xl">Prime Scholars Academy - Excellence & Innovation</p>
          <p className="mt-6 text-lg font-semibold text-gray-700">
            We empower students with a perfect blend of academic excellence, skill-based learning, and strong moral values to create future leaders.
          </p>
          <div className="mt-5 ">
              <button className="bg-[#8E24AA] text-white px-6 py-3  shadow-md hover:bg-[#6E1B85]">
                Explore More
              </button>
      
          </div>
        </div>
      </div>
    </div>
  </div>


  <div className="bg-[#E3F2FD] py-20 sm:py-32">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      
        <div className="text-left">
          <h2 className="text-lg font-semibold text-[#8E24AA]">Shaping Tomorrow’s Leaders</h2>
          <p className="mt-4 text-4xl font-semibold text-[#3B3B3B] sm:text-5xl">Prime Scholars Academy - Excellence & Innovation</p>
          <p className="mt-6 text-lg font-semibold text-gray-700">
            We empower students with a perfect blend of academic excellence, skill-based learning, and strong moral values to create future leaders.
          </p>
          <div className="mt-5 ">
              <button className="bg-[#8E24AA] text-white px-6 py-3  shadow-md hover:bg-[#6E1B85]">
                Explore More
              </button>
      
          </div>

          
        </div>
        <div className="relative">
          <Image
            alt="Prime Scholars Academy Campus"
            src="/img/sexc.jpg"
            width={800}
            height={500}
            className="rounded-3xl shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#8E24AA] to-transparent opacity-20 rounded-3xl" />
        </div>
      </div>
    </div>
    
  </div>



  <div className="bg-[#D1C4E9]py-20 sm:py-32">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div className="relative">
          <Image
            alt="Prime Scholars Academy Campus"
            src="/img/sexc.jpg"
            width={800}
            height={500}
            className="rounded-3xl shadow-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#8E24AA] to-transparent opacity-20 rounded-3xl" />
        </div>
        <div className="text-left">
          <h2 className="text-lg font-semibold text-[#8E24AA]">Shaping Tomorrow’s Leaders</h2>
          <p className="mt-4 text-4xl font-semibold text-[#3B3B3B] sm:text-5xl">Prime Scholars Academy - Excellence & Innovation</p>
          <p className="mt-6 text-lg font-semibold text-gray-700">
            We empower students with a perfect blend of academic excellence, skill-based learning, and strong moral values to create future leaders.
          </p>
          <div className="mt-5 ">
              <button className="bg-[#8E24AA] text-white px-6 py-3  shadow-md hover:bg-[#6E1B85]">
                Explore More
              </button>
      
          </div>

          
        </div>
       
      </div>
    </div>
    
  </div>


  </div>
  );
}
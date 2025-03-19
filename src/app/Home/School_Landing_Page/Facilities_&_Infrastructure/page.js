"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function FacilitiesInfrastructure() {
  const facilities = [
    {
      title: "Smart Classrooms",
      description:
        "Equipped with interactive digital boards, high-speed internet, and advanced learning tools for an immersive education experience.",
      images: [
        "/img/schooltwo.jpg",
        "/img/schoolthree.jpg",
        "/img/schoolfour.jpg",
        "/img/school0ne.png",
      ],
    },
    {
      title: "Library",
      description:
        "A vast collection of books, journals, digital archives, and research material to enrich students' knowledge.",
      images: [
        "/img/schooltwo.jpg",
        "/img/schoolthree.jpg",
        "/img/schoolfour.jpg",
        "/img/school0ne.png",
      ],
    },
    {
      title: "Science Labs",
      description:
        "Modern and fully-equipped physics, chemistry, and biology labs to foster hands-on learning and innovation.",
      images: [
        "/img/schooltwo.jpg",
        "/img/schoolthree.jpg",
        "/img/schoolfour.jpg",
        "/img/school0ne.png",
      ],
    },
    {
      title: "Sports Complex",
      description:
        "State-of-the-art sports facilities including a football field, basketball court, and indoor games arena.",
      images: [
        "/img/schooltwo.jpg",
        "/img/schoolthree.jpg",
        "/img/schoolfour.jpg",
        "/img/school0ne.png",
      ],
    },
    {
      title: "Auditorium",
      description:
        "A fully air-conditioned auditorium with advanced acoustics for events, seminars, and cultural programs.",
      images: [
        "/img/schooltwo.jpg",
        "/img/schoolthree.jpg",
        "/img/schoolfour.jpg",
        "/img/school0ne.png",
      ],
    },
    {
      title: "Cafeteria",
      description:
        "Hygienic and nutritious meals served in a comfortable and modern dining area.",
      images: [
        "/img/schooltwo.jpg",
        "/img/schoolthree.jpg",
        "/img/schoolfour.jpg",
        "/img/school0ne.png",
      ],
    },
    {
      title: "Computer Labs",
      description:
        "High-tech computer labs with the latest software and high-speed internet for coding and research.",
      images: [
        "/img/schooltwo.jpg",
        "/img/schoolthree.jpg",
        "/img/schoolfour.jpg",
        "/img/school0ne.png",
      ],
    },
  ];

  const [activeIndexes, setActiveIndexes] = useState(facilities.map(() => 0));
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndexes((prevIndexes) =>
        prevIndexes.map((index, i) => (index + 1) % facilities[i].images.length)
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-[#001F3F] to-[#003366] text-white">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl lg:text-5xl font-semibold text-center mb-8">
          Facilities & Infrastructure
        </h2>
        <p className="text-lg text-center mb-12 opacity-80">
          Experience a world-class infrastructure designed to enhance learning, creativity, and student development.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {facilities.slice(0, visibleCount).map((facility, facilityIndex) => (
            <div
              key={facilityIndex}
              className="group bg-white bg-opacity-10 shadow-lg overflow-hidden transform transition-all"
            >
              <div className="relative w-full h-60 overflow-hidden">
                <Image
                  src={facility.images[activeIndexes[facilityIndex]]}
                  alt={facility.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-medium mb-3">{facility.title}</h3>
                <p className="opacity-90 leading-relaxed">{facility.description}</p>
                <div className="flex space-x-2 mt-4">
                  {facility.images.map((_, imageIndex) => (
                    <button
                      key={imageIndex}
                      onClick={() =>
                        setActiveIndexes((prev) => {
                          const newIndexes = [...prev];
                          newIndexes[facilityIndex] = imageIndex;
                          return newIndexes;
                        })
                      }
                      className={`w-3 h-3 rounded-full transition-all border border-white ${
                        activeIndexes[facilityIndex] === imageIndex
                          ? "bg-white"
                          : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          {visibleCount < facilities.length ? (
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="px-6 py-2 bg-white text-blue-900 font-semibold  hover:bg-gray-300 transition-all"
            >
              View More
            </button>
          ) : (
            <button
              onClick={() => setVisibleCount(6)}
              className="px-6 py-2 bg-white text-blue-900 font-semibold  hover:bg-gray-300 transition-all"
            >
              View Less
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

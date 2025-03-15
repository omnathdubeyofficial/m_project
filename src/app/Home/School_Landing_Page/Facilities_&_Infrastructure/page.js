"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function FacilitiesInfrastructure() {
  const facilities = [
    { title: "Smart Classrooms", description: "Equipped with interactive digital boards, high-speed internet, and advanced learning tools for an immersive education experience.", images: ["/img/schooltwo.jpg", "/img/schoolthree.jpg", "/img/schoolfour.jpg", "/img/school0ne.png"] },
    { title: "Library", description: "A vast collection of books, journals, digital archives, and research material to enrich students' knowledge.", images: ["/img/schooltwo.jpg", "/img/schoolthree.jpg", "/img/schoolfour.jpg", "/img/school0ne.png"] },
    { title: "Science Labs", description: "Modern and fully-equipped physics, chemistry, and biology labs to foster hands-on learning and innovation.", images: ["/img/schooltwo.jpg", "/img/schoolthree.jpg", "/img/schoolfour.jpg", "/img/school0ne.png"] },
    { title: "Sports Complex", description: "A state-of-the-art sports complex featuring courts, gym, and tracks for holistic physical development.", images: ["/img/schooltwo.jpg", "/img/schoolthree.jpg", "/img/schoolfour.jpg", "/img/school0ne.png"] },
    { title: "Cafeteria", description: "A hygienic and well-maintained cafeteria serving nutritious meals and refreshments for students and faculty.", images: ["/img/schooltwo.jpg", "/img/schoolthree.jpg", "/img/schoolfour.jpg", "/img/school0ne.png"] },
    { title: "Transport", description: "Safe and secure transportation with GPS tracking and trained staff ensuring a smooth commute.", images: ["/img/schooltwo.jpg", "/img/schoolthree.jpg", "/img/schoolfour.jpg", "/img/school0ne.png"] },
  ];

  const [activeIndexes, setActiveIndexes] = useState(facilities.map(() => 0));
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransition(true);
      setActiveIndexes((prevIndexes) =>
        prevIndexes.map((index, i) => (index + 1) % facilities[i].images.length)
      );
    }, 5000); // Automatically change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-3xl lg:text-5xl font-semibold text-blue-900 mb-6 text-center">Facilities & Infrastructure</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto text-center">
          Experience a world-class infrastructure designed to enhance learning, creativity, and student development.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility, facilityIndex) => (
            <div key={facilityIndex} className="bg-white shadow-xl overflow-hidden transition transform hover:shadow-2xl border border-gray-200 hover:border-blue-500">
              <div className="relative w-full h-64 overflow-hidden">
                <Image 
                  src={facility.images[activeIndexes[facilityIndex]]} 
                  alt={facility.title} 
                  layout="fill" 
                  objectFit="cover" 
                  className={`transition-all duration-1000 ease-in-out ${transition ? 'opacity-100' : 'opacity-0'}`}
                />
              </div>
              <div className="p-6 text-left">
                <h3 className="text-2xl font-semibold text-blue-800">{facility.title}</h3>
                <p className="text-gray-600 mt-3 leading-relaxed">{facility.description}</p>
                <div className="flex space-x-2 mt-4">
                  {facility.images.map((_, imageIndex) => (
                    <button
                      key={imageIndex}
                      onClick={() => {
                        setTransition(false);
                        setTimeout(() => {
                          setActiveIndexes((prev) => {
                            const newIndexes = [...prev];
                            newIndexes[facilityIndex] = imageIndex;
                            return newIndexes;
                          });
                          setTransition(true);
                        }, 300);
                      }}
                      className={`w-3 h-3 rounded-full transition-all ${activeIndexes[facilityIndex] === imageIndex ? 'bg-blue-600' : 'bg-gray-400'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

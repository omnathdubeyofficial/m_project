"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";

import { Star, Tag, CheckCircle, XCircle, Users, UserCheck, UserMinus } from "lucide-react";

const classes = [
  { title: "LKG", description: "Fun learning for toddlers", tags: ["Basic English", "Numbers", "Rhymes"], image: "/img/xxx.png", path: "/classes/lkg", studentRating: 4.5, studentReviews: 120, parentsRating: 4.7, parentsReviews: 100, discount: "10%", isAdmissionOpen: true, totalSeats: 30, filledSeats: 20 },
  { title: "UKG", description: "Pre-primary education", tags: ["Phonics", "Basic Math", "Storytelling"], image: "/img/xxx.png", path: "/classes/ukg", studentRating: 4.6, studentReviews: 130, parentsRating: 4.8, parentsReviews: 110, discount: "12%", isAdmissionOpen: false, totalSeats: 25, filledSeats: 25 },
  { title: "Class 1", description: "Foundation for primary education", tags: ["English", "Math", "Science"], image: "/img/xxx.png", path: "/classes/1", studentRating: 4.7, studentReviews: 140, parentsRating: 4.9, parentsReviews: 120, discount: "15%", isAdmissionOpen: false, totalSeats: 40, filledSeats: 40 },
];

const heroContent = [
  { image: "/img/schooltwo.jpg", title: "Unlock Your Child’s Potential", description: "Give your child the best start in life with our engaging and interactive classes." },
  { image: "/img/street-2805643.jpg", title: "Innovative Learning Methods", description: "Our curriculum is designed to spark curiosity and encourage creativity in children." },
  { image: "/img/schoolfour.jpg", title: "Supportive Learning Environment", description: "We provide a safe and nurturing space for children to grow and develop." },
  { image: "/img/classroom-5405427_1280.png", title: "Join Our Community", description: "Be part of a learning journey that shapes the future of young minds." },
];

export default function ClassSetup() {
  const router = useRouter();
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
    <section className="py-16 bg-gray-100">

<div className="relative w-full h-[500px] overflow-hidden">
        {heroContent.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image src={item.image} layout="fill" objectFit="cover" alt="Hero Image" />
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 text-white max-w-7xl w-full px-10">
              <h1 className="text-4xl lg:text-6xl font-bold">{item.title}</h1>
              <p className="mt-4 text-lg lg:text-xl">{item.description}</p>
            </div>
          </div>
        ))}
        {/* Indicators */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
          {heroContent.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
              onClick={() => handleIndicatorClick(index)}
            ></span>
          ))}
        </div>
      </div>

<div className="max-w-7xl mx-auto px-8 py-10">
        <h2 className="text-3xl lg:text-5xl font-semibold text-blue-900 mb-6 text-center">Classes</h2>

        <p className="text-lg text-gray-700 max-w-2xl mx-auto text-center">
        Find the perfect learning path for each class level.
        </p>
 

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 auto-rows-min">
        {classes.map((cls, index) => {
            const availableSeats = cls.totalSeats - cls.filledSeats;
            return (
              <div key={index} className="relative bg-white p-6 shadow-lg text-left transition-all duration-500 ease-in-out transform shadow-md scale-100 min-h-[300px] border-b border-gray-300">
                <h3 className="text-blue-600 font-semibold text-sm uppercase flex items-center gap-2">
                  <Tag className="w-4 h-4 text-orange-500" /> {cls.title}
                </h3>
                <p className="text-lg mt-2 text-gray-900">{cls.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cls.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 text-sm bg-gray-200 rounded-full flex items-center gap-1">
                      <Tag className="w-3 h-3 text-gray-500" /> {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex justify-center">
                  <Image src={cls.image} width={130} height={130} alt={cls.title} className="transition-opacity duration-500 ease-in-out hover:opacity-80" />
                </div>
                <div className="mt-6 rounded-b-2xl w-full max-w-md mx-auto">
      {/* Student Rating */}
      <p
        className="flex justify-between items-center text-sm border-b border-gray-300 rounded-xl p-3 text-gray-700 cursor-pointer hover:bg-gray-200"
        onClick={() => router.push(cls.path)}
      >
        <span className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="font-semibold">Student Rating:</span>
        </span>
        <span className="text-green-500 font-semibold">
          {cls.studentRating}/5 ({cls.studentReviews})
        </span>
      </p>

      {/* Parents Rating */}
      <p
        className="flex justify-between items-center text-sm border-b border-gray-300 rounded-xl p-3 text-gray-700 cursor-pointer hover:bg-gray-200 mt-2"
        onClick={() => router.push(cls.path)}
      >
        <span className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="font-semibold">Parents Rating:</span>
        </span>
        <span className="text-green-500 font-semibold">
          {cls.parentsRating}/5 ({cls.parentsReviews})
        </span>
      </p>

      {/* Discount */}
      <p className="flex justify-between items-center text-sm border-b border-gray-300 rounded-xl p-3 text-gray-700 mt-2">
        <span className="flex items-center gap-1">
          <Tag className="w-4 h-4 text-red-500" />
          <span className="font-semibold">Discount:</span>
        </span>
        <span className="text-red-500 font-semibold">{cls.discount} Off</span>
      </p>

      {/* Seats Info */}
      <div className="grid grid-cols-1 gap-2 text-sm text-gray-700 mt-2">
        <p className="flex justify-between items-center border-b border-gray-300 rounded-xl p-3">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="font-semibold">Total Seats:</span>
          </span>
          <span>{cls.totalSeats}</span>
        </p>
        <p className="flex justify-between items-center border-b border-gray-300 rounded-xl p-3">
          <span className="flex items-center gap-1">
            <UserCheck className="w-4 h-4 text-green-500" />
            <span className="font-semibold">Filled Seats:</span>
          </span>
          <span>{cls.filledSeats}</span>
        </p>
        <p className="flex justify-between items-center border-b border-gray-300 rounded-xl p-3">
          <span className="flex items-center gap-1">
            <UserMinus className="w-4 h-4 text-red-500" />
            <span className="font-semibold">Available Seats:</span>
          </span>
          <span>{availableSeats}</span>
        </p>
      </div>

      {/* Admission Status */}
      <p className="flex justify-between items-center text-sm text-gray-700 border-b border-gray-300 rounded-xl p-3 mt-2">
        <span className="flex items-center gap-1">
          {cls.isAdmissionOpen ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <XCircle className="w-4 h-4 text-red-500" />
          )}
          <span className="font-semibold">Admission:</span>
        </span>
        <span className={`font-semibold ${cls.isAdmissionOpen ? 'text-green-500' : 'text-red-500'}`}>
          {cls.isAdmissionOpen ? 'Open' : 'Closed'}
        </span>
      </p>
    </div>
                {cls.isAdmissionOpen && availableSeats > 0 ? (
                  <button
                    onClick={() => router.push(cls.path)}
                    className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 font-semibold text-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:from-orange-600 hover:to-orange-700 active:scale-95"
                  >
                    Admission Form
                  </button>
                ) : (
                  <button
                    className="mt-6 w-full bg-red-600 text-white py-3 font-semibold text-lg"
                    disabled
                  >
                    Admission Closed
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, CheckCircle, XCircle, Tag, Users, ClipboardCheck, Percent } from "lucide-react"; // Lucide Icons

const classes = [
  { title: "LKG", description: "Fun learning for toddlers", tags: ["Basic English", "Numbers", "Rhymes"], image: "/img/xxx.png", path: "/classes/lkg", studentRating: 4.5, studentReviews: 120, parentsRating: 4.7, parentsReviews: 100, discount: "10%", isAdmissionOpen: true, totalSeats: 30, filledSeats: 20 },
  { title: "UKG", description: "Pre-primary education", tags: ["Phonics", "Basic Math", "Storytelling"], image: "/img/xxx.png", path: "/classes/ukg", studentRating: 4.6, studentReviews: 130, parentsRating: 4.8, parentsReviews: 110, discount: "12%", isAdmissionOpen: true, totalSeats: 25, filledSeats: 18 },
  { title: "Class 1", description: "Foundation for primary education", tags: ["English", "Math", "Science"], image: "/img/xxx.png", path: "/classes/1", studentRating: 4.7, studentReviews: 140, parentsRating: 4.9, parentsReviews: 120, discount: "15%", isAdmissionOpen: false, totalSeats: 40, filledSeats: 40 },
];

export default function ClassSetup() {
  const router = useRouter();
  
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-8">
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
                <div className="mt-6 p-5 bg-white shadow-lg rounded-2xl border border-gray-200">
      {/* Ratings Section */}
      <div
        className="text-sm border-b border-gray-300 pb-3 flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md"
        onClick={() => router.push(cls.path)}
      >
        <span className="flex items-center gap-2 text-gray-700 font-medium">
          <Star className="w-5 h-5 text-yellow-500" /> Student Rating:
        </span>
        <span className="text-green-600 font-semibold">
          {cls.studentRating}/5 ({cls.studentReviews} Reviews)
        </span>
      </div>

      <div
        className="text-sm border-b border-gray-300 pb-3 flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded-md"
        onClick={() => router.push(cls.path)}
      >
        <span className="flex items-center gap-2 text-gray-700 font-medium">
          <Star className="w-5 h-5 text-yellow-500" /> Parents Rating:
        </span>
        <span className="text-green-600 font-semibold">
          {cls.parentsRating}/5 ({cls.parentsReviews} Reviews)
        </span>
      </div>

      {/* Discount Section */}
      <div className="text-sm border-b border-gray-300 pb-3 flex justify-between items-center text-red-500 font-semibold p-2 rounded-md">
        <span className="flex items-center gap-2">
          <Percent className="w-5 h-5 text-red-500" /> Discount:
        </span>
        <span>{cls.discount} Off</span>
      </div>

      {/* Seats Information */}
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="text-sm bg-gray-100 p-3 rounded-lg flex justify-between items-center">
          <span className="flex items-center gap-2 font-medium">
            <Users className="w-5 h-5 text-blue-500" /> Total Seats:
          </span>
          <span>{cls.totalSeats}</span>
        </div>

        <div className="text-sm bg-gray-100 p-3 rounded-lg flex justify-between items-center">
          <span className="flex items-center gap-2 font-medium">
            <Users className="w-5 h-5 text-yellow-500" /> Filled Seats:
          </span>
          <span>{cls.filledSeats}</span>
        </div>

        <div className="text-sm bg-gray-100 p-3 rounded-lg flex justify-between items-center col-span-2">
          <span className="flex items-center gap-2 font-medium">
            <Users className="w-5 h-5 text-green-500" /> Available Seats:
          </span>
          <span className="text-green-600 font-semibold">{availableSeats}</span>
        </div>
      </div>

      {/* Admission Status */}
      <div className="text-sm border-t border-gray-300 mt-4 pt-3 flex justify-between items-center font-medium p-2 rounded-md">
        <span className="flex items-center gap-2">
          {cls.isAdmissionOpen ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          Admission:
        </span>
        <span className={cls.isAdmissionOpen ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
          {cls.isAdmissionOpen ? "Open" : "Closed"}
        </span>
      </div>
    </div>
                {cls.isAdmissionOpen && availableSeats > 0 ? (
                  <button
                    onClick={() => router.push(cls.path)}
                    className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 font-semibold text-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:from-orange-600 hover:to-orange-700 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <ClipboardCheck className="w-5 h-5 text-white" /> Admission Form
                  </button>
                ) : (
                  <button
                    className="mt-6 w-full bg-red-600 text-white py-3 font-semibold text-lg flex items-center justify-center gap-2"
                    disabled
                  >
                    <XCircle className="w-5 h-5 text-white" /> Admission Closed
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

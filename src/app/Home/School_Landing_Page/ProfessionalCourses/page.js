"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Star, CheckCircle, XCircle, Tag } from "lucide-react"; // Lucide Icons

const classes = [
  { title: "LKG", description: "Fun learning for toddlers", tags: ["Basic English", "Numbers", "Rhymes"], image: "/img/xxx.png", path: "/classes/lkg", studentRating: 4.5, studentReviews: 120, parentsRating: 4.7, parentsReviews: 100, discount: "10%", isAdmissionOpen: true },
  { title: "UKG", description: "Pre-primary education", tags: ["Phonics", "Basic Math", "Storytelling"], image: "/img/xxx.png", path: "/classes/ukg", studentRating: 4.6, studentReviews: 130, parentsRating: 4.8, parentsReviews: 110, discount: "12%", isAdmissionOpen: true },
  { title: "Class 1", description: "Foundation for primary education", tags: ["English", "Math", "Science"], image: "/img/xxx.png", path: "/classes/1", studentRating: 4.7, studentReviews: 140, parentsRating: 4.9, parentsReviews: 120, discount: "15%", isAdmissionOpen: false },
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
          {classes.map((cls, index) => (
            <div
              key={index}
              className="relative bg-white p-6 shadow-lg text-left transition-all duration-500 ease-in-out transform shadow-md scale-100 min-h-[270px] border-b border-gray-300"
            >
              <h3 className="text-blue-600 font-semibold text-sm uppercase flex items-center gap-2">
                <Tag className="w-4 h-4 text-orange-500" /> {cls.title}
              </h3>
              <p className="text-lg mt-2 text-gray-900">{cls.description}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {cls.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm bg-gray-200 rounded-full flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3 text-gray-500" /> {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Image
                  src={cls.image}
                  width={130} 
                  height={130}
                  alt={cls.title}
                  className="transition-opacity duration-500 ease-in-out hover:opacity-80"
                />
              </div>

              <div className="mt-6 p-4 bg-gray-50 border border-gray-200">
                <p className="text-sm border-b border-gray-300 pb-2 text-gray-700 flex justify-between cursor-pointer"
                  onClick={() => router.push(cls.path)}
                >
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" /> <strong>Student Rating:</strong></span>
                  <span className="flex items-center text-green-500 font-semibold">
                {cls.studentRating}/5 ({cls.studentReviews} Reviews)
                  </span>
                </p>

                <p className="text-sm border-b border-gray-300 pb-2 text-gray-700 flex justify-between cursor-pointer mt-1"
                  onClick={() => router.push(cls.path)}
                >
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" /> <strong>Parents Rating:</strong></span>
                  <span className="flex items-center text-green-500 font-semibold">
                    {cls.parentsRating}/5 ({cls.parentsReviews} Reviews)
                  </span>
                </p>

                <p className="text-sm border-b border-gray-300 pb-2 text-gray-700 flex justify-between mt-1">
                  <span className="flex items-center gap-1"><Tag className="w-4 h-4 text-red-500" /> <strong>Discount:</strong></span>
                  <span className="text-red-500 font-semibold">{cls.discount} Off</span>
                </p>

                <p className="text-sm border-b border-gray-300 pb-2 text-gray-700 flex justify-between mt-1">
                  <span className="flex items-center gap-1">
                    {cls.isAdmissionOpen ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                    <strong>Admission:</strong>
                  </span>
                  <span className={`font-semibold ${cls.isAdmissionOpen ? 'text-green-500' : 'text-red-500'}`}>
                    {cls.isAdmissionOpen ? 'Open' : 'Closed'}
                  </span>
                </p>
              </div>

              <button
                onClick={() => router.push(cls.path)}
                className="mt-6 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 font-semibold text-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:from-orange-600 hover:to-orange-700 active:scale-95"
              >
                Explore
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

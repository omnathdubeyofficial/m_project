"use client";

import Image from "next/image";
import { useState } from "react";

const courses = [
  {
    title: "Competitive Exams",
    classes: "Class 3 - 13",
    tags: ["JEE", "NEET", "Foundation", "EAMCET", "Olympiad", "JEE Books", "NEET Books"],
    image: "/img/image copy 2.png",
    color: "text-blue-600",
  },
  {
    title: "School Tuition",
    classes: "Class 3 - 12",
    tags: ["CBSE Board", "ICSE Board"],
    image: "/img/xxx.png",
    color: "text-purple-600",
  },
  {
    title: "Courses for Kids",
    classes: "Class 1 - 5",
    tags: [
      { text: "Summer Camp", new: true },
      "Spoken English",
      "Learn English",
      "Learn Math",
      "Learn Code",
    ],
    image: "/img/image copy 3.png",
    color: "text-blue-600",
  },
];

export default function ExploreCourses() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Explore Courses <span className="text-gray-600">(Class 1 - 13)</span>
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {courses.map((course, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`bg-white p-4 rounded-xl shadow-md text-left transition-all duration-700 ease-in-out transform ${
                hoveredIndex === index ? "shadow-2xl scale-105" : "shadow-md scale-100"
              }`}
            >
              <h3 className={`${course.color} font-bold`}>{course.classes}</h3>
              <h4 className="text-lg font-semibold mt-1">{course.title}</h4>
              <div className="mt-3 flex flex-wrap gap-1">
                {course.tags.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-gray-200 rounded-md flex items-center"
                  >
                    {typeof item === "object" ? (
                      <>
                        <span>{item.text}</span>
                        <span className="ml-1 text-xs bg-yellow-400 text-black px-1 rounded">
                          NEW
                        </span>
                      </>
                    ) : (
                      item
                    )}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <Image
                  src={course.image}
                  width={150}
                  height={150}
                  alt={course.title}
                  className="mx-auto transition-opacity duration-700 ease-in-out hover:opacity-80"
                />
              </div>
              <button
                className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md font-semibold transition-all duration-700 ease-in-out transform hover:scale-110 hover:bg-orange-600 active:scale-95"
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

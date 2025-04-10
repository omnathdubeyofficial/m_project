"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import { GET_CLASS_LIST_DATA } from "../../../query/ClassesDataQuery/fetchClassData";
import { executeQuery } from "../../../graphqlClient";
import { Star, Tag, CheckCircle, XCircle, Users, UserCheck, UserMinus } from "lucide-react";



const heroContent = [
  { image: "/img/schooltwo.jpg", title: "Unlock Your Child’s Potential", description: "Give your child the best start in life with our engaging and interactive classes." },
  { image: "/img/street-2805643.jpg", title: "Innovative Learning Methods", description: "Our curriculum is designed to spark curiosity and encourage creativity in children." },
  { image: "/img/schoolfour.jpg", title: "Supportive Learning Environment", description: "We provide a safe and nurturing space for children to grow and develop." },
  { image: "/img/classroom-5405427_1280.png", title: "Join Our Community", description: "Be part of a learning journey that shapes the future of young minds." },
];

export default function ClassSetup() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await executeQuery(GET_CLASS_LIST_DATA);
      if (response?.getClassesDataList) {
        setClasses(response.getClassesDataList);
      }
    };
    fetchClasses();
  }, []);

  const getClassPath = (classTitle) => {
    switch (classTitle.toLowerCase()) {
      case "nursery":
        return "/Admission_Forms_All/Nursery_Admission_Form";
      case "lkg":
        return "/Admission_Forms_All/LKG_Admission_Form";
      case "ukg":
        return "/classes/ukg";
      case "1st":
        return "/classes/1";
      case "2nd":
        return "/classes/2";
      case "3rd":
        return "/classes/3";
      case "4th":
        return "/classes/4";
      case "5th":
        return "/classes/5";
      case "6th":
        return "/classes/6";
      case "7th":
        return "/classes/7";
      case "8th":
        return "/classes/8";
      case "9th":
        return "/classes/9";
      case "10th":
        return "/classes/10";
      case "11th":
        return "/classes/11";
      case "12th":
        return "/classes/12";
      default:
        return "/classes/general"; 
    }
  };

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
    <section className=" bg-gray-100">

<div className="relative mt-4 w-full h-[500px] overflow-hidden">
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
            const availableSeats = cls.total_seats - cls.filled_seats || '0';
            const classPath = getClassPath(cls.class_title); 
            return (
              <div key={index} className="relative bg-white p-6 shadow-lg text-left transition-all duration-500 ease-in-out transform shadow-md scale-100 min-h-[300px] border-b border-gray-300">
                <h3 className="text-blue-600 font-semibold text-sm uppercase flex items-center gap-2">
                  <Tag className="w-4 h-4 text-orange-500" /> {cls.class_title}
                </h3>
                <p className="text-sm mt-2 text-gray-900">{cls.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                {cls.tags && typeof cls.tags === "string" 
  ? cls.tags.split(",").map((tag, idx) => (
      <span key={idx} className="px-3 py-1 text-sm bg-blue-100 rounded-full flex items-center gap-1">
        <Tag className="w-3 h-3 text-gray-500" /> {tag.trim()}
      </span>
    ))
  : <p className="text-gray-500 text-sm">No Tags Available</p>
}

                </div>
                <div className="mt-6 flex justify-center">
  <div className="w-auto h-[275px] overflow-hidden ">
    <Image
      src={cls?.image || "/img/1.png"}
      width={180}
      height={180}
      alt={cls?.class_title || "Class Image"}
      className="w-full h-full object-cover transition-opacity duration-500 ease-in-out hover:opacity-80"
      unoptimized
      onError={(e) => (e.target.src = "/window.svg")}
    />
  </div>
</div>
                <div className="mt-6 rounded-b-2xl w-full max-w-md mx-auto">
      {/* Student Rating */}
      <p
        className="flex justify-between items-center text-sm border-b border-gray-300 rounded-xl p-3 text-gray-700 cursor-pointer hover:bg-gray-200"
        onClick={() => router.push('/Home/School_Landing_Page/Students_Review_Rating')}
      >
        <span className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="font-semibold">Student Rating:</span>
        </span>
        <span className="text-green-500 font-semibold">
          {cls.student_reviews || "NA"}/5 ({cls.student_rating || "NA"})
        </span>
      </p>

      {/* Parents Rating */}
      <p
        className="flex justify-between items-center text-sm border-b border-gray-300 rounded-xl p-3 text-gray-700 cursor-pointer hover:bg-gray-200 mt-2"
        onClick={() => router.push('/Home/School_Landing_Page/Parent_Review_Rating')}
      >
        <span className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="font-semibold">Parents Rating:</span>
        </span>
        <span className="text-green-500 font-semibold">
          {cls.parents_reviews}/5 ({cls.parents_rating})
        </span>
      </p>

      {/* Discount */}
      <p className="flex justify-between items-center text-sm border-b border-gray-300 rounded-xl p-3 text-gray-700 mt-2">
        <span className="flex items-center gap-1">
          <Tag className="w-4 h-4 text-red-500" />
          <span className="font-semibold">Discount:</span>
        </span>
        <span className="text-red-500 font-semibold">{cls.discount} % Off</span>
      </p>

      {/* Seats Info */}
      <div className="grid grid-cols-1 gap-2 text-sm text-gray-700 mt-2">
        <p className="flex justify-between items-center border-b border-gray-300 rounded-xl p-3">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="font-semibold">Total Seats:</span>
          </span>
          <span>{cls.total_seats}</span>
        </p>
        <p className="flex justify-between items-center border-b border-gray-300 rounded-xl p-3">
          <span className="flex items-center gap-1">
            <UserCheck className="w-4 h-4 text-green-500" />
            <span className="font-semibold">Filled Seats:</span>
          </span>
          <span>{cls.filled_seats}</span>
        </p>
        <p className="flex justify-between items-center border-b border-gray-300 rounded-xl p-3">
          <span className="flex items-center gap-1">
            <UserMinus className="w-4 h-4 text-red-500" />
            <span className="font-semibold">Available Seats:</span>
          </span>
          <span>{availableSeats}</span>
        </p>
      </div>

     
    </div>
    {availableSeats > 0 ? (
        <button
          onClick={() => router.push(classPath)}
          className="mt-6 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 font-semibold text-lg transition-all duration-500 ease-in-out transform hover:scale-105 hover:from-orange-600 hover:to-orange-700 active:scale-95"
        >
         Apply Now
        </button>
      ) : (
        <button className="mt-6 w-full bg-red-600 text-white py-3 font-semibold text-lg" disabled>
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

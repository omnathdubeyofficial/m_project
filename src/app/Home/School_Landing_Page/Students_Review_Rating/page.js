"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Loading from '../../../Loader/page';
import { motion, AnimatePresence } from "framer-motion";
import { GET_STUDENT_RATING_DATA } from "../../../query/StudentRatingQuery/fetchStudentQuery";
import { executeQuery } from "../../../graphqlClient";
import { ArrowLeft } from "lucide-react";

export default function Home() {
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [studentRatings, setStudentRatings] = useState([]);
  const [selectedClass, setSelectedClass] = useState("all"); // State for class filter
  const reviewsPerLoad = 3;

  const [displayedTotalReviews, setDisplayedTotalReviews] = useState(0);

  useEffect(() => {
    let pageLoaded = false;
    let dataFetched = false;

    const animateReviewsCount = (total) => {
      let start = 0;
      const end = total;
      const duration = 100;
      const stepTime = Math.floor(duration / (end / 10 || 1));

      const timer = setInterval(() => {
        start += Math.max(1, Math.floor(end / 10));
        if (start >= end) {
          clearInterval(timer);
          setDisplayedTotalReviews(end);
        } else {
          setDisplayedTotalReviews(start);
        }
      }, stepTime);
      return () => clearInterval(timer);
    };

    const fetchStudentRatings = async () => {
      try {
        const response = await executeQuery(GET_STUDENT_RATING_DATA);
        const ratings = response?.getStudentRatings || [];
        setStudentRatings(ratings);
        animateReviewsCount(ratings.length);
        dataFetched = true;
        checkLoadingComplete();
      } catch (error) {
        console.error("Error fetching student ratings:", error);
        setStudentRatings([]);
        dataFetched = true;
        checkLoadingComplete();
      }
    };

    const checkLoadingComplete = () => {
      if (pageLoaded && dataFetched) {
        setIsLoading(false);
      }
    };

    const handlePageLoad = () => {
      pageLoaded = true;
      checkLoadingComplete();
    };

    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
    }

    fetchStudentRatings();

    return () => {
      window.removeEventListener("load", handlePageLoad);
    };
  }, []);


  useEffect(() => {
    const filteredReviews = selectedClass === "all" 
      ? studentRatings 
      : studentRatings.filter(review => review.class_assigned === selectedClass);
    
    setDisplayedTotalReviews(filteredReviews.length); // Set immediately without animation
  }, [selectedClass, studentRatings]);

  // Format date from "20250409" to "09 April 2025"
  const formatDate = (dateStr) => {
    if (!dateStr || dateStr.length !== 8) return "N/A";
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  };

  // Render stars based on string rating converted to number
  const renderStars = (rating) => {
    const ratingNum = parseInt(rating, 10) || 0; // Convert string to number
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < ratingNum ? "text-yellow-500" : "text-gray-300"}`}
      >
        ★
      </span>
    ));
  };

  const handleShowMore = () => {
    setVisibleReviews((prev) => prev + reviewsPerLoad);
  };

  const handleShowLess = () => {
    setVisibleReviews((prev) => Math.max(prev - reviewsPerLoad, reviewsPerLoad));
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  if (isLoading) {
    return <Loading />;
  }

  // Get unique classes for filter dropdown
  const uniqueClasses = ["all", ...new Set(studentRatings.map(review => review.class_assigned).filter(Boolean))];

  // Filter reviews based on selected class
  const filteredReviews = selectedClass === "all" 
    ? studentRatings 
    : studentRatings.filter(review => review.class_assigned === selectedClass);

  const totalReviewsFetched = filteredReviews.length;
  const ratingSum = filteredReviews.reduce((sum, review) => sum + (parseInt(review.rating) || 0), 0);
  const averageRatingFetched = totalReviewsFetched > 0 ? (ratingSum / totalReviewsFetched).toFixed(1) : 0;

  const ratingColors = {
    5: "green-600",
    4: "purple-500",
    3: "indigo-600",
    2: "blue-500",
    1: "red-500",
  };

  const ratingDistributionFetched = [5, 4, 3, 2, 1].map((star) => ({
    stars: star,
    count: filteredReviews.filter((review) => parseInt(review.rating) === star).length,
    color: ratingColors[star] || "gray-500",
  }));

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col pt-28">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow">
        {/* Class Filter Dropdown */}
        <div className="flex justify-between items-center mb-6">
  {/* Back Button with Icon */}
  <button
  onClick={() => window.history.back()}
  className="inline-flex items-center gap-2 bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900 px-4 py-2  shadow-sm transition-all duration-200 ease-in-out"
>
  <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
  <span className="font-semibold">Back</span>
</button>

  {/* Filter Dropdown */}
  <div>
    <select
      value={selectedClass}
      onChange={(e) => setSelectedClass(e.target.value)}
      className="px-4 py-2 border border-gray-300  bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      {uniqueClasses.map((className) => (
        <option  key={className} value={className}>
          {className === "all" ? "Filter By Class" : className}
        </option>
      ))}
    </select>
  </div>
</div>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white  p-6 shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-700">Total Reviews</h3>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-5xl font-bold text-gray-900">
                  {displayedTotalReviews.toLocaleString()}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-1">Total reviews this year</p>
              <p className="text-gray-500 text-sm mt-2">
                This reflects the total feedback received from students across all classes, showcasing our commitment to quality education.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
              <Image
                src="/img/super-kid.webp"
                alt="Reviews Icon"
                width={280}
                height={120}
                className="object-contain"
              />
            </div>
          </div>

          <div className="bg-white  p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700">Average Rating</h3>
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex">{renderStars(averageRatingFetched)}</div>
              <span className="text-2xl font-bold text-gray-900">{averageRatingFetched}</span>
            </div>
            <p className="text-gray-600 text-sm mt-1">Average rating this year</p>
            <div className="mt-4 space-y-2">
              {ratingDistributionFetched.map((item) => (
                <div key={item.stars} className="flex items-center space-x-2 text-sm">
                  <span className="w-8 text-gray-600">{item.stars} ★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-${item.color}`}
                      style={{
                        width: `${(item.count / Math.max(...ratingDistributionFetched.map((r) => r.count))) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="w-16 text-gray-600 text-right">
                    {item.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-0 pt-0">
            {filteredReviews.slice(0, visibleReviews).map((review, index) => (
              <motion.div
                key={review.z_id}
                className="bg-white  p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={index}
              >
                <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 tracking-tight">
  {[
    review.first_name,
    review.middle_name,
    review.last_name,
  ]
    .filter(Boolean) // Remove undefined/null parts
    .map(
      (name) =>
        name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    )
    .join(" ")}
</h3>


                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 ">
                    {formatDate(review.cdate)}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-gray-700 text-sm font-medium bg-yellow-100 px-2 py-1 rounded-md">
                    {review.rating}/5
                  </span>
                </div>
                <p className="text-gray-600 text-base leading-relaxed mb-4 border-l-4 border-green-500 pl-4 italic bg-green-50 rounded-sm">
  “{review.review}”
</p>

                <div className="flex justify-between items-center">
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium text-gray-800">Class:</span> {review.class_assigned || "N/A"}
                  </p>
                </div>
              </motion.div>
            ))}
          </section>
        </AnimatePresence>

        <div className="flex justify-center items-center gap-4 mt-10">
          {visibleReviews < filteredReviews.length && (
            <motion.button
              onClick={handleShowMore}
              className="px-6 py-2 bg-green-600 text-white  text-sm shadow-md"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              Show More
            </motion.button>
          )}
          {visibleReviews > reviewsPerLoad && (
            <motion.button
              onClick={handleShowLess}
              className="px-6 py-2 bg-gray-200 text-gray-700  text-sm shadow-md"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              Show Less
            </motion.button>
          )}
        </div>
      </main>
    </div>
  );
}
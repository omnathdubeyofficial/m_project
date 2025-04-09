"use client";

import { useState, useEffect } from "react";
import Image from "next/image"; // Import Next.js Image component
import Loading from '../../../Loader/page'; // Import your Loader component
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion with AnimatePresence

export default function Home() {
  // Dummy data with class added
  const totalReviews = 10000;
  const reviewGrowth = 21;
  const averageRating = 4.0;
  const ratingDistribution = [
    { stars: 5, count: 2000, color: "indigo-600" },
    { stars: 4, count: 500, color: "yellow-500" },
    { stars: 3, count: 200, color: "orange-400" },
    { stars: 2, count: 200, color: "blue-500" },
    { stars: 1, count: 100, color: "red-500" },
  ];
  const reviews = [
    {
      id: 1,
      name: "Towhidur Rahman",
      rating: 5,
      date: "24-10-2022",
      review: "My first and only mala ordered on Etsy, and I'm beyond delighted! I requested a custom mala based on two stones I was called to invite together in this kind of creation. The fun and genuine joy...",
      class: "5th",
    },
    {
      id: 2,
      name: "Priya Singh",
      rating: 4,
      date: "15-09-2022",
      review: "Good quality product, delivery was a bit slow but overall satisfied.",
      class: "6th",
    },
    {
      id: 3,
      name: "Aman Verma",
      rating: 5,
      date: "01-11-2022",
      review: "Excellent service, highly recommend to everyone!",
      class: "7th",
    },
    {
      id: 14,
      name: "Towhidur Rahman",
      rating: 5,
      date: "24-10-2022",
      review: "My first and only mala ordered on Etsy, and I'm beyond delighted! I requested a custom mala based on two stones I was called to invite together in this kind of creation. The fun and genuine joy...",
      class: "5th",
    },
    {
      id: 24,
      name: "Priya Singh",
      rating: 4,
      date: "15-09-2022",
      review: "Good quality product, delivery was a bit slow but overall satisfied.",
      class: "6th",
    },
    {
      id: 34,
      name: "Aman Verma",
      rating: 5,
      date: "01-11-2022",
      review: "Excellent service, highly recommend to everyone!",
      class: "7th",
    },
  ];

  // State for showing reviews and loading
  const [visibleReviews, setVisibleReviews] = useState(3); // Initial number of reviews to show
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const reviewsPerLoad = 3; // Number of reviews to load each time "Show More" is clicked

  // Animated number effect and full page load handling
  const [displayedTotalReviews, setDisplayedTotalReviews] = useState(0);
  useEffect(() => {
    // Animate the total reviews count
    let start = 0;
    const end = totalReviews;
    const duration = 1500;
    const stepTime = Math.floor(duration / (end / 100));

    const timer = setInterval(() => {
      start += 100;
      if (start >= end) {
        clearInterval(timer);
        setDisplayedTotalReviews(end);
      } else {
        setDisplayedTotalReviews(start);
      }
    }, stepTime);

    // Handle full page load (including images)
    const handleLoad = () => {
      setIsLoading(false); // Set loading to false when everything is loaded
    };

    // Check if the document and all resources are loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearInterval(timer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  // Render stars
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
      >
        ★
      </span>
    ));
  };

  // Handlers for Show More/Show Less
  const handleShowMore = () => {
    setVisibleReviews((prev) => prev + reviewsPerLoad);
  };

  const handleShowLess = () => {
    setVisibleReviews((prev) => Math.max(prev - reviewsPerLoad, reviewsPerLoad));
  };

  // Animation variants for buttons
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  // Animation variants for review cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  // If loading, show the loader
  if (isLoading) {
    return <Loading />; // Your custom loader component
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col pt-28">
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Total Reviews with Image and Description */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-700">Total Reviews</h3>
              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-5xl font-bold text-gray-900">
                  {displayedTotalReviews.toLocaleString()}
                </span>
                <span className="text-sm text-green-600">+{reviewGrowth}%</span>
              </div>
              <p className="text-gray-600 text-sm mt-1">Growth in reviews this year</p>
              <p className="text-gray-500 text-sm mt-2">
                This reflects the total feedback received from students across all classes, showcasing our commitment to quality education.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
              <Image
                src="/img/super-kid.webp" // Replace with your image path
                alt="Reviews Icon"
                width={280}
                height={120}
                className="object-contain"
                onLoadingComplete={() => {
                  // Optional: Ensure image load contributes to loading state
                  if (document.readyState === "complete") {
                    setIsLoading(false);
                  }
                }}
              />
            </div>
          </div>

          {/* Average Rating */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700">Average Rating</h3>
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex">{renderStars(averageRating)}</div>
              <span className="text-2xl font-bold text-gray-900">{averageRating}</span>
            </div>
            <p className="text-gray-600 text-sm mt-1">Average rating this year</p>
            <div className="mt-4 space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center space-x-2 text-sm">
                  <span className="w-8 text-gray-600">{item.stars} ★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-${item.color}`}
                      style={{
                        width: `${(item.count / Math.max(...ratingDistribution.map((r) => r.count))) * 100}%`,
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

        {/* Reviews List with Motion and AnimatePresence */}
        <AnimatePresence>
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-0 pt-0">
            {reviews.slice(0, visibleReviews).map((review, index) => (
              <motion.div
                key={review.id}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={index}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 tracking-tight">{review.name}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{review.date}</span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-gray-700 text-sm font-medium bg-yellow-100 px-2 py-1 rounded-md">
                    {review.rating}/5
                  </span>
                </div>
                <p className="text-gray-700 text-base leading-relaxed mb-4 font-light italic">"{review.review}"</p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium text-gray-800">Class:</span> {review.class}
                  </p>
                </div>
              </motion.div>
            ))}
          </section>
        </AnimatePresence>

        {/* Show More/Show Less Buttons with Motion */}
        <div className="flex justify-center items-center gap-4 mt-10">
          {visibleReviews < reviews.length && (
            <motion.button
              onClick={handleShowMore}
              className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm shadow-md"
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
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm shadow-md"
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
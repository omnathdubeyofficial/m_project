"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaDownload, FaFolder, FaUser, FaUsers, FaCalendarAlt, FaClipboardList } from "react-icons/fa";
import { executeQuery } from "../../../graphqlClient";
import { GET_NOTICE_BOARD_LISTS } from "../../../query/NoticeBoardQuery/fetchNoticeBoard";
import "./style.css";

const slides = [
  "/videos/41603-430090405_medium.mp4",
  "/videos/21472-318172509_small.mp4",
  "/videos/90933-629483642_medium.mp4"
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [announcements, setAnnouncements] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await executeQuery(GET_NOTICE_BOARD_LISTS);
        const allNotices = response.getNoticeBoardLists;
        
        const today = new Date();
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(today.getDate() - 3);

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const filteredNotices = allNotices
          .filter((notice) => {
            const noticeDate = new Date(
              `${notice.notice_date.substring(0, 4)}-${notice.notice_date.substring(4, 6)}-${notice.notice_date.substring(6, 8)}`
            );
            return noticeDate >= oneMonthAgo;
          })
          .sort((a, b) => b.notice_date.localeCompare(a.notice_date));

        setAnnouncements(filteredNotices);
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleReadMore = (index) => {
    setExpanded((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };


  const formatNoticeDate = (dateString) => {
    if (!dateString || dateString.length !== 8) return "Invalid Date";
  
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
  
    const formattedDate = new Date(`${year}-${month}-${day}`);
  
    return formattedDate.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  };
  

  if (loading) return <p className="text-center p-4">Loading announcements...</p>;
  if (error) return <p className="text-center p-4 text-red-600">Error: {error}</p>;

  return (
 <section className="relative w-screen h-screen flex pb-6 flex-col md:flex-row items-center justify-between overflow-hidden bg-red-100">
  <div className="relative w-full md:w-2/3 h-screen video-container">
        {slides.map((video, index) => (
          <video
            key={index}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            autoPlay loop muted>
            <source src={video} type="video/mp4" />
          </video>
        ))}

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3.5 h-3.5 rounded-full cursor-pointer transition-all duration-500 border border-white ${
                index === currentIndex ? "bg-white scale-125 shadow-lg" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Announcements Section */}
      <div className="w-full md:w-1/3 h-screen bg-red-100 p-3 md:p-8 overflow-hidden z-10 flex flex-col justify-start pt-4 md:pt-24">
        <h2 className="text-2xl font-semibold text-white bg-red-600 p-3 mb-2 border-b-2 text-left flex items-center">
          <span className="mr-2 text-xl"><FaClipboardList className="mx-1" /></span> Latest Circulars
        </h2>

        {/* Scrollable Announcement List */}
        <div className="flex flex-col gap-3 overflow-y-auto scrollbar-hide" >
          {announcements.length === 0 ? (
            <p className="text-gray-600 text-center">No announcements available.</p>
          ) : (
              announcements.map((item, index) => {
                const noticeDate = new Date(
                  `${item.notice_date.substring(0, 4)}-${item.notice_date.substring(4, 6)}-${item.notice_date.substring(6, 8)}`
                );
                const isNew = noticeDate >= new Date().setDate(new Date().getDate() - 3);
  
                return (
              <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition-all"
            >
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    {item.title} {isNew && <span className="ml-2 text-white pl-2 pr-2 text-sm bg-red-600 font-bold rounded-xl animate-pulse">New</span>}
                  </h3>
                <p className="text-sm text-gray-700 mt-2">
                  {expanded[index] ? item.description : `${item.description.substring(0, 50)}...`}
                </p>
                <button
                  onClick={() => toggleReadMore(index)}
                  className="text-red-500 text-sm font-medium hover:underline mt-1 block"
                >
                  {expanded[index] ? "Read Less" : "Read More →"}
                </button>
                <p className="text-xs text-gray-500 font-semibold flex items-center mt-2 mb-2">
  <FaCalendarAlt className="mr-1" /> {formatNoticeDate(item.notice_date)} | <FaUsers className="mx-1" /> Audience: {item.audience}
</p>

                <p className="text-xs text-gray-500 font-semibold mb-1 flex items-center">
                  <FaFolder className="mr-1" /> Category: {item.category} | <FaUser className="mx-1" /> Issued By: {item.issued_by}
                </p>
                {item.attachments && (
                  <Link href={item.attachments} className="flex items-center text-red-500 text-sm font-medium hover:underline mt-2">
                    <FaDownload className="mr-2" /> Download PDF
                  </Link>
                )}
              </motion.div>
            );
          })
        )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

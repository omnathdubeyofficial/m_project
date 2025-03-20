"use client";
import { useState, useEffect, useRef } from "react";
import { executeQuery } from "../../../graphqlClient";
import { GET_NOTICE_BOARD_LISTS } from "../../../query/NoticeBoardQuery/fetchNoticeBoard";
import { FaFilePdf } from "react-icons/fa";
import Link from "next/link";
import { FaGraduationCap, FaBookOpen } from "react-icons/fa";
import "./customScrollbar.css";

export default function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [blink, setBlink] = useState(true);
  const [loading, setLoading] = useState(true); // Loading state added
  const contentRefs = useRef({});
  const scrollContainerRef = useRef(null);


  const classes = [
    { name: "Nursery", path: "/results/nursery" },
    { name: "LKG", path: "/results/lkg" },
    { name: "UKG", path: "/results/ukg" },
    { name: "1st", path: "/results/1st" },
    { name: "2nd", path: "/results/2nd" },
    { name: "3rd", path: "/results/3rd" },
    { name: "4th", path: "/results/4th" },
    { name: "5th", path: "/results/5th" },
    { name: "6th", path: "/results/6th" },
    { name: "7th", path: "/results/7th" },
    { name: "8th", path: "/results/8th" },
    { name: "9th", path: "/results/9th" },
    { name: "10th", path: "/results/10th" },
    { name: "11th", path: "/results/11th" },
    { name: "12th", path: "/results/12th" },
  ];
  

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await executeQuery(GET_NOTICE_BOARD_LISTS);
        const allNotices = response.getNoticeBoardLists;
        
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        
        const filteredNotices = allNotices.filter((notice) => {
          const noticeDate = new Date(
            `${notice.notice_date.substring(0, 4)}-${notice.notice_date.substring(4, 6)}-${notice.notice_date.substring(6, 8)}`
          );
          return noticeDate >= oneMonthAgo;
        });
        
        setNotices(filteredNotices);
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setLoading(false); // Data fetching complete
      }
    };

    fetchNotices();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
<div className="w-full h-auto bg-gradient-to-b from-gray-900 via-gray-800 to-gray-800 text-white flex flex-col lg:flex-row items-center lg:p-10 p-4 gap-10">
{/* Left Side - Notice Board */}
      <div className="w-full lg:w-1/2 flex flex-col items-center">
        <h2 className="text-3xl font-semibold mb-0 text-center text-white bg-gray-800 w-full p-4 sticky top-0 z-10">
          Notice Board
        </h2>
        <div 
          ref={scrollContainerRef}
          className="w-full bg-gray-800 p-6 shadow-lg border-t-4 border-gray-300 max-h-[650px] overflow-y-auto custom-scrollbar"
        >
          {/* Loading State */}
          {loading ? (
            <p className="text-center text-yellow-300 text-lg animate-pulse">Loading...</p>
          ) : notices.length === 0 ? (
            <p className="text-center text-gray-400 text-lg">No Notices Available</p>
          ) : (
            <ul className="text-gray-300 divide-y divide-gray-700">
              {notices.map((notice, index) => {
                const isExpanded = expanded === index;
                const noticeDate = new Date(
                  `${notice.notice_date.substring(0, 4)}-${notice.notice_date.substring(4, 6)}-${notice.notice_date.substring(6, 8)}`
                );
                const isNew = noticeDate >= new Date(new Date().setDate(new Date().getDate() - 3));
                
                return (
                  <li key={notice.notice_id} className="p-4 cursor-pointer hover:bg-gray-700 transition-all duration-300 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-blue-400 font-semibold">{notice.notice_date} - {notice.title}</span>
                        {isNew && (
                          <span className={`ml-2 bg-red-500 text-white px-2 py-1 text-xs rounded transition-all duration-500 ${blink ? "opacity-100" : "opacity-0"}`}>
                            New
                          </span>
                        )}
                        <div 
                          ref={(el) => (contentRefs.current[index] = el)}
                          className="overflow-hidden transition-all duration-500"
                          style={{ maxHeight: isExpanded ? `${contentRefs.current[index]?.scrollHeight}px` : "20px" }}
                        >
                          {notice.description}
                        </div>
                        <span
                          className="text-blue-400 hover:underline text-sm transition-all duration-300 ease-in-out block mt-1 cursor-pointer"
                          onClick={() => setExpanded(isExpanded ? null : index)}
                        >
                          {isExpanded ? "Read Less" : "Read More"}
                        </span>
                      </div>
                    </div>
                    <div className="text-gray-400 text-xs mt-2">
                      Category: {notice.category} | Issued By: {notice.issued_by} | Audience: {notice.audience}
                    </div>
                    {notice.attachments && notice.attachments.length > 0 && (
                      <div className="mt-2 flex items-center">
                        <a href={notice.attachments} target="_blank" rel="noopener noreferrer" className="text-yellow-400 flex items-center hover:underline">
                          <FaFilePdf className="mr-1" /> Download PDF
                        </a>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-full lg:w-2/4 flex flex-col bg-gray-800 p-6 shadow-lg items-center ">

      <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
  <FaBookOpen className="text-yellow-400 mr-2" /> Result Board
</h2>      

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full border-t-4 pt-6 border-b-4 pb-5 border-white">
        {classes.map((cls, index) => (
          <Link key={index} href={cls.path} className="group">
            <div className="bg-gray-800 backdrop-blur-md bg-opacity-40 text-white p-6  text-center shadow-md border border-gray-700 
                transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/30">
              <FaGraduationCap className="text-yellow-400 text-3xl mx-auto mb-1 transition-all duration-300 group-hover:rotate-6" />
              <p className="font-medium text-sm">{cls.name}</p>
              <button className="mt-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-3  transition-all duration-300">
                Check Result
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
}

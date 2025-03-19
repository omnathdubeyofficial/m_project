"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { executeQuery } from "../../../graphqlClient";
import { GET_NOTICE_BOARD_LISTS } from "../../../query/NoticeBoardQuery/fetchNoticeBoard";
import { FaFilePdf } from "react-icons/fa";
import "./customScrollbar.css";

export default function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [blink, setBlink] = useState(true);
  const [loading, setLoading] = useState(true); // Loading state added
  const contentRefs = useRef({});
  const scrollContainerRef = useRef(null);

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
    <div className="w-full h-auto bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white flex flex-col lg:flex-row items-center p-10 gap-10">
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
      <div className="w-full lg:w-1/2 flex justify-center">
        <Image 
          src="/img/cheerful-multiracial-group-people-jumping-together-street.png" 
          alt="Notice Board Illustration" 
          width={800} 
          height={600} 
        />
      </div>
    </div>
  );
}

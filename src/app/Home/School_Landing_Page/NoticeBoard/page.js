"use client";
import { useState, useEffect, useRef } from "react";
import { executeQuery } from "../../../graphqlClient";
import { GET_NOTICE_BOARD_LISTS } from "../../../query/NoticeBoardQuery/fetchNoticeBoard";
import { FaFilePdf } from "react-icons/fa";
import "./customScrollbar.css"; // Importing custom scrollbar styles

export default function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [blink, setBlink] = useState(true);
  const contentRefs = useRef({});
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await executeQuery(GET_NOTICE_BOARD_LISTS);
        const allNotices = response.getNoticeBoardLists;
        
        // Filter notices from the last one month
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
    <div className="w-full h-auto bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white flex flex-col items-center p-10">
      <h2 className="text-5xl font-semibold mb-10 text-center text-white">Notice Board</h2>
      <div 
        ref={scrollContainerRef}
        className={`w-full max-w-5xl bg-gray-800 p-6 shadow-lg border border-gray-700 ${notices.length > 4 ? 'max-h-[650px] overflow-y-auto custom-scrollbar' : ''}`}
        style={{ scrollbarWidth: "thin", scrollbarColor: "transparent transparent" }}
        onMouseEnter={(e) => e.currentTarget.style.scrollbarColor = "gray transparent"}
        onMouseLeave={(e) => e.currentTarget.style.scrollbarColor = "transparent transparent"}
      >
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
                      <span 
                        className={`ml-2 bg-red-500 text-white px-2 py-1 text-xs rounded transition-all duration-500 ${blink ? "opacity-100" : "opacity-0"}`}
                      >
                        New
                      </span>
                    )}
                    <div 
                      ref={(el) => (contentRefs.current[index] = el)}
                      className="overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: isExpanded ? `${contentRefs.current[index]?.scrollHeight}px` : "20px"
                      }}
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
                <div className="text-gray-400 text-xs mt-2">Category: {notice.category} | Issued By: {notice.issued_by} | Audience: {notice.audience}</div>
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
      </div>
    </div>
  );
}

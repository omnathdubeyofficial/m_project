"use client";
import { useState, useEffect, useRef } from "react";
import { executeQuery } from "../../../graphqlClient";
import { GET_NOTICE_BOARD_LISTS } from "../../../query/NoticeBoardQuery/fetchNoticeBoard";
import { FaFilePdf } from "react-icons/fa";
import "./customScrollbar.css";

export default function NoticeBoard() {
  const [notices, setNotices] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [blink, setBlink] = useState(true);
  const [loading, setLoading] = useState(true);
  const contentRefs = useRef({});
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await executeQuery(GET_NOTICE_BOARD_LISTS);
        const allNotices = response.getNoticeBoardLists;
        
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
        
        setNotices(filteredNotices);
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();

    const interval = setInterval(fetchNotices, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const year = dateString.substring(0, 4);
    const month = months[parseInt(dateString.substring(4, 6)) - 1];
    const day = dateString.substring(6, 8);
    return `${day} ${month} ${year}`;
  };

  return (
    <div className="w-full h-auto bg-gradient-to-b from-[#F0F4F8] via-[#D9E2EC] to-[#BCCCDC] text-gray-900 flex flex-col items-center p-8 gap-10">
      <div className="max-w-7xl flex flex-col items-center">
        <h2 className="text-4xl font-semibold text-center text-white bg-[#154360] w-full p-6  ">📢 Notice Board</h2>
        <div ref={scrollContainerRef} className="w-full bg-white p-6 shadow-2xl border-t-4 border-[#FFA500] max-h-[700px] overflow-y-auto custom-scrollbar ">
          {loading ? (
            <p className="text-center text-[#1E3A8A] text-lg animate-pulse">Loading...</p>
          ) : notices.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">No Notices Available</p>
          ) : (
            <ul className="text-gray-800 divide-y divide-gray-300">
              {notices.map((notice, index) => {
                const isExpanded = expanded === index;
                const noticeDate = new Date(
                  `${notice.notice_date.substring(0, 4)}-${notice.notice_date.substring(4, 6)}-${notice.notice_date.substring(6, 8)}`
                );
                const isNew = noticeDate >= new Date(new Date().setDate(new Date().getDate() - 3));
                
                return (
                  <li key={notice.notice_id} className="p-6 bg-gray-50 rounded-lg shadow-md mb-5 transition-all duration-300 hover:shadow-lg hover:bg-gray-100">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <span className="text-black font-semibold text-lg">{formatDate(notice.notice_date)} - {notice.title}        {isNew && (
                          <span className={`ml-2 bg-red-600 text-white px-2 py-1 text-xs rounded-full transition-all duration-500 ${blink ? "opacity-100" : "opacity-0"}`}>
                            🔥 New
                          </span>
                        )}</span>
                 
                      </div>
                      <div 
                        ref={(el) => (contentRefs.current[index] = el)}
                        className="overflow-hidden text-[#1E3A8A] transition-all duration-500 mt-3 text-sm leading-relaxed"
                        style={{ maxHeight: isExpanded ? `${contentRefs.current[index]?.scrollHeight}px` : "40px" }}
                      >
                        {notice.description}
                      </div>
                      <span
                        className="text-blue-700 hover:underline text-sm transition-all duration-300 ease-in-out mt-3 cursor-pointer font-medium"
                        onClick={() => setExpanded(isExpanded ? null : index)}
                      >
                        {isExpanded ? "🔽 Read Less" : "🔼 Read More"}
                      </span>
                    </div>
                    <div className="text-gray-600 text-xs mt-4 font-light">
                      📂 Category: {notice.category} | 👤 Issued By: {notice.issued_by} | 🎯 Audience: {notice.audience}
                    </div>
                    {notice.attachments && notice.attachments.length > 0 && (
                      <div className="mt-4 flex items-center">
                        <a href={notice.attachments} target="_blank" rel="noopener noreferrer" className="text-red-700 flex items-center hover:underline text-sm font-medium">
                          <FaFilePdf className="mr-2 text-lg" /> Download PDF
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
    </div>
  );
}

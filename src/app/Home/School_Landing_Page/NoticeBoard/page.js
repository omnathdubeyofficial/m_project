"use client";
import { useState, useEffect, useRef } from "react";

export default function NoticeBoard() {
  const notices = [
    { date: "20240317", subject: "Student Motivation", message: "We continuously strive to ensure students are motivated and appreciated for the work they do which will bring out the best in them. Monthly appreciation certificates in various fields. Eg: Attendance, Aesthetic approach, Weekly performance, etc." },
    { date: "20240315", subject: "Appreciation Program", message: "We continuously strive to ensure students are motivated and appreciated for the work they do which will bring out the best in them. Monthly appreciation certificates in various fields. Eg: Attendance, Aesthetic approach, Weekly performance, etc." },
    { date: "20240310", subject: "Performance Recognition", message: "We continuously strive to ensure students are motivated and appreciated for the work they do which will bring out the best in them. Monthly appreciation certificates in various fields. Eg: Attendance, Aesthetic approach, Weekly performance, etc." },
    { date: "20240228", subject: "Academic Excellence", message: "We continuously strive to ensure students are motivated and appreciated for the work they do which will bring out the best in them. Monthly appreciation certificates in various fields. Eg: Attendance, Aesthetic approach, Weekly performance, etc." }
  ];

  const [expanded, setExpanded] = useState(null);
  const [blink, setBlink] = useState(true);
  const contentRefs = useRef({});

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

  const latestDate = Math.max(...notices.map(n => parseInt(n.date)));

  return (
    <div className="w-full h-auto bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white flex flex-col items-center p-10">
      <h2 className="text-5xl font-bold mb-10 text-center text-yellow-300">Notice Board</h2>
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <ul className="text-gray-300 divide-y divide-gray-700">
          {notices.map((notice, index) => {
            const isNew = parseInt(notice.date) === latestDate;
            const isExpanded = expanded === index;

            return (
              <li 
                key={index} 
                className="p-4 cursor-pointer hover:bg-gray-700 transition-all duration-300 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-yellow-400 font-bold">{formatDate(notice.date)} - {notice.subject}:</span> 
                    <div 
                      ref={(el) => (contentRefs.current[index] = el)}
                      className="overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: isExpanded ? `${contentRefs.current[index]?.scrollHeight}px` : "20px"
                      }}
                    >
                      {notice.message}
                    </div>
                    <span
                      className="text-blue-400 hover:underline text-sm transition-all duration-300 ease-in-out block mt-1 cursor-pointer"
                      onClick={() => setExpanded(isExpanded ? null : index)}
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </span>
                  </div>
                  {isNew && (
                    <span 
                      className={`ml-2 bg-red-500 text-white px-2 py-1 text-xs rounded transition-all duration-500 ${blink ? "opacity-100" : "opacity-0"}`}
                    >
                      New
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

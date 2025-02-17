"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

// Holiday Data Object
const holidays = [
  { title: "New Year", date: "2025-01-01" },
  { title: "Republic Day", date: "2025-01-26" },
  { title: "Holi", date: "2025-03-17" },
  { title: "Good Friday", date: "2025-04-18" },
  { title: "Independence Day", date: "2025-08-15" },
  { title: "Gandhi Jayanti", date: "2025-10-02" },
  { title: "Diwali", date: "2025-10-23" },
  { title: "Christmas", date: "2025-12-25" },
];

const HolidayCalendar = () => {
  const [holidayData] = useState(holidays);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Holiday List</h1>
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-xl border border-gray-200">
        <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={holidayData} />
      </div>
    </div>
  );
};

export default HolidayCalendar;

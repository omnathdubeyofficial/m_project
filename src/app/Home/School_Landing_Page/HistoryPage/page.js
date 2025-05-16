"use client";

// import { useState } from "react";

const academicHistory = {
  "2025-26": "This is the history of the academic year 2025-26. It includes major achievements, milestones, and key events that took place throughout the year.",
};

export default function HistoryPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-300">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Academic Year 2025-26
        </h1>
        <p className="text-gray-700 leading-relaxed">
          {academicHistory["2025-26"]}
        </p>
      </div>
    </div>
  );
}

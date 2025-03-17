"use client";

import { useState } from "react";

const tabs = [
  { name: "School ERP", key: "school_erp" },
  { name: "Mobile App", key: "mobile_app" },
  { name: "E-Learning", key: "e_learning" },
  { name: "Website", key: "website" },
  { name: "Smart Technology", key: "smart_tech" }
];

const services = {
  school_erp: [
    {
      title: "Academics",
      description:
        "In this digital era, from banking to education most things have gone online.",
      icon: "🏫",
      color: "text-yellow-500"
    },
    {
      title: "Administration",
      description:
        "Now those complex and time-consuming day-to-day administrative processes can be handled easily.",
      icon: "📋",
      color: "text-green-500"
    }
  ],
  mobile_app: [
    {
      title: "Mobile Attendance",
      description: "Track and manage attendance with a few clicks on mobile.",
      icon: "📱",
      color: "text-blue-500"
    },
    {
      title: "Student Performance",
      description: "Monitor student progress efficiently.",
      icon: "📊",
      color: "text-purple-500"
    }
  ],
  e_learning: [
    {
      title: "Online Classes",
      description: "Conduct seamless virtual classes.",
      icon: "🎥",
      color: "text-indigo-500"
    },
    {
      title: "Digital Library",
      description: "Access study materials anytime, anywhere.",
      icon: "📚",
      color: "text-red-500"
    }
  ],
  website: [
    {
      title: "School Website",
      description: "Professional website for your institution.",
      icon: "🌐",
      color: "text-green-500"
    }
  ],
  smart_tech: [
    {
      title: "AI-Powered Analytics",
      description: "Get insights using AI-powered reports.",
      icon: "🤖",
      color: "text-orange-500"
    }
  ]
};

export default function Offerings() {
  const [activeTab, setActiveTab] = useState("school_erp");

  return (
    <div className="p-8 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-blue-900">Our Comprehensive Offerings</h2>
      <p className="text-gray-600 mt-2">
        Join the League of India’s most futuristic and comprehensive School
        Management Software that meets all your school-specific needs.
      </p>
      <div className="flex flex-wrap justify-center space-x-4 mt-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-4 py-2 border rounded-full m-2 ${
              activeTab === tab.key ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {services[activeTab].map((service) => (
          <div
            key={service.title}
            className="border rounded-lg p-6 shadow-sm hover:shadow-md transition"
          >
            <div className={`text-4xl ${service.color}`}>{service.icon}</div>
            <h3 className="text-lg font-semibold mt-4">{service.title}</h3>
            <p className="text-gray-600 mt-2 text-sm">{service.description}</p>
            <a href="#" className="text-blue-600 mt-3 inline-block font-semibold">
              Read More →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
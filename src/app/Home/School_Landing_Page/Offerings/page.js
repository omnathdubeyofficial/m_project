"use client";

import { useState } from "react";
import { School, ClipboardList, Smartphone, BarChart, Video, BookOpen, Globe, Bot } from "lucide-react";

const tabs = [
  { name: "School ERP", key: "school_erp", bg: "bg-purple-900", image: "/img/classroom-5405427_1280.png" },
  { name: "Mobile App", key: "mobile_app", bg: "bg-blue-900", image: "/img/books-436512_1920.jpg" },
  { name: "E-Learning", key: "e_learning", bg: "bg-indigo-900", image: "/img/street-2805643.jpg" },
  { name: "Website", key: "website", bg: "bg-green-900", image: "/img/ai-generated-8706224_1280.png" },
  { name: "Smart Technology", key: "smart_tech", bg: "bg-gray-900", image: "/img/ai-generated-9010764_1920.jpg" }
];

const services = {
  school_erp: [
    { title: "Academics", description: "Bring education into the digital age with our School ERP.", icon: <School size={40} className="text-white mx-auto" /> },
    { title: "Administration", description: "Simplify and streamline administrative tasks.", icon: <ClipboardList size={40} className="text-white mx-auto" /> }
  ],
  mobile_app: [
    { title: "Mobile Attendance", description: "Mark attendance easily through mobile.", icon: <Smartphone size={40} className="text-white mx-auto" /> },
    { title: "Student Performance", description: "Track student progress effectively.", icon: <BarChart size={40} className="text-white mx-auto" /> }
  ],
  e_learning: [
    { title: "Online Classes", description: "Seamless and efficient virtual learning.", icon: <Video size={40} className="text-white mx-auto" /> },
    { title: "Digital Library", description: "Access study materials anytime, anywhere.", icon: <BookOpen size={40} className="text-white mx-auto" /> }
  ],
  website: [
    { title: "School Website", description: "Professional website for your institution.", icon: <Globe size={40} className="text-white mx-auto" /> }
  ],
  smart_tech: [
    { title: "AI-Powered Analytics", description: "Gain insights with AI-driven reports.", icon: <Bot size={40} className="text-white mx-auto" /> }
  ]
};

export default function Offerings() {
  const [activeTab, setActiveTab] = useState("school_erp");
  const activeTabData = tabs.find(tab => tab.key === activeTab) || tabs[0];

  return (
    <div 
      className="w-full min-h-screen flex justify-center items-center transition-all duration-500 text-white relative"
      style={{ backgroundImage: `url(${activeTabData.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="p-8 py-24 max-w-6xl w-full text-left relative z-10">
        <h2 className="text-5xl font-semibold text-white">Vaekon School - The Future of Digital Education</h2>
        <p className="text-2xl text-white mt-4">
          Join India’s most advanced and comprehensive School Management Software that fulfills all your institutional needs.
        </p>
        <div className="overflow-x-auto flex space-x-4 mt-6 pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`px-4 py-2 border whitespace-nowrap rounded-full transition-all duration-300 ease-in-out transform ${
                activeTab === tab.key ? "bg-white text-black" : "border-white text-white"
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
              className="border p-6 shadow-md  hover:bg-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105 text-left"
            >
              <div className="flex items-start">
                <div className="text-4xl mr-3">{service.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                  <p className="text-white mt-2 text-sm">{service.description}</p>
                  <a href="#" className="text-white mt-3 inline-block font-semibold">
                    Read More →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

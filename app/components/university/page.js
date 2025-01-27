"use client";

import { useEffect, useState } from 'react';
import { FaBuilding, FaChalkboardTeacher, FaBookOpen, FaUserFriends, FaClipboardList, FaCalendarAlt } from 'react-icons/fa';
import Image from 'next/image'; 
const UniversityPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data or set static data
    const userData = {
      profileImg: '/img/om.webp', // Replace with actual image path
      username: 'Omnath Dubey',
      profession: 'Super Admin',
      userId: '123456',
    };
    setUser(userData);
  }, []);

  const services = [
    { name: "List of Holiday", description: "Details of all university holidays." },
    { name: "Phone Directory", description: "Contact information of university staff." },
    { name: "Academic Calendar", description: "Important academic dates and events." },
    { name: "Registration for Membership of Court Sabha", description: "Process for registration for membership." },
    { name: "Yuva Mahotsav", description: "Details about the youth festival." },
    { name: "Affiliation", description: "University affiliation and related details." },
    { name: "Sport Council", description: "Information regarding sports and activities." },
    { name: "Vishwavidyalaya Masik e-Patrika", description: "Monthly university newsletter." },
    { name: "University Health Center", description: "Services provided by the university health center." },
    { name: "Sanitizing Support Service & Gardening", description: "Cleaning and gardening services on campus." },
    { name: "Women Grievance & Welfare Cell", description: "Support for women's welfare and grievances." },
    { name: "Begum Akhtar Bhartiya Sangeet Kala Akademi", description: "Music and arts academy details." },
    { name: "Hostel Admin", description: "Hostel administration and management." },
    { name: "Convocation", description: "Details about upcoming convocations." },
    { name: "Placement Cell", description: "Placement opportunities for students." },
    { name: "Central Library", description: "Information about the central library and services." },
    { name: "Proceedings of Meetings", description: "Records of meetings and discussions." },
    { name: "Affiliated Colleges", description: "Information about colleges affiliated with the university." },
    { name: "Practical Marks Entry", description: "Process for entering practical exam marks." },
    { name: "Absent / UFM Entry", description: "Procedure for entering absentee and UFM records." },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-gray-100">
      <div className="w-full max-w-6xl p-8 bg-white shadow-2xl rounded-2xl">
        
        {/* Profile Section */}
        {user && (
          <div className="flex flex-col items-center mb-8 space-y-4">
            <Image
              src={user.profileImg}
              alt="Profile"
              width={96} // equivalent to 24rem (adjust based on your preference)
              height={96} // equivalent to 24rem (adjust based on your preference)
              className="w-24 h-24 rounded-full border-2 border-gray-300"
            />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">{user.username}</h2>
              <p className="text-gray-600">{user.profession}</p>
              <p className="text-gray-500">User ID: {user.userId}</p>
            </div>
          </div>
        )}

        {/* University Services Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
            >
              <FaBuilding className="text-3xl text-blue-800" />
              <h3 className="text-xl font-bold text-blue-800 mt-4">{service.name}</h3>
              <p className="text-gray-700 mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityPage;

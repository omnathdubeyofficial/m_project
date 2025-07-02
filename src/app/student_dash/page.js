
"use client";
import { useState } from 'react';
import { User, ClipboardList, BookOpen, Calendar, Medal, Users, FileCheck, Edit, Send, Library, MessageSquare, Book, FileText, Clock, Award, Bell, HelpCircle, Settings, UserCheck, Star, File, BookMarked, GraduationCap, Briefcase, Paperclip } from 'lucide-react';
import Link from 'next/link';
import { FaSignOutAlt, FaArrowLeft, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { LOGOUT_MUTATION } from '../mutation/logoutMutation/logoutMutation';
import { executeQuery, executeMutation } from '../graphqlClient';
import { useRouter } from 'next/navigation';
// Sample student profile data
const studentProfile = {
  name: "John Doe",
  id: "ST12345",
  grade: "10th",
  email: "john.doe@example.com",
  profilePicture: "https://via.placeholder.com/150",
};

// Expanded menu items for school-related features
const menuItems = [
  { name: "Dashboard", icon: Book, path: "/student/dashboard" },
  { name: "Attendance", icon: ClipboardList, path: "/student/attendance" },
  { name: "Grades", icon: BookOpen, path: "/student/grades" },
  { name: "Assignments", icon: FileCheck, path: "/student/assignments" },
  { name: "Calendar", icon: Calendar, path: "/student/calendar" },
  { name: "Achievements", icon: Medal, path: "/student/achievements" },
  { name: "Clubs", icon: Users, path: "/student/clubs" },
  { name: "Library", icon: Library, path: "/student/library" },
  { name: "Messages", icon: MessageSquare, path: "/student/messages" },
  { name: "Exams", icon: FileText, path: "/student/exams" },
  { name: "Timetable", icon: Clock, path: "/student/timetable" },
  { name: "Certificates", icon: Award, path: "/student/certificates" },
  { name: "Notifications", icon: Bell, path: "/student/notifications" },
  { name: "Help", icon: HelpCircle, path: "/student/help" },
  { name: "Settings", icon: Settings, path: "/student/settings" },
  { name: "Profile", icon: UserCheck, path: "/student/profile" },
  { name: "Feedback", icon: Star, path: "/student/feedback" },
  { name: "Resources", icon: File, path: "/student/resources" },
  { name: "Study Plans", icon: BookMarked, path: "/student/study-plans" },
  { name: "Career Guidance", icon: Briefcase, path: "/student/career" },
  { name: "Exams History", icon: GraduationCap, path: "/student/exams-history" },
];

// Sample teacher data with subjects
const teachers = [
  { name: "Mr. Smith", subject: "Math" },
  { name: "Ms. Johnson", subject: "Science" },
  { name: "Mrs. Brown", subject: "English" },
  { name: "Mr. Davis", subject: "History" },
  { name: "Ms. Wilson", subject: "Geography" },
];

// Sample chat messages for each teacher with file support and unread status
const initialChatData = {
  "Mr. Smith": {
    messages: [
      { sender: "Mr. Smith", type: "text", content: "Hi John, please submit your Math assignment by tomorrow.", timestamp: "2025-07-02T10:00:00" },
      { sender: "John", type: "text", content: "Sure, I'll submit it by tonight.", timestamp: "2025-07-02T10:05:00" },
      { sender: "Mr. Smith", type: "file", content: { name: "Math_Assignment.pdf", url: "https://via.placeholder.com/math.pdf" }, timestamp: "2025-07-02T10:10:00" },
    ],
    unread: true,
  },
  "Ms. Johnson": {
    messages: [
      { sender: "Ms. Johnson", type: "text", content: "John, great work on the Science project!", timestamp: "2025-07-02T09:00:00" },
      { sender: "John", type: "text", content: "Thanks, Ms. Johnson!", timestamp: "2025-07-02T09:05:00" },
    ],
    unread: false,
  },
  "Mrs. Brown": { messages: [], unread: false },
  "Mr. Davis": { messages: [], unread: false },
  "Ms. Wilson": { messages: [], unread: false },
};

export default function StudentDashboard() {
   const router = useRouter();
  const [selectedTeacher, setSelectedTeacher] = useState(teachers[0].name);
  const [chatMessages, setChatMessages] = useState(initialChatData);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState('');
    const [isError, setIsError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  // Handle sending text messages
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages((prev) => ({
        ...prev,
        [selectedTeacher]: {
          messages: [
            ...prev[selectedTeacher].messages,
            { sender: "John", type: "text", content: newMessage, timestamp: new Date().toISOString() },
          ],
          unread: false,
        },
      }));
      setNewMessage("");
    }
  };

    const onLogout = async () => {
      try {
        const response = await executeMutation(LOGOUT_MUTATION);
        const message = response?.logout?.message;
  
        if (message) {
          // Success popup
          setIsError(false);
          setLogoutMessage(message);
          setShowPopup(true);
  
          localStorage.removeItem('auth_token');
  
          setTimeout(() => {
            setShowPopup(false);
            router.push('/login');
          }, 5000);
        }
      } catch (error) {
        // Error popup
        setIsError(true);
        setLogoutMessage('Logout failed. Please try again.');
        setShowPopup(true);
  
        setTimeout(() => {
          setShowPopup(false);
        }, 5000);
  
        console.error('Logout failed:', error);
      }
    };

  // Handle file selection (simulated)
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setChatMessages((prev) => ({
        ...prev,
        [selectedTeacher]: {
          messages: [
            ...prev[selectedTeacher].messages,
            {
              sender: "John",
              type: "file",
              content: { name: file.name, url: URL.createObjectURL(file) },
              timestamp: new Date().toISOString(),
            },
          ],
          unread: false,
        },
      }));
      setSelectedFile(null);
      e.target.value = null; // Reset file input
    }
  };

  // Clear unread status when selecting a teacher
  const handleTeacherSelect = (teacherName) => {
    setSelectedTeacher(teacherName);
    setChatMessages((prev) => ({
      ...prev,
      [teacherName]: {
        ...prev[teacherName],
        unread: false,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 sm:pt-32 pb-10">
        {showPopup && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 
          ${isError ? 'bg-red-500' : 'bg-emerald-500'} 
          text-white px-4 py-3 rounded-xl shadow-lg z-50 w-auto max-w-md animate-fade-in`}
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">
              {isError ? (
                <FaTimesCircle className="text-white drop-shadow-sm" />
              ) : (
                <FaCheckCircle className="text-white drop-shadow-sm" />
              )}
            </div>
            <div className="flex-1">
              <div className="text-sm sm:text-base font-medium tracking-wide">
                {logoutMessage}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Main Container with Constrained Width */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar: Menu Items */}
          <div className="lg:w-3/12 w-full bg-white p-6 shadow-lg rounded-lg h-[calc(100vh-6rem)] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Menu</h2>
            <div className="flex flex-col gap-2">
              {menuItems.map((item, index) => (
                <Link href={item.path} key={index}>
                  <div className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors duration-200">
                    <item.icon className="w-6 h-6 mr-3 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Center: Chat Section */}
          <div className="lg:w-6/12 w-full bg-white p-6 rounded-lg shadow-lg h-[calc(100vh-6rem)] flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-_die4 flex items-center">
              <MessageSquare className="w-6 h-6 mr-2 text-blue-600" /> Chat with Teachers
            </h2>
            {/* Teacher Profile */}
            <div className="mb-4 p-4 bg-gray-50 rounded-lg flex items-center">
              <img
                src="https://via.placeholder.com/50"
                alt="Teacher Profile"
                className="w-12 h-12 rounded-full mr-3 border-2 border-blue-100"
              />
              <div>
                <p className="font-semibold text-gray-800">{selectedTeacher}</p>
                <p className="text-sm text-gray-600">{teachers.find((t) => t.name === selectedTeacher).subject}</p>
              </div>
            </div>
            {/* Teacher Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Select Teacher</label>
              <select
                value={selectedTeacher}
                onChange={(e) => handleTeacherSelect(e.target.value)}
                className="w-full p-3 border rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {teachers.map((teacher) => (
                  <option key={teacher.name} value={teacher.name}>
                    {teacher.name} ({teacher.subject})
                    {chatMessages[teacher.name].unread ? ' ●' : ''}
                  </option>
                ))}
              </select>
            </div>
            {/* Chat Messages */}
            <div className="flex-1 h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
              {chatMessages[selectedTeacher].messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 p-3 rounded-lg max-w-[70%] ${
                    msg.sender === "John"
                      ? "bg-blue-100 ml-auto text-right"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <p className="font-semibold text-gray-800">{msg.sender}</p>
                  {msg.type === "text" ? (
                    <p className="text-gray-600">{msg.content}</p>
                  ) : (
                    <a
                      href={msg.content.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline flex items-center"
                    >
                      <File className="w-4 h-4 mr-1" />
                      {msg.content.name}
                    </a>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                </div>
              ))}
            </div>
            {/* Message Input and File Upload */}
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
              />
              <label className="p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center cursor-pointer">
                <Paperclip className="w-5 h-5" />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </label>
              <button
                onClick={handleSendMessage}
                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Sidebar: Profile Card */}
          <div className="lg:w-3/12 w-full bg-white p-6 shadow-lg rounded-lg h-[calc(100vh-6rem)] flex flex-col items-center justify-center">
            <img
              src={studentProfile.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4 border-2 border-blue-100"
            />
            <h2 className="text-xl font-bold text-gray-800">{studentProfile.name}</h2>
            <p className="text-gray-600 text-sm">Student ID: {studentProfile.id}</p>
            <p className="text-gray-600 text-sm">Grade: {studentProfile.grade}</p>
            <p className="text-gray-600 text-sm">Email: {studentProfile.email}</p>
            <Link href="/ProfilePage_Management/Admin_Profile">
              <button className="mt-6 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Edit className="w-5 h-5 mr-2" /> Edit Profile
              </button>
            </Link>
            <button
              onClick={onLogout}
              className="mt-4 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              <FaSignOutAlt />
              Logout
            </button>
      </div>
          </div>
        </div>
      </div>
  );
}

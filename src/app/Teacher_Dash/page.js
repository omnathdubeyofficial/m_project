"use client";
import { useState } from 'react';
import { User, ClipboardList, BookOpen, Calendar, Users, FileCheck, Edit, Send, Library, MessageSquare, Book, FileText, Clock, Bell, HelpCircle, Settings, UserCheck, Star, File, BookMarked, GraduationCap, Briefcase, Paperclip } from 'lucide-react';
import Link from 'next/link';
import { FaSignOutAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { LOGOUT_MUTATION } from '../mutation/logoutMutation/logoutMutation';
import { executeMutation } from '../graphqlClient';
import { useRouter } from 'next/navigation';
import { LayoutDashboard } from 'lucide-react';
import Image from 'next/image';

// Sample teacher profile data
const teacherProfile = {
  name: "Mr. Smith",
  id: "TCH001",
  email: "smith@example.com",
  subject: "Mathematics",
  profilePicture: "https://images.pexels.com/photos/6147153/pexels-photo-6147153.jpeg",
};

// Menu items tailored for teachers
const menuItems = [
  { name: "Dashboard", icon: Book, path: "/Teacher_Dash/Teacher_Dashboard" },
  { name: "Student Attendance", icon: ClipboardList, path: "/Teacher_Dash/StudentAttendance" },
  { name: "Grade Management", icon: BookOpen, path: "/teacher/grades" },
  { name: "Assignments", icon: FileCheck, path: "/teacher/assignments" },
  { name: "School Calendar", icon: Calendar, path: "/teacher/calendar" },
  { name: "Class Activities", icon: Users, path: "/teacher/activities" },
  { name: "Library Records", icon: Library, path: "/teacher/library" },
  { name: "Messages", icon: MessageSquare, path: "/teacher/messages" },
  { name: "Exam Schedule", icon: FileText, path: "/teacher/exams" },
  { name: "Timetable", icon: Clock, path: "/teacher/timetable" },
  { name: "Notifications", icon: Bell, path: "/teacher/notifications" },
  { name: "Help & Support", icon: HelpCircle, path: "/teacher/help" },
  { name: "Settings", icon: Settings, path: "/teacher/settings" },
  { name: "Profile", icon: UserCheck, path: "/teacher/profile" },
  { name: "Feedback", icon: Star, path: "/teacher/feedback" },
];

// Sample contacts (students, parents, admin team) for chat
const contacts = [
  { name: "Veer Mishra (Student)", type: "student", id: "STU001", profilePicture: "https://images.pexels.com/photos/4815046/pexels-photo-4815046.jpeg" },
  { name: "Mrs. Mishra (Parent)", type: "parent", id: "PAR001", profilePicture: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg" },
  { name: "Admin Team", type: "admin", id: "ADM001", profilePicture: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" },
  { name: "John Doe (Student)", type: "student", id: "STU002", profilePicture: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg" },
  { name: "Ms. Doe (Parent)", type: "parent", id: "PAR002", profilePicture: "https://images.pexels.com/photos/845434/pexels-photo-845434.jpeg" },
];

// Sample chat messages for each contact
const initialChatData = {
  "Veer Mishra (Student)": {
    messages: [
      { sender: "Mr. Smith", type: "text", content: "Hi Veer, please submit your Math assignment by tomorrow.", timestamp: "2025-07-02T10:00:00" },
      { sender: "Veer Mishra (Student)", type: "text", content: "Thanks for the reminder, I'll submit it.", timestamp: "2025-07-02T10:05:00" },
      { sender: "Mr. Smith", type: "file", content: { name: "Math_Assignment.pdf", url: "https://via.placeholder.com/math.pdf" }, timestamp: "2025-07-02T10:10:00" },
    ],
    unread: true,
  },
  "Mrs. Mishra (Parent)": {
    messages: [
      { sender: "Mr. Smith", type: "text", content: "Mrs. Mishra, Veer is doing well in Math!", timestamp: "2025-07-02T09:00:00" },
      { sender: "Mrs. Mishra (Parent)", type: "text", content: "Thank you for the update!", timestamp: "2025-07-02T09:05:00" },
    ],
    unread: false,
  },
  "Admin Team": {
    messages: [
      { sender: "Admin Team", type: "text", content: "Please submit the quarterly report by Friday.", timestamp: "2025-07-02T08:00:00" },
    ],
    unread: true,
  },
  "John Doe (Student)": { messages: [], unread: false },
  "Ms. Doe (Parent)": { messages: [], unread: false },
};

export default function TeacherDashboard() {
  const router = useRouter();
  const [selectedContact, setSelectedContact] = useState(contacts[0].name);
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
        [selectedContact]: {
          messages: [
            ...prev[selectedContact].messages,
            { sender: "Mr. Smith", type: "text", content: newMessage, timestamp: new Date().toISOString() },
          ],
          unread: false,
        },
      }));
      setNewMessage("");
    }
  };

  // Handle logout
  const onLogout = async () => {
    try {
      const response = await executeMutation(LOGOUT_MUTATION);
      const message = response?.logout?.message;

      if (message) {
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
      setIsError(true);
      setLogoutMessage('Logout failed. Please try again.');
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 5000);

      console.error('Logout failed:', error);
    }
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setChatMessages((prev) => ({
        ...prev,
        [selectedContact]: {
          messages: [
            ...prev[selectedContact].messages,
            {
              sender: "Mr. Smith",
              type: "file",
              content: { name: file.name, url: URL.createObjectURL(file) },
              timestamp: new Date().toISOString(),
            },
          ],
          unread: false,
        },
      }));
      setSelectedFile(null);
      e.target.value = null;
    }
  };

  // Clear unread status when selecting a contact
  const handleContactSelect = (contactName) => {
    setSelectedContact(contactName);
    setChatMessages((prev) => ({
      ...prev,
      [contactName]: {
        ...prev[contactName],
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
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-2">
          {/* Left Sidebar: Menu Items */}
          <div className="lg:w-3/12 w-full h-[calc(100vh-6rem)] px-4 py-6 bg-white/60 backdrop-blur-lg border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl overflow-y-auto transition-all duration-300">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6 flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6 text-blue-700" />
              Teacher Menu
            </h2>
            <div className="flex flex-col space-y-3">
              {menuItems.map((item, index) => (
                <Link href={item.path} key={index}>
                  <div className="group flex items-center gap-4 px-4 py-3 rounded-md bg-white hover:bg-blue-50 transition-colors shadow hover:shadow-md cursor-pointer">
                    <item.icon className="w-6 h-6 text-blue-600 group-hover:text-blue-800 transition duration-200" />
                    <span className="text-[15px] font-medium text-gray-800 group-hover:text-blue-900">
                      {item.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* Center: Chat Section */}
          <div className="lg:w-6/12 w-full h-[calc(100vh-6rem)] bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-4 flex flex-col border border-gray-200 transition-all">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              Chat with Students, Parents, and Admins
            </h2>
            {/* Selected Contact Profile */}
            <div className="mb-2 flex items-center gap-4 p-2 bg-blue-50/50 rounded-xl shadow-sm border border-blue-100">
              <Image
                src={contacts.find((c) => c.name === selectedContact).profilePicture}
                alt="Contact Profile"
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border-2 border-white shadow-md"
              />
              <div>
                <p className="text-base font-semibold text-gray-800">{selectedContact}</p>
                <p className="text-sm text-gray-600">{contacts.find((c) => c.name === selectedContact).type} <span>ID: {contacts.find((c) => c.name === selectedContact).id}</span></p>
              </div>
            </div>
            {/* Contact Selection Dropdown */}
            <div className="mb-2">
              <label className="block text-gray-700 font-medium mb-2">Select Contact</label>
              <select
                value={selectedContact}
                onChange={(e) => handleContactSelect(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                {contacts.map((contact) => (
                  <option key={contact.id} value={contact.name}>
                    {contact.name} ({contact.type}){chatMessages[contact.name].unread ? ' ●' : ''}
                  </option>
                ))}
              </select>
            </div>
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto bg-gray-50 rounded-xl p-4 border border-gray-200 space-y-3">
              {chatMessages[selectedContact].messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl text-sm shadow-sm max-w-[75%] break-words whitespace-pre-wrap word-break break-all ${
                    msg.sender === "Mr. Smith"
                      ? "ml-auto bg-blue-100 text-right"
                      : "bg-white border"
                  }`}
                >
                  <p className="font-semibold text-blue-800">{msg.sender}</p>
                  {msg.type === "text" ? (
                    <p className="text-gray-700 mt-1 break-words whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <a
                      href={msg.content.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline flex items-center justify-start mt-1"
                    >
                      <File className="w-4 h-4 mr-1" />
                      {msg.content.name}
                    </a>
                  )}
                  <p className="text-[11px] text-gray-500 mt-2">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
            {/* Message Input Area */}
            <div className="mt-4 flex gap-1 items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="p-3 bg-gray-200 text-gray-700 rounded-xl cursor-pointer hover:bg-gray-300 transition-colors duration-200 flex items-center">
                <Paperclip className="w-5 h-5" />
                <input type="file" className="hidden" onChange={handleFileSelect} />
              </label>
              <button
                onClick={handleSendMessage}
                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          {/* Right Sidebar: Profile Card */}
          <div className="lg:w-3/12 w-full bg-white/70 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-6 h-[calc(100vh-6rem)] flex flex-col items-center transition-all duration-300">
            <div className="flex flex-col items-center justify-center mb-4">
              <Image
                src={teacherProfile.profilePicture}
                alt="Profile"
                width={144}
                height={144}
                priority
                unoptimized={false}
                className="w-36 h-36 rounded-full border-4 border-white shadow-md object-cover"
              />
              <h2 className="text-2xl font-semibold text-blue-900 mt-4">{teacherProfile.name}</h2>
            </div>
            <div className="w-full space-y-3 text-sm text-gray-700">
              <div className="flex items-left gap-1 bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-100">
                <span className="text-blue-600 font-semibold">Teacher ID:</span>
                <span className="text-gray-800 font-medium">{teacherProfile.id}</span>
              </div>
              <div className="flex items-left gap-1 bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-100">
                <span className="text-blue-600 font-semibold">Email:</span>
                <span className="text-gray-800 font-medium">{teacherProfile.email}</span>
              </div>
              <div className="flex items-left gap-1 bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-100">
                <span className="text-blue-600 font-semibold">Subject:</span>
                <span className="text-gray-800 font-medium">{teacherProfile.subject}</span>
              </div>
            </div>
            <Link href="/teacher/profile" className="w-full mt-6">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-sm">
                <Edit className="w-5 h-5" /> Edit Profile
              </button>
            </Link>
            <button
              onClick={onLogout}
              className="w-full mt-4 flex items-center justify-center gap-2 bg-red-500 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-red-600 transition-colors duration-200 shadow-sm"
            >
              <FaSignOutAlt className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
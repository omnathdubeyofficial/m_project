"use client";
import {
  Users,
  BookOpen,
  Calendar,
  FileText,
  MessageSquare,
  PieChart,
  Settings,
} from "lucide-react";

const stats = [
  { title: "My Classes", value: 6, icon: BookOpen },
  { title: "Students", value: 120, icon: Users },
  { title: "Upcoming Lectures", value: 4, icon: Calendar },
  { title: "Assignments", value: 12, icon: FileText },
  { title: "Messages", value: 7, icon: MessageSquare },
  { title: "Performance", value: "82%", icon: PieChart },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Teacher Dashboard</h1>
        <p className="text-gray-600">Monitor your classes, students, and activities</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 shadow-md rounded-2xl p-5 flex items-center justify-between transition hover:shadow-lg"
          >
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-blue-800">{stat.value}</p>
            </div>
            <div className="bg-blue-100 text-blue-700 p-3 rounded-full">
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Upcoming Schedule */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 lg:col-span-2">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Upcoming Lectures</h2>
          <ul className="space-y-4 text-gray-700 text-sm">
            <li className="flex justify-between">
              <span>📘 Math - Algebra</span>
              <span>9:00 AM - 10:00 AM</span>
            </li>
            <li className="flex justify-between">
              <span>🧪 Science - Chemistry</span>
              <span>11:00 AM - 12:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>📖 English Grammar</span>
              <span>1:00 PM - 2:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Right: Quick Settings */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Quick Settings</h2>
          <ul className="text-sm text-gray-700 space-y-3">
            <li className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
              <Settings className="w-4 h-4" /> Update Profile
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
              <FileText className="w-4 h-4" /> Manage Assignments
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
              <MessageSquare className="w-4 h-4" /> Open Messages
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

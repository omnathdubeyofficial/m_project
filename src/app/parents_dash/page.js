// pages/ParentsDashboard.js
"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ClipboardList, BookOpen, MessageSquare, Calendar, Medal, Users, FileCheck, AlertCircle, FileX } from 'lucide-react';
// // import Navber from "../navbar/page";

const sampleData = [
  { name: 'Jan', Attendance: 20 },
  { name: 'Feb', Attendance: 18 },
  { name: 'Mar', Attendance: 22 },
  { name: 'Apr', Attendance: 19 },
  { name: 'May', Attendance: 21 },
  { name: 'Jan', Attendance: 20 },
  { name: 'Feb', Attendance: 18 },
  { name: 'Mar', Attendance: 22 },
  { name: 'Apr', Attendance: 19 },
  { name: 'May', Attendance: 21 },
];

export default function ParentsDashboard() {

  return (
    <div className="min-h-screen bg-gray-100 p-4 pt-44">

  
      {/* Main Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Attendance Overview */}
        <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2 relative z-0 h-full flex flex-col">
  <h2 className="text-lg font-semibold mb-2">Attendance Overview</h2>
  <div className="flex-grow">
    <ResponsiveContainer width="100%" height={250} minHeight={200}>
      <BarChart data={sampleData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Attendance" fill="#4F46E5" />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>


        {/* Notifications */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <ul className="mt-2 text-sm">
            <li className="border-b py-2">Your child was absent on Feb 10.</li>
            <li className="border-b py-2">Parent-teacher meeting on Mar 5.</li>
            <li className="py-2">Exam results available.</li>
          </ul>
        </div>
      </div>

      {/* Additional Parent Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold flex items-center gap-2"><ClipboardList className="w-5 h-5" /> Homework</h2>
          <p className="mt-2 text-sm">Latest assignments uploaded by teachers.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold flex items-center gap-2"><BookOpen className="w-5 h-5" /> Study Materials</h2>
          <p className="mt-2 text-sm">Access e-books and class notes.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold flex items-center gap-2"><MessageSquare className="w-5 h-5" /> Messages</h2>
          <p className="mt-2 text-sm">Communicate with teachers and school staff.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Calendar className="w-5 h-5" /> School Events</h2>
          <p className="mt-2 text-sm">Upcoming events and activities for students.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Medal className="w-5 h-5" /> Achievements</h2>
          <p className="mt-2 text-sm">Awards and recognitions received by your child.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Users className="w-5 h-5" /> Teachers & Staff</h2>
          <p className="mt-2 text-sm">Details of teachers and school staff members.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold flex items-center gap-2"><FileCheck className="w-5 h-5" /> Exam Results</h2>
          <p className="mt-2 text-sm">View your child exam scores and progress.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold flex items-center gap-2"><AlertCircle className="w-5 h-5" /> Complaints</h2>
          <p className="mt-2 text-sm">Submit and track complaints regarding school issues.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold flex items-center gap-2"><FileX className="w-5 h-5" /> Disciplinary Reports</h2>
          <p className="mt-2 text-sm">Check if your child has any disciplinary actions.</p>
        </div>
      </div>
    </div>
  );
}

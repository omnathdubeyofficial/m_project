// pages/StudentDashboard.js
"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { ClipboardList, BookOpen, MessageSquare, Calendar, Medal, Users, FileCheck, AlertCircle } from 'lucide-react';
import Navber from "../navbar/page";

const attendanceData = [
  { name: 'Jan', Attendance: 20 },
  { name: 'Feb', Attendance: 18 },
  { name: 'Mar', Attendance: 22 },
  { name: 'Apr', Attendance: 19 },
  { name: 'May', Attendance: 21 },
  { name: 'Jun', Attendance: 23 },
  { name: 'Jul', Attendance: 25 },
  { name: 'Aug', Attendance: 20 },
  { name: 'Sep', Attendance: 22 },
  { name: 'Oct', Attendance: 19 },
  { name: 'Nov', Attendance: 21 },
  { name: 'Dec', Attendance: 24 },
];

const progressData = [
  { name: 'Math', score: 85 },
  { name: 'Science', score: 90 },
  { name: 'English', score: 75 },
  { name: 'History', score: 80 },
  { name: 'Geography', score: 88 },
];

const gradeDistribution = [
  { name: 'A', value: 40 },
  { name: 'B', value: 35 },
  { name: 'C', value: 15 },
  { name: 'D', value: 10 },
];

const assignmentCompletion = [
  { name: 'Completed', value: 70 },
  { name: 'Pending', value: 30 },
];

const feesData = [
  { name: 'Paid', value: 60 },
  { name: 'Due', value: 40 },
];

const subjectPerformance = [
  { subject: 'Math', score: 85 },
  { subject: 'Science', score: 90 },
  { subject: 'English', score: 75 },
  { subject: 'History', score: 80 },
  { subject: 'Geography', score: 88 },
];

const activityData = [
  { name: 'Sports', count: 5 },
  { name: 'Music', count: 3 },
  { name: 'Dance', count: 4 },
  { name: 'Art', count: 2 },
  { name: 'Debate', count: 3 },
];

const behaviorData = [
  { name: 'Warnings', count: 2 },
  { name: 'Positive Behavior', count: 8 },
  { name: 'Attendance Impact', count: 6 },
];

const COLORS = ['#4CAF50', '#FF9800', '#F44336', '#2196F3'];

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 pt-24">
      {/* <Navber/> */}
      
      {/* Main Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Attendance Overview */}
        <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Attendance Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Attendance" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Fees & Payment Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={feesData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                {feesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Student Progress */}
        <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Student Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#4F46E5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Grade Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={gradeDistribution} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                {gradeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Performance */}
        <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Subject Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectPerformance}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="Score" dataKey="score" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Assignment Completion Rate</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={assignmentCompletion} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                {assignmentCompletion.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        

        <div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Activity & Extra-Curricular Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#FF9800" />
            </BarChart>
          </ResponsiveContainer>
        </div>

<div className="bg-white p-4 rounded-lg shadow-md col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Behavior & Discipline Report</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={behaviorData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#FF9800" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

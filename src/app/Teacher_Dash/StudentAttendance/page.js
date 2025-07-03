"use client";
import { useState, useMemo, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CalendarDays, CheckCircle, XCircle, Download, Sun, Moon } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, isValid } from "date-fns";

// Class List
const classList = [
  { id: "nursery", label: "Nursery" },
  { id: "lkg", label: "LKG" },
  { id: "ukg", label: "UKG" },
  { id: "1", label: "Class 1" },
  { id: "2", label: "Class 2" },
  { id: "3", label: "Class 3" },
  { id: "4", label: "Class 4" },
  { id: "5", label: "Class 5" },
  { id: "6", label: "Class 6" },
  { id: "7", label: "Class 7" },
  { id: "8", label: "Class 8" },
  { id: "9", label: "Class 9" },
  { id: "10", label: "Class 10" },
  { id: "11", label: "Class 11" },
  { id: "12", label: "Class 12" },
];

// Generate Dummy Data
function genStudents(count, offset = 1) {
  return Array.from({ length: count }, (_, i) => ({
    roll: i + offset,
    name: `Student ${i + offset}`,
  }));
}

function genAttendance(days = 7, presentBase = 20) {
  return Array.from({ length: days }, (_, i) => ({
    date: format(new Date(2025, 6, i + 1), "MMM d"),
    present: presentBase + Math.floor(Math.random() * 10),
  }));
}

const sampleStudents = Object.fromEntries(
  classList.map((cls, idx) => [cls.id, genStudents(5 + idx, 1)])
);
const sampleAttendanceData = Object.fromEntries(
  classList.map((cls, idx) => [cls.id, genAttendance(7, 18 + idx)])
);

// Toast Notification Component
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white z-50 ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      } md:text-base text-sm`}
    >
      {message}
    </div>
  );
}

export default function StudentAttendancePage() {
  const [selectedClass, setSelectedClass] = useState("nursery");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load attendance from localStorage
  useEffect(() => {
    setIsLoading(true);
    try {
      const saved = localStorage.getItem("attendance");
      if (saved) {
        setAttendance(JSON.parse(saved));
      }
    } catch (error) {
      setToast({ message: "Error loading attendance data", type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save attendance to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("attendance", JSON.stringify(attendance));
    } catch (error) {
      setToast({ message: "Error saving attendance data", type: "error" });
    }
  }, [attendance]);

  const currentStudents = sampleStudents[selectedClass];
  const currentAttendanceChart = sampleAttendanceData[selectedClass];

  const presentCount = useMemo(() => {
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    const map = attendance[selectedClass]?.[dateKey] || {};
    return Object.values(map).filter((v) => v === "present").length;
  }, [attendance, selectedClass, selectedDate]);

  const toggleStatus = (roll) => {
    setAttendance((prev) => {
      const dateKey = format(selectedDate, "yyyy-MM-dd");
      const classAttendance = { ...(prev[selectedClass] || {}) };
      const map = { ...(classAttendance[dateKey] || {}) };
      map[roll] = map[roll] === "present" ? "absent" : "present";
      classAttendance[dateKey] = map;
      setToast({
        message: `Marked ${map[roll]} for Roll ${roll}`,
        type: "success",
      });
      return { ...prev, [selectedClass]: classAttendance };
    });
  };

  const exportToCSV = () => {
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    const map = attendance[selectedClass]?.[dateKey] || {};
    const csvRows = [
      ["Roll", "Name", "Status"],
      ...currentStudents.map((student) => [
        student.roll,
        student.name,
        map[student.roll] || "absent",
      ]),
    ];
    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedClass}_attendance_${dateKey}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setToast({ message: "Attendance exported as CSV", type: "success" });
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"} transition-colors duration-300 flex flex-col items-center pt-16 pb-8 px-4 md:px-8`}>
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl md:text-3xl font-bold">Attendance Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full sm:w-48 p-3 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            >
              {classList.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date Picker and Export */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="w-full sm:w-64">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => isValid(date) && setSelectedDate(date)}
              dateFormat="MMMM d, yyyy"
              className="w-full p-3 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            />
          </div>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm md:text-base"
          >
            <Download className="w-5 h-5" />
            Export CSV
          </button>
        </div>

        {/* Chart Section */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg rounded-2xl p-4 md:p-6 mb-8">
          <h2 className="text-lg md:text-xl font-semibold text-blue-800 dark:text-blue-300 mb-2">
            Weekly Attendance – {classList.find((c) => c.id === selectedClass).label}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Marked present on {format(selectedDate, "MMMM d, yyyy")}:{" "}
            <strong>{presentCount}</strong> / {currentStudents.length}
          </p>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentAttendanceChart}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#4B5563" : "#E5E7EB"} />
                <XAxis dataKey="date" stroke={isDarkMode ? "#D1D5DB" : "#374151"} />
                <YAxis stroke={isDarkMode ? "#D1D5DB" : "#374151"} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF",
                    border: `1px solid ${isDarkMode ? "#4B5563" : "#E5E7EB"}`,
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="present"
                  stroke="#2563EB"
                  strokeWidth={3}
                  name="Present Students"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Attendance Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 shadow-lg rounded-2xl p-4 md:p-6 overflow-x-auto">
          <h2 className="text-lg md:text-xl font-semibold text-blue-800 dark:text-blue-300 mb-4">
            Mark Attendance – {classList.find((c) => c.id === selectedClass).label}
          </h2>
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-200">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                <th className="px-4 py-2">Roll</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => {
                const dateKey = format(selectedDate, "yyyy-MM-dd");
                const status = attendance[selectedClass]?.[dateKey]?.[student.roll] || "absent";
                const isPresent = status === "present";
                return (
                  <tr key={student.roll} className="border-b dark:border-gray-600">
                    <td className="px-4 py-2">{student.roll}</td>
                    <td className="px-4 py-2">{student.name}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isPresent
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {isPresent ? "Present" : "Absent"}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => toggleStatus(student.roll)}
                        className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition ${
                          isPresent
                            ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800"
                            : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800"
                        }`}
                      >
                        {isPresent ? (
                          <>
                            <XCircle className="w-4 h-4" />
                            Mark Absent
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Mark Present
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
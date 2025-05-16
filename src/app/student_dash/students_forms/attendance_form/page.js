"use client";

import { useState } from "react";

// List of subjects and classes
const subjects = ["Mathematics", "Science", "English", "History", "Geography"];
const attendanceStatuses = ["Present", "Absent", "Late", "Excused"];
const classes = ["Class 1", "Class 2", "Class 3", "Class 4"]; // Add more classes/sections as needed
const divisions = ["A", "B", "C", "D"]; 


const TeacherAttendancePage = () => {
  const [teacherName, setTeacherName] = useState(""); // Store Teacher Name
  const [attendanceData, setAttendanceData] = useState([
    { id: 1, name: "John Doe", roll_no: "232244", morningStatus: "", eveningStatus: "", attendance: { Mathematics: "", Science: "", English: "", History: "", Geography: "" } },
    { id: 2, name: "Jane Smith", roll_no: "232255", morningStatus: "", eveningStatus: "", attendance: { Mathematics: "", Science: "", English: "", History: "", Geography: "" } },
    { id: 3, name: "Sam Wilson", roll_no: "232288", morningStatus: "", eveningStatus: "", attendance: { Mathematics: "", Science: "", English: "", History: "", Geography: "" } },
    // Add more students as needed
  ]);

  const [selectedRole, setSelectedRole] = useState("Class Teacher"); // Role selection (Class Teacher or Subject Teacher)
  const [selectedSubject, setSelectedSubject] = useState("Mathematics"); // Subject selection for subject teachers
  const [ setSelectedClass] = useState("Class 1"); // Class/Section selection
  const [selectedDate, setSelectedDate] = useState("");
  const [ setSelectedDivision] = useState("A");


  const handleAttendanceChange = (studentId, subject, status) => {
    setAttendanceData((prevData) =>
      prevData.map((student) =>
        student.id === studentId
          ? {
              ...student,
              attendance: {
                ...student.attendance,
                [subject]: status,
              },
            }
          : student
      )
    );
  };

  const handleMorningAttendanceChange = (studentId, status) => {
    setAttendanceData((prevData) =>
      prevData.map((student) =>
        student.id === studentId
          ? { ...student, morningStatus: status }
          : student
      )
    );
  };

  const handleEveningAttendanceChange = (studentId, status) => {
    setAttendanceData((prevData) =>
      prevData.map((student) =>
        student.id === studentId
          ? { ...student, eveningStatus: status }
          : student
      )
    );
  };

  const handleSubmit = () => {
    console.log("Attendance submitted:", attendanceData);
    alert("Attendance submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full   bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Teacher Attendance</h1>

        {/* Teacher's Name Input */}
        <div className="mb-6">
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium text-gray-600 mb-2">Teacher Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="Enter Teacher's Name"
            />
          </div>
        </div>

        {/* Role and Class/Section Selection */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium text-gray-600 mb-2">Select Role</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="Class Teacher">Class Teacher</option>
              <option value="Subject Teacher">Subject Teacher</option>
            </select>
          </div>

          {/* Class/Section Selection */}
          <div className="w-full max-w-xs">
            <label className="block text-sm font-medium text-gray-600 mb-2">Select Class/Section</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {classes.map((classItem, idx) => (
                <option key={idx} value={classItem}>
                  {classItem}
                </option>
              ))}
            </select>
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Select Date</label>
            <input type="date" className="w-full px-4 py-2 border rounded-md" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Select Division</label>
            <select className="w-full px-4 py-2 border rounded-md" onChange={(e) => setSelectedDivision(e.target.value)}>
              {divisions.map((division, idx) => (
                <option key={idx} value={division}>{division}</option>
              ))}
            </select>
          </div>

          {/* Subject Selection for Subject Teacher */}
          {selectedRole === "Subject Teacher" && (
            <div className="w-full max-w-xs">
              <label className="block text-sm font-medium text-gray-600 mb-2">Select Subject</label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subjects.map((subject, idx) => (
                  <option key={idx} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 bg-gray-100 border-b whitespace-nowrap">Student Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 bg-gray-100 border-b whitespace-nowrap">Roll No</th>

                {selectedRole === "Class Teacher" && (
                  <>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 bg-gray-100 border-b whitespace-nowrap">Morning Arrival</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 bg-gray-100 border-b whitespace-nowrap">Evening Session</th>
                  </>
                )}
                {(selectedRole === "Class Teacher" ? subjects : [selectedSubject]).map((subject) => (
                  <th key={subject} className="px-6 py-3 text-left text-sm font-medium text-gray-600 bg-gray-100 border-b whitespace-nowrap">
                    {subject}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((student) => (
                <tr key={student.id} className="border-b">
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{student.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{student.roll_no}</td>

                  {/* Class Teacher's Morning Attendance */}
                  {selectedRole === "Class Teacher" && (
                    <>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        <div className="space-x-3">
                          {attendanceStatuses.map((status) => (
                            <label key={status} className="inline-flex items-center space-x-2">
                              <input
                                type="radio"
                                checked={student.morningStatus === status}
                                onChange={() => handleMorningAttendanceChange(student.id, status)}
                                className={`form-checkbox h-5 w-5 text-${status === "Present" ? "green" : status === "Absent" ? "red" : status === "Late" ? "yellow" : "blue"}-600 focus:ring-${status === "Present" ? "green" : status === "Absent" ? "red" : status === "Late" ? "yellow" : "blue"}-500`}
                              />
                              <span className="text-sm text-gray-600">{status}</span>
                            </label>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                        <div className="space-x-3">
                          {attendanceStatuses.map((status) => (
                            <label key={status} className="inline-flex items-center space-x-2">
                              <input
                                type="radio"
                                checked={student.eveningStatus === status}
                                onChange={() => handleEveningAttendanceChange(student.id, status)}
                                className={`form-checkbox h-5 w-5 text-${status === "Present" ? "green" : status === "Absent" ? "red" : status === "Late" ? "yellow" : "blue"}-600 focus:ring-${status === "Present" ? "green" : status === "Absent" ? "red" : status === "Late" ? "yellow" : "blue"}-500`}
                              />
                              <span className="text-sm text-gray-600">{status}</span>
                            </label>
                          ))}
                        </div>
                      </td>
                    </>
                  )}

                  {/* Subject Teachers' Attendance */}
                  {(selectedRole === "Class Teacher" ? subjects : [selectedSubject]).map((subject) => (
                    <td key={subject} className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                      <div className="space-x-3">
                        {attendanceStatuses.map((status) => (
                          <label key={status} className="inline-flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`${student.id}-${subject}`}
                              checked={student.attendance[subject] === status}
                              onChange={() => handleAttendanceChange(student.id, subject, status)}
                              className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600">{status}</span>
                          </label>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Submit Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendancePage;

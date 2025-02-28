"use client";

import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { executeMutation } from "../../graphqlClient";
import SchoolNavbar from "../../navbar/page";
import { CREATE_ACADEMIC_CALENDAR_MUTATION } from "../../mutation/AcademicCalendarMutation/createAcademicCalendarMutation";

const AcademicCalendarForm = () => {
  const router = useRouter();
  const [calendar, setCalendar] = useState({
    program: "",
    from_date: "",
    to_date: "",
    start_time: "",
    end_time: "",
    program_details: "",
    host: "",
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCalendar((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await executeMutation(CREATE_ACADEMIC_CALENDAR_MUTATION, calendar);
      setLoading(false);

      if (response?.createAcademicCalendar?.success_msg) {
        setMessage({ text: "✅ Academic Calendar added successfully!", type: "success" });
        setCalendar({ program: "", from_date: "", to_date: "", start_time: "", end_time: "", program_details: "", host: "" });
      } else {
        throw new Error(response?.createAcademicCalendar?.error_msg || "Failed to add academic calendar.");
      }
    } catch (error) {
      setLoading(false);
      setMessage({ text: `❌ ${error.message}`, type: "error" });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <SchoolNavbar />
      <div className="mt-16 flex flex-col items-center justify-center py-10 px-6">
        <div className="w-full max-w-5xl bg-white p-8 shadow-xl border border-gray-200 ">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => router.back()} 
              className="bg-blue-500 text-white px-4 py-2 shadow-md hover:bg-blue-600 transition duration-200 flex items-center gap-2 "
            >
              <FaArrowLeft /> Go Back
            </button>
            <h3 className="text-2xl text-gray-800">Academic Calendar Form</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {["program", "from_date", "to_date", "start_time", "end_time", "host"].map((field) => (
                <div key={field} className="w-full">
                  <label className="block text-gray-700 font-medium mb-1">
                    {field.replace("_", " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}:
                  </label>
                  <input 
                    type={field.includes("date") ? "date" : field.includes("time") ? "time" : "text"} 
                    name={field}
                    value={calendar[field]} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 shadow-sm" 
                    required 
                  />
                </div>
              ))}
            </div>

            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-1">Program Details:</label>
              <textarea 
                name="program_details"
                value={calendar.program_details}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 shadow-sm"
                rows="7"
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200 shadow-md flex justify-center items-center"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>

      {message && (
        <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg text-sm text-center shadow-lg ${message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default AcademicCalendarForm;

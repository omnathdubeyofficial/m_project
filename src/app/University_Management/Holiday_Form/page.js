"use client";

import { useState,useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { executeMutation } from "../../graphqlClient";
// import SchoolNavbar from "../../navbar/page";import { CREATE_HOLIDAY_LIST_MUTATION } from "../../mutation/holidayListsMutation/createHolidayListMutation";

const HolidayForm = () => {
  const router = useRouter();
  const [holiday, setHoliday] = useState({
    from_date: "",
    to_date: "",
    day: "",
    holiday_name: "",
    details: "",
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
    setHoliday((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await executeMutation(CREATE_HOLIDAY_LIST_MUTATION, holiday);
      setLoading(false);
      
      if (response?.createHolidayLists?.success_msg) {
        setMessage({ text: "✅ Holiday added successfully!", type: "success" });
        setHoliday({ from_date: "", to_date: "", day: "", holiday_name: "", details: "" });
      } else {
        throw new Error(response?.createHolidayLists?.error_msg || "Failed to add holiday.");
      }
    } catch (error) {
      setLoading(false);
      setMessage({ text: `❌ ${error.message}`, type: "error" });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* <SchoolNavbar /> */}
      <div className="mt-16 flex flex-col items-center justify-center py-10 px-6">
        <div className="w-full max-w-2xl bg-white p-8 shadow-xl border border-gray-200 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => router.back()} 
             className="bg-blue-500 text-white px-4 py-2 shadow-md hover:bg-blue-600 transition duration-200 flex items-center gap-2 "
            >
              <FaArrowLeft />Go Back
            </button>
            <h3 className="text-2xl text-gray-800">Create Holiday</h3>
          </div>
          
          {message && (
            <p className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-3 rounded-lg text-sm text-center shadow-lg  ${message.type === "success" ? "text-green-700 bg-green-100 border border-green-300" : "text-red-700 bg-red-100 border border-red-300"}`}>
              {message.text}
            </p>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "from_date", type: "date", label: "From Date" },
                { name: "to_date", type: "date", label: "To Date" },
                { name: "day", type: "text", label: "Day" },
                { name: "holiday_name", type: "text", label: "Holiday Name" }
              ].map(({ name, type, label }) => (
                <div key={name}>
                  <label className="block text-gray-700 font-medium mb-1">{label}:</label>
                  <input 
                    type={type} 
                    name={name}
                    value={holiday[name]} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 shadow-sm" 
                    required 
                  />
                </div>
              ))}
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-1">Details:</label>
              <textarea 
                name="details"
                value={holiday.details} 
                onChange={handleChange} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 shadow-sm resize-none h-48" 
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
    </div>
  );
};

export default HolidayForm;
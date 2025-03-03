"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaUpload, FaSave, FaTimes, FaArrowLeft } from "react-icons/fa";
import Navbar from "../../navbar/page";

const Exam_Management_Form = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    examName: "",
    subject: "",
    examDate: "",
    startTime: "",
    endTime: "",
    totalMarks: "",
    passingMarks: "",
    examInstructions: "",
    examPaper: null,
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, examPaper: URL.createObjectURL(file) });
    }
  };

  const handleClearFile = () => {
    setFormData({ ...formData, examPaper: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Exam Data Submitted:", formData);
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col">
       {/* <Navbar /> */}
      <div className="container mx-auto py-10 px-4 sm:px-6 md:px-8 max-w-8xl pt-32">
        <div className="bg-white shadow-lg p-6 sm:p-8 w-full relative ">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5">
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-blue-500 text-white px-3 py-2 flex items-center gap-2 hover:bg-blue-700"
            >
              <FaArrowLeft /> Go Back
            </button>
            <h2 className="text-2xl text-center text-gray-800">Exam Management Form</h2>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "examName", label: "Exam Name" },
                { name: "subject", label: "Subject" },
                { name: "examDate", label: "Exam Date" },
                { name: "startTime", label: "Start Time" },
                { name: "endTime", label: "End Time" },
                { name: "totalMarks", label: "Total Marks" },
                { name: "passingMarks", label: "Passing Marks" },
              ].map((field, index) => (
                <div key={index} className="flex flex-col">
                  <label className="font-semibold mb-1">{field.label}</label>
                  <input
                    type={field.name.includes("Date") || field.name.includes("Time") ? "datetime-local" : "text"}
                    name={field.name}
                    className="border p-3 rounded w-full"
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col border-t pt-6">
              <label className="font-semibold mb-1">Exam Instructions</label>
              <textarea
                name="examInstructions"
                className="border p-3 rounded w-full"
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col items-center border p-4 rounded-lg w-full relative mt-4">
              <label className="font-semibold text-lg mb-2">Upload Exam Paper</label>
              <label className="border p-2 rounded w-full flex items-center gap-2 cursor-pointer bg-gray-200 hover:bg-gray-300">
                <FaUpload /> Upload File
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="application/pdf,image/*"
                  onChange={handleFileChange}
                  required
                />
              </label>
              {formData.examPaper && (
                <div className="relative mt-2">
                  <embed src={formData.examPaper} className="w-32 h-32 border object-cover" />
                  <button
                    type="button"
                    onClick={handleClearFile}
                    className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 flex items-center justify-center gap-2 hover:bg-blue-700 text-lg"
              >
                <FaSave /> Save Exam
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Exam_Management_Form;

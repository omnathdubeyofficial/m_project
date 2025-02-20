"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaUpload, FaSave, FaTimes, FaArrowLeft } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../navbar/page";

const Fee_Management_Form = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    studentName: "",
    admissionNumber: "",
    grade: "",
    feeAmount: "",
    paymentDate: new Date(),
    paymentMode: "",
    receipt: null,
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, paymentDate: date });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, receipt: URL.createObjectURL(file) });
    }
  };

  const handleClearFile = () => {
    setFormData({ ...formData, receipt: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Fee Data Submitted:", formData);
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col">
      <Navbar />
      <div className="container mx-auto py-10 px-4 sm:px-6 md:px-8 max-w-8xl pt-32">
        <div className="bg-white shadow-lg p-6 sm:p-8 w-full relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5">
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-blue-500 text-white px-3 py-2 flex items-center gap-2 hover:bg-blue-700"
            >
              <FaArrowLeft /> Go Back
            </button>
            <h2 className="text-2xl text-center text-gray-800">Fee Management Form</h2>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[{
                name: "studentName", label: "Student Name" },
                { name: "admissionNumber", label: "Admission Number" },
                { name: "grade", label: "Grade" },
                { name: "feeAmount", label: "Fee Amount" },
                { name: "paymentMode", label: "Payment Mode" }
              ].map((field, index) => (
                <div key={index} className="flex flex-col">
                  <label className="font-semibold mb-1">{field.label}</label>
                  <input
                    type="text"
                    name={field.name}
                    className="border p-3 rounded w-full"
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
              <div className="flex flex-col">
                <label className="font-semibold mb-1">Payment Date</label>
                <DatePicker
                  selected={formData.paymentDate}
                  onChange={handleDateChange}
                  className="border p-3 rounded w-full"
                  dateFormat="yyyy-MM-dd"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col items-center border p-4 rounded-lg w-full relative mt-4">
              <label className="font-semibold text-lg mb-2">Upload Receipt</label>
              <label className="border p-2 rounded w-full flex items-center gap-2 cursor-pointer bg-gray-200 hover:bg-gray-300">
                <FaUpload /> Upload File
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="application/pdf, image/*"
                  onChange={handleFileChange}
                />
              </label>
              {formData.receipt && (
                <div className="relative mt-2">
                  <p className="text-sm text-gray-700">File Uploaded</p>
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
                <FaSave /> Save Fee Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Fee_Management_Form;
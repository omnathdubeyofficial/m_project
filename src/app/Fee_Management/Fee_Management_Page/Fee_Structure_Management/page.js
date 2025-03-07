"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const AdvancedFeeStructureForm = () => {
  const [formData, setFormData] = useState({
    className: "",
    admissionFee: "",
    tuitionFee: "",
    libraryFee: "",
    dressFee: "",
    labFee: "",
    computerClassFee: "",
    annualFee: "",
    transportFeePerKm: "",
    transportDistance: "",
    sportsFee: "",
    activityFee: "",
    examinationFee: "",
    cautionMoney: "",
    hostelFee: "",
    siblingDiscount: "",
    earlyPaymentDiscount: "",
    scholarshipAmount: "",
    paymentFrequency: "Monthly",
    academicYear: "",
    otherFees: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value || "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };



  return (
    <div className="bg-green-100 py-20">
    <div className="p-6 bg-white shadow-md  max-w-7xl mx-auto mt-32">
    <div className="flex flex-col md:flex-row items-center justify-between mb-8">
  <button
    onClick={() => window.history.back()}
    className="flex items-center gap-1 p-2 pr-4 bg-red-500 text-white hover:bg-red-600 transition mb-4 md:mb-0"
  >
    <ArrowLeft size={20} />
    Go Back
  </button>

  <h1 className="text-3xl text-center md:text-right">
    Advanced Fee Structure Form
  </h1>
</div>


      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Class Name</label>
            <select
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Class</option>
              {['LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'].map((classOption) => (
                <option key={classOption} value={classOption}>{classOption}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Academic Year</label>
            <select
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Year</option>
              {Array.from({ length: 10 }, (_, i) => {
                const year = new Date().getFullYear() + i;
                return (
                  <option key={year} value={year}>{year}-{year + 1}</option>
                );
              })}
            </select>
          </div>

          {["Admission Fee",
            "Tuition Fee",
            "Library Fee",
            "Dress Fee",
            "Lab Fee",
            "Computer Class Fee",
            "Annual Fee",
            "Sports Fee",
            "Activity Fee",
            "Examination Fee",
            "Caution Money",
            "Hostel Fee",
            "Transport Fee Per Km",
            "Transport Distance (KM)",
            "Sibling Discount",
            "Early Payment Discount",
            "Scholarship Amount"
          ].map((label) => {
            const name = label.toLowerCase().replace(/\s+/g, "");
            return (
              <div key={name}>
                <label className="block text-gray-700 mb-2">{label}</label>
                <input
                  type="number"
                  name={name}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            );
          })}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Other Fees:</label>
          <textarea
            name="otherFees"
            value={formData.otherFees}
            onChange={handleChange}
            placeholder="Enter other applicable fees"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
          ></textarea>
        </div>


        <button
          type="submit"
          className="w-full py-3 mt-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default AdvancedFeeStructureForm;

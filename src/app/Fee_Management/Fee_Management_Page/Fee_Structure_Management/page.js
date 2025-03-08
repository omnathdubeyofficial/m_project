"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";


import { CREATE_FEE_STRUCTURE_MUTATION } from "../../../mutation/FeeStructureMutations/createFeeStructureMutation";
import { executeMutation } from "../../../graphqlClient";

const AdvancedFeeStructureForm = () => {
  const [formData, setFormData] = useState({
    class_name : "",
    class_section : "",
    academic_year : "",
    admission_fee : "",
    library_fee : "",
    uniform_fee : "",
    lab_fee : "",
    computer_class_fee : "",
    annual_fee : "",
    sports_fee : "",
    activity_fee : "",
    examination_fee : "",
    hostel_fee : "",
    transport_fee_per_km : "",
    sibling_discount: "",
    early_payment_discount : "",
    scholarship_amount: "",
    id_card_fee : "",
    medical_fee : "",
    exam_admit_card: "",
    platform_fee: "",
    other_fee: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value || "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    
    try {
      const response = await executeMutation(CREATE_FEE_STRUCTURE_MUTATION, formData);
      console.log("Mutation Response:", response);
  
      if (response?.createFeeStructureList?.success_msg) {
        alert(response.createFeeStructureList.success_msg);
      } else if (response?.createFeeStructureList?.error_msg) {
        alert(response.createFeeStructureList.error_msg);
      } else {
        alert("Unknown error occurred.");
      }
  
    } catch (error) {
      console.error("Mutation Error:", error);
      alert("An error occurred while creating the Fee Structure.");
    }
  };
  
  

  return (
    <div className="bg-green-100 py-20">
      <div className="p-6 bg-white shadow-md max-w-7xl mx-auto mt-32">
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
                name="class_name"
                value={formData.class_name}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Class</option>
                {["LKG", "UKG", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"].map((classOption) => (
                  <option key={classOption} value={classOption}>{classOption}</option>
                ))}
              </select>
            </div>


            <div>
  <label className="block text-gray-700 mb-2">Class Section</label>
  <select
    name="class_section"
    value={formData.class_section}
    onChange={handleChange}
    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    required
  >
    <option value="">Select Class & Section</option>
    {[
      { class: "LKG", sections: ["A", "B", "C"] },
      { class: "UKG", sections: ["A", "B", "C"] },
      { class: "1st", sections: ["A", "B", "C"] },
      { class: "2nd", sections: ["A", "B", "C"] },
      { class: "3rd", sections: ["A", "B", "C"] },
      { class: "4th", sections: ["A", "B", "C"] },
      { class: "5th", sections: ["A", "B", "C"] },
      { class: "6th", sections: ["A", "B", "C"] },
      { class: "7th", sections: ["A", "B", "C"] },
      { class: "8th", sections: ["A", "B", "C"] },
      { class: "9th", sections: ["A", "B", "C"] },
      { class: "10th", sections: ["A", "B", "C"] },
      { class: "11th", sections: ["A", "B", "C"] },
      { class: "12th", sections: ["A", "B", "C"] }
    ].map(({ class: classOption, sections }) =>
      sections.map((section) => (
        <option key={`${classOption}-${section}`} value={`${classOption}-${section}`}>
          {classOption} - Section {section}
        </option>
      ))
    )}
  </select>
</div>


            <div>
              <label className="block text-gray-700 mb-2">Platform Fee</label>
              <input
                type="text"
                name="platform_fee"
                value={formData.platform_fee}
                onChange={handleChange}
                placeholder="Enter class section"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
  <label className="block text-gray-700 mb-2">Academic Year</label>
  <select
    name="academic_year"
    value={formData.academic_year || `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`}
    onChange={handleChange}
    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    required
  >
    <option value="">Select Year</option>
    {Array.from({ length: 10 }, (_, i) => {
      const year = new Date().getFullYear() + i;
      return (
        <option key={year} value={`${year}-${year + 1}`}>
          {year}-{year + 1}
        </option>
      );
    })}
  </select>
</div>


            {["Admission Fee", "Library Fee", "Uniform Fee", "Lab Fee", "Computer Class Fee", "Annual Fee", "Sports Fee", "Activity Fee", "Examination Fee", "Hostel Fee", "Transport Fee Per Km", "Sibling Discount", "Early Payment Discount", "Scholarship Amount", "ID Card Fee", "Medical Fee", "Exam Admit Card"].map((label) => {
              const name = label.toLowerCase().replace(/\s+/g, "_");
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
              name="other_fee"
              value={formData.other_fee}
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

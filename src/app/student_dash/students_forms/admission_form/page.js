"use client";

import { useState } from "react";
import { executeMutation } from "../../../graphqlClient";
import { CREATE_STUDENT_REGISTRATION_MUTATION } from "../../../mutation/studentRegistrationMutations/createStudentRegistration";
import { ArrowLeft, FileText, File, Trash2, Edit, ChevronLeft, ChevronRight } from 'lucide-react';

const StudentAdmissionForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    student_id: "",
    adhar_no: "",
    gender: "",
    email: "",
    date_of_birth: "",
    contact_no: "",
    address: "",
    previous_school: "",
    highest_qualification: "",
    percentage: "",
    entrance_exam_score: "",
    parent_name: "",
    parent_contact_no: "",
    parent_email: "",
    relationship: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value ?? "", // Using ?? for fallback to empty string
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting Form Data:", formData);

    try {
      const response = await executeMutation(CREATE_STUDENT_REGISTRATION_MUTATION, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        gender: formData.gender?.toLowerCase() ?? "other", // Default gender if not provided
        email: formData.email ?? "", // Default to empty string if no email
        date_of_birth: formData.date_of_birth ?? "", // Default to empty string if no date of birth
        contact_no: formData.contact_no ?? "", // Default to empty string if no contact number
        address: formData.address ?? "", // Default to empty string if no address
        previous_school: formData.previous_school ?? "", // Default to empty string if no previous school
        highest_qualification: formData.highest_qualification ?? "", // Default to empty string if no qualification
        percentage: String(formData.percentage ?? "0"), // Default to "0" if no percentage
        entrance_exam_score: String(formData.entrance_exam_score ?? "0"), // Default to "0" if no entrance score
        parent_name: formData.parent_name ?? "", // Default to empty string if no parent name
        parent_contact_no: formData.parent_contact_no ?? "", // Default to empty string if no parent contact
        relationship: formData.relationship ?? "", // Default to empty string if no relationship
      });

      console.log("Mutation Response:", response);

      if (response?.errors) {
        console.error("GraphQL Errors:", response.errors);
        alert("GraphQL Error: " + response.errors[0]?.message);
        return;
      }

      alert("Admission form submitted successfully!");
    } catch (error) {
      console.error("Mutation Error:", error.networkError?.result || error.message);
      alert("Error submitting form: " + (error.networkError?.result?.errors[0]?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex justify-center mt-32">
      <form onSubmit={handleSubmit} className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-xl border border-gray-200">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
  {/* Go Back Button */}
  <button 
    onClick={() => window.history.back()} 
    className="flex items-center gap-1 p-2 pr-4 bg-red-500 text-white hover:bg-red-600 transition"
  >
    <ArrowLeft size={20} />
    Go Back
  </button>

  {/* Heading */}
  <h1 className="text-2xl">
    Student Fee Record Data
  </h1>
</div>




        {/* Personal Information Section */}
        <div className="mb-8 mt-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">First Name *</label>
              <input
                type="text"
                name="first_name"
                required
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Middle Name</label>
              <input
                type="text"
                name="middle_name"
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Last Name *</label>
              <input
                type="text"
                name="last_name"
                required
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">Gender *</label>
              <select
                name="gender"
                required
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Date of Birth *</label>
              <input
                type="date"
                name="date_of_birth"
                required
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-600">Aadhar Number *</label>
            <input
              type="number"
              name="adhar_no"
              required
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>
        </div>

        {/* Educational Information Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Educational Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">Previous School</label>
              <input
                type="text"
                name="previous_school"
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Highest Qualification</label>
              <input
                type="text"
                name="highest_qualification"
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Percentage</label>
              <input
                type="number"
                name="percentage"
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Entrance Exam Score</label>
              <input
                type="number"
                name="entrance_exam_score"
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
          </div>
        </div>

        {/* Parent/Guardian Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Parent/Guardian Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">Parent Name *</label>
              <input
                type="text"
                name="parent_name"
                required
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Relationship *</label>
              <input
                type="text"
                name="relationship"
                required
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Parent Contact *</label>
              <input
                type="tel"
                name="parent_contact_no"
                required
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Parent Email</label>
              <input
                type="email"
                name="parent_email"
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default StudentAdmissionForm;

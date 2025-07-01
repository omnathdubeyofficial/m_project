'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdmissionEnquiryForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    academicYear: '2025-26',
    class: '',
    category: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    primaryMobile: '',
    primaryEmail: '',
    religion: '',
    gender: '',
    fatherName: '',
    fatherMobile: '',
    motherName: '',
    motherMobile: '',
    address: '',
    city: '',
    state: 'Maharashtra',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = [
      'class',
      'firstName',
      'lastName',
      'primaryMobile',
      'primaryEmail',
      'gender',
      'fatherName',
      'motherName',
      'address',
      'city',
      'state',
    ];
    for (let field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = 'Required';
      }
    }
    if (formData.primaryMobile && !/^\d{10}$/.test(formData.primaryMobile)) {
      newErrors.primaryMobile = 'Please enter a valid 10-digit mobile number.';
    }
    if (formData.primaryEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.primaryEmail)) {
      newErrors.primaryEmail = 'Please enter a valid email address.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log('Submitted data:', formData);
    alert('Enquiry Submitted Successfully!');
    setFormData({
      academicYear: '2025-26',
      class: '',
      category: '',
      firstName: '',
      middleName: '',
      lastName: '',
      dob: '',
      primaryMobile: '',
      primaryEmail: '',
      religion: '',
      gender: '',
      fatherName: '',
      fatherMobile: '',
      motherName: '',
      motherMobile: '',
      address: '',
      city: '',
      state: 'Maharashtra',
    });
    setErrors({});
    // router.push('/thank-you');
  };

  return (
<div className="min-h-screen bg-gray-50 pt-24 font-sans flex justify-center items-start">



      <main className="w-full md:w-3/4  p-4 sm:p-6 md:p-8">
        <nav className="bg-blue-600 text-white p-4 mb-6  shadow-md flex justify-between items-center">
          <h2 className="text-xl font-semibold">Enquiry Form</h2>
          {/* <span className="text-sm">Last Updated: July 01, 2025, 03:16 PM IST</span> */}
        </nav>
        <div className="bg-white p-6  shadow-2xl">
          <h2 className="text-2xl font-bold text-blue-900 mb-6 border-b-2 border-blue-200 pb-2">STUDENT DETAILS :</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-800">Academic Year <span className="text-red-600">*</span></label>
                <select
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled
                >
                  <option value="2025-26">2025-26</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">Select Class <span className="text-red-600">*</span></label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className={`w-full mt-2 p-3 border ${errors.class ? 'border-red-600' : 'border-gray-300'}  focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="">Select Class</option>
                  {['Nursery', 'LKG', 'UKG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'].map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
                {errors.class && <span className="text-red-600 text-sm">{errors.class}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">Select Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-800">First Name <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full mt-2 p-3 border ${errors.firstName ? 'border-red-600' : 'border-gray-300'}  focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.firstName && <span className="text-red-600 text-sm">{errors.firstName}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">Middle Name</label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">Last Name <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full mt-2 p-3 border ${errors.lastName ? 'border-red-600' : 'border-gray-300'}  focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.lastName && <span className="text-red-600 text-sm">{errors.lastName}</span>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-800">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">Primary Mobile No. <span className="text-red-600">*</span></label>
                <input
                  type="tel"
                  name="primaryMobile"
                  value={formData.primaryMobile}
                  onChange={handleChange}
                  className={`w-full mt-2 p-3 border ${errors.primaryMobile ? 'border-red-600' : 'border-gray-300'}  focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.primaryMobile && <span className="text-red-600 text-sm">{errors.primaryMobile}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">Primary Email ID <span className="text-red-600">*</span></label>
                <input
                  type="email"
                  name="primaryEmail"
                  value={formData.primaryEmail}
                  onChange={handleChange}
                  className={`w-full mt-2 p-3 border ${errors.primaryEmail ? 'border-red-600' : 'border-gray-300'}  focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.primaryEmail && <span className="text-red-600 text-sm">{errors.primaryEmail}</span>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-800">Select Religion</label>
                <select
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Religion</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">Select Gender <span className="text-red-600">*</span></label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full mt-2 p-3 border ${errors.gender ? 'border-red-600' : 'border-gray-300'}  focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <span className="text-red-600 text-sm">{errors.gender}</span>}
              </div>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mt-8 mb-6 border-b-2 border-green-200 pb-2">FAMILY INFORMATION :</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-800">Father Name <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  className={`w-full mt-2 p-3 border ${errors.fatherName ? 'border-red-600' : 'border-gray-300'}  focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.fatherName && <span className="text-red-600 text-sm">{errors.fatherName}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">Father Mobile No.</label>
                <input
                  type="tel"
                  name="fatherMobile"
                  value={formData.fatherMobile}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  className="w-full mt-2 p-3 border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">Mother Name <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  className={`w-full mt-2 p-3 border ${errors.motherName ? 'border-red-600' : 'border-gray-300'}  focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.motherName && <span className="text-red-600 text-sm">{errors.motherName}</span>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-800">Mother Mobile No.</label>
                <input
                  type="tel"
                  name="motherMobile"
                  value={formData.motherMobile}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  className="w-full mt-2 p-3 border border-gray-300  focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-orange-700 mt-8 mb-6 border-b-2 border-orange-200 pb-2">HOUSE ADDRESS :</h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-800">Address <span className="text-red-600">*</span></label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full mt-2 p-3 border ${errors.address ? 'border-red-600' : 'border-gray-300'}  focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  rows={4}
                />
                {errors.address && <span className="text-red-600 text-sm">{errors.address}</span>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-800">City <span className="text-red-600">*</span></label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full mt-2 p-3 border ${errors.city ? 'border-red-600' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                {errors.city && <span className="text-red-600 text-sm">{errors.city}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">State <span className="text-red-600">*</span></label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full mt-2 p-3 border ${errors.state ? 'border-red-600' : 'border-gray-300'}  focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Other">Other</option>
                </select>
                {errors.state && <span className="text-red-600 text-sm">{errors.state}</span>}
              </div>
            </div>
            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-6  hover:bg-blue-700 transition duration-300 font-semibold text-lg flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Submit Enquiry
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
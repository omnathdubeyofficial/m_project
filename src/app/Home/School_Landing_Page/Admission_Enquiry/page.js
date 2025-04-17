"use client";

import Image from 'next/image';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const heroContent = [
  {
    image: "/img/admission-cinematic1.jpg",
    title: "Start Your Educational Journey",
    description: "Discover our seamless online admission process, beginning with a simple inquiry.",
  },
  {
    image: "/img/admission-cinematic2.jpg",
    title: "Enroll with Ease",
    description: "Our fully online system makes applying to our school effortless and secure.",
  },
  {
    image: "/img/admission-cinematic3.jpg",
    title: "Join Our Community",
    description: "Take the first step toward a transformative education with our online inquiry.",
  },
];

export default function AdmissionEnquiry() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    phone: "",
    studentName: "",
    grade: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroContent.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  const validateField = (name, value) => {
    if (name === "parentName" || name === "studentName") {
      return value.trim() ? "" : "This field is required";
    }
    if (name === "email") {
      return value.trim() ? (/^\S+@\S+\.\S+$/.test(value) ? "" : "Invalid email format") : "This field is required";
    }
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setFormStatus({ type: "error", message: "Please correct the errors in the form." });
      return;
    }

    // Simulate API call (replace with Prisma/GraphQL integration)
    try {
      // Placeholder for API call
      setFormStatus({ type: "success", message: "Enquiry submitted successfully!" });
      setFormData({
        parentName: "",
        email: "",
        phone: "",
        studentName: "",
        grade: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      setFormStatus({ type: "error", message: "Failed to submit enquiry. Please try again." });
    }
  };

  return (
    <div className="bg-[#FAF9F6] text-gray-900">
      {/* Hero Section */}
      <div className="relative w-full h-[750px] overflow-hidden">
        {heroContent.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            initial={{ scale: 1.1 }}
            animate={{ scale: index === currentIndex ? 1 : 1.1 }}
            transition={{ duration: 10 }}
          >
            <div className="relative w-full h-full">
              <Image
                src={item.image}
                layout="fill"
                objectFit="cover"
                alt="Admission Enquiry Hero Image"
                className="brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FAF9F6]/80"></div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 text-center max-w-7xl w-full px-6">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900"
              >
                {item.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-gray-700"
              >
                {item.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="mt-10"
              >
                <button className="relative bg-[#D4A017] text-white px-10 py-5 rounded-full font-semibold text-lg shadow-lg hover:bg-[#B88C14] transition-all duration-300 transform hover:scale-105 overflow-hidden group">
                  <span className="absolute inset-0 bg-[#B88C14] scale-0 rounded-full group-hover:scale-150 transition-transform duration-300 origin-center"></span>
                  <span className="relative z-10">Submit Enquiry</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        ))}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4">
          {heroContent.map((_, index) => (
            <span
              key={index}
              className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentIndex ? "bg-[#D4A017] scale-125" : "bg-gray-300/70"
              }`}
              onClick={() => handleIndicatorClick(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* Enquiry Form Section */}
      <div className="py-24 bg-[#D1E7DD]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-center text-gray-900"
          >
            Begin Your Admission Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-6 text-lg text-gray-600 text-center max-w-3xl mx-auto"
          >
            Connect with our admissions team by submitting your enquiry. We’ll guide you every step of the way.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-12 bg-[#FAF9F6] p-8 rounded-3xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] max-w-3xl mx-auto"
          >
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Parent’s Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className={`mt-2 w-full p-3 rounded-lg bg-[#FAF9F6] text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4A017] transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] ${
                      errors.parentName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.parentName && <p className="mt-1 text-sm text-red-500">{errors.parentName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={`mt-2 w-full p-3 rounded-lg bg-[#FAF9F6] text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4A017] transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="mt-2 w-full p-3 rounded-lg bg-[#FAF9F6] text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4A017] transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Student’s Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    placeholder="Enter student’s name"
                    className={`mt-2 w-full p-3 rounded-lg bg-[#FAF9F6] text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4A017] transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] ${
                      errors.studentName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.studentName && <p className="mt-1 text-sm text-red-500">{errors.studentName}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Grade Applying For</label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="mt-2 w-full p-3 rounded-lg bg-[#FAF9F6] text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4A017] transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]"
                  >
                    <option value="">Select a grade</option>
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Additional Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Any additional information or questions"
                    className="mt-2 w-full p-3 rounded-lg bg-[#FAF9F6] text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4A017] transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] h-32 resize-none"
                  ></textarea>
                </div>
              </div>
              {formStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-lg text-center ${
                    formStatus.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {formStatus.message}
                </motion.div>
              )}
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="relative bg-[#D4A017] text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:bg-[#B88C14] transition-all duration-300 transform hover:scale-105 overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-[#B88C14] scale-0 rounded-full group-hover:scale-150 transition-transform duration-300 origin-center"></span>
                  <span className="relative z-10">Submit Enquiry</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Map Section */}
      <div className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-center text-gray-900"
          >
            Discover Our Campus
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-6 text-lg text-gray-600 text-center max-w-3xl mx-auto"
          >
            Visit our state-of-the-art facilities and see why our school is the perfect place for your child’s education.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 1 }}
            className="mt-12 bg-[#FAF9F6] rounded-3xl shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.336285614434!2d77.20802131508216!3d28.559282982447936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2a99b1f3c2b%3A0xdeb2b257384e64e8!2sDelhi%20Public%20School%2C%20R.K.%20Puram!5e0!3m2!1sen!2sin!4v1698765432109!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-24 bg-[#D1E7DD]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Shape Your Child’s Future
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Submit your enquiry now or contact our admissions team to explore our world-class educational programs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 flex justify-center gap-6"
          >
            <button className="relative bg-[#D4A017] text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:bg-[#B88C14] transition-all duration-300 transform hover:scale-105 overflow-hidden group">
              <span className="absolute inset-0 bg-[#B88C14] scale-0 rounded-full group-hover:scale-150 transition-transform duration-300 origin-center"></span>
              <span className="relative z-10">Apply Online</span>
            </button>
            <button className="relative border-2 border-[#D4A017] text-[#D4A017] px-10 py-4 rounded-full font-semibold hover:bg-[#D4A017] hover:text-white transition-all duration-300 transform hover:scale-105 overflow-hidden group">
              <span className="absolute inset-0 bg-[#D4A017] scale-0 rounded-full group-hover:scale-150 transition-transform duration-300 origin-center"></span>
              <span className="relative z-10">Contact Admissions</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
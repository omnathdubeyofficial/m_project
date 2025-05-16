"use client";

import Image from 'next/image';
import { useEffect, useState } from "react";
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

const steps = [
  {
    number: 1,
    title: "Online Inquiry",
    description:
      "Submit an online inquiry form to receive personalized guidance about our programs and admission process.",
    image: "/img/inquiry-cinematic.jpg",
  },
  {
    number: 2,
    title: "Online Application",
    description:
      "Complete the secure online application form, uploading documents like Aadhar cards and birth certificates.",
    image: "/img/application-cinematic.jpg",
  },
  {
    number: 3,
    title: "Virtual Assessment",
    description:
      "Participate in a virtual assessment via video conferencing to evaluate your child’s readiness.",
    image: "/img/assessment-cinematic.jpg",
  },
  {
    number: 4,
    title: "Online Enrollment",
    description:
      "Finalize enrollment with secure online payments and attend a virtual orientation session.",
    image: "/img/enrollment-cinematic.jpg",
  },
];

export default function AdmissionProcess() {
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroContent.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.parentName || !formData.email || !formData.studentName) {
      setFormStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }
    // Simulate API call (replace with actual API integration, e.g., Prisma/GraphQL)
    try {
      // Placeholder for API call
      setFormStatus({ type: "success", message: "Inquiry submitted successfully!" });
      setFormData({
        parentName: "",
        email: "",
        phone: "",
        studentName: "",
        grade: "",
        message: "",
      });
    } catch  {
      setFormStatus({ type: "error", message: "Failed to submit inquiry. Please try again." });
    }
  };

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {heroContent.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1200 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={item.image}
                layout="fill"
                objectFit="cover"
                alt="Admission Hero Image"
                className="transform scale-105 transition-transform duration-15000"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A3C34] opacity-75"></div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-24 text-center max-w-7xl w-full px-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-5xl md:text-7xl font-semibold tracking-tight"
              >
                {item.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto"
              >
                {item.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mt-10"
              >
                {/* <button className="bg-[#EAB308] text-gray-900 px-10 py-5 rounded-full font-semibold text-lg shadow-xl hover:bg-[#D4A017] transition-all duration-300 transform hover:scale-105">
                  Submit Inquiry
                </button> */}
              </motion.div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4">
          {heroContent.map((_, index) => (
            <span
              key={index}
              className={`w-6 h-6 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentIndex ? "bg-[#EAB308] scale-125" : "bg-gray-400 opacity-70"
              }`}
              onClick={() => handleIndicatorClick(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* Admission Process Steps */}
      <div className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mt-16 relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 bg-[#EAB308] h-full opacity-30 hidden lg:block"></div>
            {/* Steps */}
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 relative ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                <div className="relative group z-10">
                  <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(234,179,8,0.3)]">
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-16 h-16 bg-[#EAB308] text-gray-900 rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">
                        {step.number}
                      </span>
                      <div className="ml-6">
                        <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                        <p className="mt-4 text-gray-300 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative group z-10">
                  <Image
                    alt={step.title}
                    src={step.image}
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_10px_30px_rgba(234,179,8,0.3)]"
                  />
                  <div className="absolute inset-0 bg-[#EAB308] opacity-0 group-hover:opacity-15 rounded-2xl transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Inquiry Form Section */}
      <div className="py-24 bg-[#1A3C34]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-center"
          >
            Submit Your Inquiry
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-6 text-lg text-gray-200 text-center max-w-3xl mx-auto"
          >
            Start the admission process by filling out this form. Our team will reach out with personalized guidance.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-12 bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto"
          >
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Parent’s Name <span className="text-red

-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="mt-2 w-full p-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="mt-2 w-full p-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="mt-2 w-full p-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Student’s Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    placeholder="Enter student’s name"
                    className="mt-2 w-full p-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300">Grade Applying For</label>
                  <select
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="mt-2 w-full p-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
                  >
                    <option value="">Select a grade</option>
                    <option value="Nursery">Nursery</option>
                    <option value="Kindergarten">Kindergarten</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300">Additional Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Any additional information or questions"
                    className="mt-2 w-full p-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#EAB308] h-32 resize-none"
                  ></textarea>
                </div>
              </div>
              {formStatus && (
                <div
                  className={`mt-6 p-4 rounded-lg text-center ${
                    formStatus.type === "success" ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {formStatus.message}
                </div>
              )}
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  className="bg-[#EAB308] text-gray-900 px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-[#D4A017] transition-all duration-300 transform hover:scale-105"
                >
                  Submit Inquiry
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
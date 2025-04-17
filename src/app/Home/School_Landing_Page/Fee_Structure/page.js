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

const feeData = {
  Nursery: {
    tuition: 50000,
    admission: 10000,
    uniform: 5000,
    books: 3000,
    transportation: 8000,
    activity: 2000,
    examination: 1000,
    gstPercentage: 18,
  },
  LKG: {
    tuition: 52000,
    admission: 10000,
    uniform: 5000,
    books: 3500,
    transportation: 8000,
    activity: 2000,
    examination: 1000,
    gstPercentage: 18,
  },
  UKG: {
    tuition: 54000,
    admission: 10000,
    uniform: 5000,
    books: 4000,
    transportation: 8000,
    activity: 2000,
    examination: 1000,
    gstPercentage: 18,
  },
  "Grade 1": {
    tuition: 60000,
    admission: 12000,
    uniform: 6000,
    books: 5000,
    transportation: 10000,
    activity: 3000,
    examination: 1500,
    gstPercentage: 18,
  },
  "Grade 2": {
    tuition: 62000,
    admission: 12000,
    uniform: 6000,
    books: 5500,
    transportation: 10000,
    activity: 3000,
    examination: 1500,
    gstPercentage: 18,
  },
  "Grade 3": {
    tuition: 64000,
    admission: 12000,
    uniform: 6000,
    books: 6000,
    transportation: 10000,
    activity: 3000,
    examination: 1500,
    gstPercentage: 18,
  },
  "Grade 4": {
    tuition: 66000,
    admission: 12000,
    uniform: 6000,
    books: 6500,
    transportation: 10000,
    activity: 3000,
    examination: 1500,
    gstPercentage: 18,
  },
  "Grade 5": {
    tuition: 68000,
    admission: 12000,
    uniform: 6000,
    books: 7000,
    transportation: 10000,
    activity: 3000,
    examination: 1500,
    gstPercentage: 18,
  },
  "Grade 6": {
    tuition: 72000,
    admission: 15000,
    uniform: 7000,
    books: 8000,
    transportation: 12000,
    activity: 4000,
    examination: 2000,
    gstPercentage: 18,
  },
  "Grade 7": {
    tuition: 74000,
    admission: 15000,
    uniform: 7000,
    books: 8500,
    transportation: 12000,
    activity: 4000,
    examination: 2000,
    gstPercentage: 18,
  },
  "Grade 8": {
    tuition: 76000,
    admission: 15000,
    uniform: 7000,
    books: 9000,
    transportation: 12000,
    activity: 4000,
    examination: 2000,
    gstPercentage: 18,
  },
  "Grade 9": {
    tuition: 82000,
    admission: 18000,
    uniform: 8000,
    books: 10000,
    transportation: 14000,
    activity: 5000,
    examination: 2500,
    gstPercentage: 18,
  },
  "Grade 10": {
    tuition: 85000,
    admission: 18000,
    uniform: 8000,
    books: 11000,
    transportation: 14000,
    activity: 5000,
    examination: 2500,
    gstPercentage: 18,
  },
  "Grade 11": {
    tuition: 90000,
    admission: 20000,
    uniform: 9000,
    books: 12000,
    transportation: 16000,
    activity: 6000,
    examination: 3000,
    gstPercentage: 18,
  },
  "Grade 12": {
    tuition: 95000,
    admission: 20000,
    uniform: 9000,
    books: 13000,
    transportation: 16000,
    activity: 6000,
    examination: 3000,
    gstPercentage: 18,
  },
};

const calculateFees = (classData) => {
  const subtotal =
    classData.tuition +
    classData.admission +
    classData.uniform +
    classData.books +
    classData.transportation +
    classData.activity +
    classData.examination;
  const gstAmount = (subtotal * classData.gstPercentage) / 100;
  const grandTotal = subtotal + gstAmount;
  return { subtotal, gstAmount, grandTotal };
};

const faqs = [
  {
    question: "What does the tuition fee cover?",
    answer:
      "The tuition fee includes academic instruction, access to digital resources, and participation in standard school activities.",
  },
  {
    question: "Is the admission fee refundable?",
    answer:
      "The admission fee is non-refundable once enrollment is confirmed.",
  },
  {
    question: "Are transportation and activity fees mandatory?",
    answer:
      "Transportation and activity fees are optional and depend on whether you opt for school transport or extracurricular activities.",
  },
  {
    question: "Can fees be paid in installments?",
    answer:
      "Yes, we offer flexible payment plans. Contact our admissions office for details.",
  },
  {
    question: "How is GST applied?",
    answer:
      "An 18% GST is applied to the subtotal of all fees, as per government regulations.",
  },
];

export default function FeeStructure() {
  const [selectedClass, setSelectedClass] = useState("Nursery");
  const [activeFaq, setActiveFaq] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const classData = feeData[selectedClass];
  const { subtotal, gstAmount, grandTotal } = calculateFees(classData);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroContent.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <div className="relative w-full h-[800px] overflow-hidden">
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
                alt="Fee Structure Hero Image"
                className="transform scale-105 transition-transform duration-15000"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-75"></div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-24 text-center max-w-7xl w-full px-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900"
              >
                {item.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-gray-700"
              >
                {item.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mt-10"
              >
                <button className="bg-[#D4A017] text-white px-10 py-5 rounded-full font-semibold text-lg shadow-xl hover:bg-[#B88C14] transition-all duration-300 transform hover:scale-105">
                  View Fee Structure
                </button>
              </motion.div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4">
          {heroContent.map((_, index) => (
            <span
              key={index}
              className={`w-6 h-6 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentIndex ? "bg-[#D4A017] scale-125" : "bg-gray-300 opacity-70"
              }`}
              onClick={() => handleIndicatorClick(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* Fee Breakdown Section */}
      <div className="py-24 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-center text-gray-900"
          >
            Fee Structure by Class
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-6 text-lg text-gray-600 text-center max-w-3xl mx-auto"
          >
            Select a class to view the detailed fee structure, including all applicable fees and GST.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 max-w-md mx-auto"
          >
            <select
              value={selectedClass}
              onChange={handleClassChange}
              className="w-full p-3 rounded-lg bg-white text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4A017]"
            >
              {Object.keys(feeData).map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </select>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-12 bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto"
          >
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 px-6 text-lg font-semibold text-[#D4A017]">
                    Fee Component
                  </th>
                  <th className="py-4 px-6 text-lg font-semibold text-[#D4A017] text-right">
                    Amount (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-300">
                  <td className="py-4 px-6">Tuition Fee</td>
                  <td className="py-4 px-6 text-right">{classData.tuition.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-300">
                  <td className="py-4 px-6">Admission Fee</td>
                  <td className="py-4 px-6 text-right">{classData.admission.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-300">
                  <td className="py-4 px-6">Uniform Fee</td>
                  <td className="py-4 px-6 text-right">{classData.uniform.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-300">
                  <td className="py-4 px-6">Books Fee</td>
                  <td className="py-4 px-6 text-right">{classData.books.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-300">
                  <td className="py-4 px-6">Transportation Fee</td>
                  <td className="py-4 px-6 text-right">{classData.transportation.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-300">
                  <td className="py-4 px-6">Activity Fee</td>
                  <td className="py-4 px-6 text-right">{classData.activity.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-300">
                  <td className="py-4 px-6">Examination Fee</td>
                  <td className="py-4 px-6 text-right">{classData.examination.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-300">
                  <td className="py-4 px-6 font-semibold">Subtotal</td>
                  <td className="py-4 px-6 text-right font-semibold">{subtotal.toLocaleString()}</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-300">
                  <td className="py-4 px-6">GST ({classData.gstPercentage}%)</td>
                  <td className="py-4 px-6 text-right">{gstAmount.toLocaleString()}</td>
                </tr>
                <tr className="hover:bg-gray-100 transition-colors duration-300">
                  <td className="py-4 px-6 text-lg font-bold">Grand Total</td>
                  <td className="py-4 px-6 text-right text-lg font-bold text-[#D4A017]">
                    {grandTotal.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-center text-gray-900"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-6 text-lg text-gray-600 text-center max-w-3xl mx-auto"
          >
            Find answers to common questions about our fee structure across all classes.
          </motion.p>
          <div className="mt-12 max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  <span className="text-[#D4A017] text-xl">
                    {activeFaq === index ? "−" : "+"}
                  </span>
                </button>
                {activeFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 pt-0 text-gray-600"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-24 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Start Your Child’s Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto"
          >
            With our transparent fee structure, enroll your child in a world-class education. Apply online or contact us today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 flex justify-center gap-6"
          >
            <button className="bg-[#D4A017] text-white px-10 py-5 rounded-full font-semibold text-lg shadow-xl hover:bg-[#B88C14] transition-all duration-300 transform hover:scale-105">
              Apply Online
            </button>
            <button className="border-2 border-[#D4A017] text-[#D4A017] px-10 py-5 rounded-full font-semibold text-lg hover:bg-[#D4A017] hover:text-white transition-all duration-300 transform hover:scale-105">
              Contact Admissions
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
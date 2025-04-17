"use client";

import { useState, useEffect } from "react";
import { executeQuery, executeMutation } from "../../graphqlClient";
import { UPDATE_NURSERY_ADMISSION_LIST_MUTATION } from "../../mutation/NurseryAdmissionMutation/updateNurseryAdmissionMutation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft } from "react-icons/fa";

// Updated GraphQL query with consistent field names
const GET_NURSERY_ADMISSION_DATA = `
  query {
    getNurseryAdmissionList {
       z_id
      student_id
      first_name
      middle_name
      last_name
      gender
      date_of_birth
      blood_group
      adhar_no
      category
      mother_tangue
      father_full_name
      mother_full_name
      father_work
      mother_work
      guardian_whatsapp_number
      guardian_mobile_number
      guardian_email_id
      guardian_religion
      guardian_annual_income
      permanent_address
      permanent_address_nearest_policestation
      permanent_address_nearest_landmark
      permanent_address_state
      permanent_address_district
      permanent_address_tehsil
      permanent_address_post_office
      permanent_address_pincode
      permanent_address_type
      nationality
      current_address
      current_address_nearest_policestation
      current_address_nearest_landmark
      current_address_state
      current_address_district
      current_address_tehsil
      current_address_post_office
      current_address_pincode
      current_address_type
      country
      student_profile_image
      student_aadhar_front
      student_aadhar_back
      father_aadhar_front
      father_aadhar_back
      mother_aadhar_front
      mother_aadhar_back
      student_birth_certificate
      payment_id
      payment_status
      payment_transaction_id
      payment_date
      total_fees
      paid_amount
      payment_method
      cdate
      ctime
      udate
      utime
      success_msg
      error_msg
    }
  }
`;

// Hardcoded fee structure for different classes
const CLASS_FEES = {
  Nursery: { tuition: 10000, admission: 5000, uniform: 2000, books: 1500, gstPercentage: 18 },
  LKG: { tuition: 12000, admission: 5500, uniform: 2200, books: 1700, gstPercentage: 18 },
  UKG: { tuition: 13000, admission: 5500, uniform: 2200, books: 1800, gstPercentage: 18 },
  "1st": { tuition: 15000, admission: 6000, uniform: 2500, books: 2000, gstPercentage: 18 },
  "2nd": { tuition: 16000, admission: 6000, uniform: 2500, books: 2100, gstPercentage: 18 },
  "3rd": { tuition: 17000, admission: 6500, uniform: 2600, books: 2200, gstPercentage: 18 },
  "4th": { tuition: 18000, admission: 6500, uniform: 2600, books: 2300, gstPercentage: 18 },
  "5th": { tuition: 19000, admission: 7000, uniform: 2700, books: 2400, gstPercentage: 18 },
  "6th": { tuition: 20000, admission: 7000, uniform: 2700, books: 2500, gstPercentage: 18 },
  "7th": { tuition: 21000, admission: 7500, uniform: 2800, books: 2600, gstPercentage: 18 },
  "8th": { tuition: 22000, admission: 7500, uniform: 2800, books: 2700, gstPercentage: 18 },
  "9th": { tuition: 23000, admission: 8000, uniform: 2900, books: 2800, gstPercentage: 18 },
  "10th": { tuition: 24000, admission: 8000, uniform: 2900, books: 2900, gstPercentage: 18 },
  "11th": { tuition: 26000, admission: 8500, uniform: 3000, books: 3100, gstPercentage: 18 },
  "12th": { tuition: 28000, admission: 8500, uniform: 3000, books: 3200, gstPercentage: 18 },
};

// Calculate fees for a given class
const calculateFees = (className) => {
  const fees = CLASS_FEES[className];
  const subtotal = fees.tuition + fees.admission + fees.uniform + fees.books;
  const gst = (subtotal * fees.gstPercentage) / 100;
  const grandTotal = subtotal + gst;
  return {
    tuition: fees.tuition,
    admission: fees.admission,
    uniform: fees.uniform,
    books: fees.books,
    gst,
    grandTotal,
  };
};

const AdmissionPayment = () => {
  const [studentId, setStudentId] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [allStudents, setAllStudents] = useState([]);
  const [errors, setErrors] = useState({});
  const [selectedClass, setSelectedClass] = useState("Nursery");
  const [paymentProcessed, setPaymentProcessed] = useState(false);

  // Fetch all student data on page load
  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const response = await executeQuery(GET_NURSERY_ADMISSION_DATA);
        const students = response?.getNurseryAdmissionList || [];
        setAllStudents(students);
      } catch (error) {
        console.error("Error fetching students:", error);
        toast.error("Error fetching student data. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };
    fetchAllStudents();
  }, []);

  // Fetch student details from local data
  const handleFetchStudent = (e) => {
    e.preventDefault();
    if (!studentId) {
      setErrors({ studentId: "Student ID is required." });
      toast.error("Please enter a Student ID.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const student = allStudents.find((s) => s.student_id === studentId);
    if (!student) {
      setErrors({ studentId: "No student found with this ID." });
      toast.error("No student found with this ID.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setStudentData(student);
    setErrors({});
    toast.success("Student details fetched successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // Handle payment processing
  const handlePayNow = async () => {
    if (!studentData) {
      toast.error("Please fetch student details before proceeding with payment.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (studentData.payment_status === "Completed") {
      toast.error("Payment has already been completed for this student.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const fees = calculateFees(selectedClass);
    const paymentData = {
      payment_id: `PAY${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      payment_status: "Completed",
      payment_transaction_id: `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      payment_date: new Date().toISOString().split("T")[0],
      total_fees: String(fees.grandTotal),
      paid_amount: String(fees.grandTotal),
      payment_method: "Online",
    };

    try {
      const mutationData = {
        z_id: studentData.z_id,
        ...paymentData,
      };

      const response = await executeMutation(UPDATE_NURSERY_ADMISSION_LIST_MUTATION, mutationData);

      if (response?.errors || response?.error_msg) {
        const errorMessage = response?.error_msg || response?.errors[0]?.message || "An error occurred.";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      setPaymentProcessed(true);
      setStudentData((prev) => ({ ...prev, ...paymentData }));
      setAllStudents((prev) =>
        prev.map((s) => (s.student_id === studentData.student_id ? { ...s, ...paymentData } : s))
      );
      toast.success(`Payment successful! Payment ID: ${paymentData.payment_id}`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Error processing payment.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const fees = calculateFees(selectedClass);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 flex justify-center mt-32">
      <ToastContainer />
      <div className="max-w-7xl w-full bg-white p-8 shadow-xl border border-gray-200">
        <div className="flex items-center justify-between gap-4 mb-10">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-1 p-2 pr-4 bg-red-500 text-white hover:bg-red-600 transition"
          >
            <FaArrowLeft size={20} />
            Go Back
          </button>
          <h1 className="text-2xl font-semibold">Admission Payment</h1>
        </div>

        {/* Fetch Student Form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Fetch Student Details</h2>
          <form onSubmit={handleFetchStudent} className="flex gap-4 items-center">
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-600">
                Student ID<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter Student ID"
              />
              {errors.studentId && <p className="text-red-600 mt-1">{errors.studentId}</p>}
            </div>
            <button
              type="submit"
              className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Fetch Details
            </button>
          </form>
        </div>

        {/* Student Details */}
        {studentData && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Student Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">Full Name</label>
                <p className="mt-2 p-3 bg-gray-100 rounded-md">
                  {studentData.first_name} {studentData.middle_name} {studentData.last_name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
                <p className="mt-2 p-3 bg-gray-100 rounded-md">{studentData.date_of_birth}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Gender</label>
                <p className="mt-2 p-3 bg-gray-100 rounded-md">{studentData.gender}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Aadhar Number</label>
                <p className="mt-2 p-3 bg-gray-100 rounded-md">{studentData.adhar_no}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Caste</label>
                <p className="mt-2 p-3 bg-gray-100 rounded-md">{studentData.category}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Religion</label>
                <p className="mt-2 p-3 bg-gray-100 rounded-md">{studentData.country}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Father's Name</label>
                <p className="mt-2 p-3 bg-gray-100 rounded-md">{studentData.father_full_name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Mother's Name</label>
                <p className="mt-2 p-3 bg-gray-100 rounded-md">{studentData.mother_full_name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Father's Email</label>
                <p className="mt-2 p-3 bg-gray-100 rounded-md">{studentData.guardian_email_id}</p>
              </div>
            </div>
          </div>
        )}

        {/* Fee Structure */}
        {studentData && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Admission Fee Payment</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Select Class<span className="text-red-600">*</span>
              </label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full md:w-1/3 p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                {Object.keys(CLASS_FEES).map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>
            <div className="border p-6 bg-gray-50">
              {["Tuition", "Admission", "Uniform", "Books"].map((item, index) => (
                <div key={index} className="flex justify-between mb-2 text-lg">
                  <span>{item} Fee</span>
                  <span>₹{fees[item.toLowerCase()]}</span>
                </div>
              ))}
              <div className="flex justify-between mb-2 text-lg">
                <span>GST ({CLASS_FEES[selectedClass].gstPercentage}%)</span>
                <span>₹{fees.gst}</span>
              </div>
              <div className="border-t border-dashed border-gray-400 my-4"></div>
              <div className="flex justify-between text-2xl font-bold text-green-600">
                <span>Grand Total</span>
                <span>₹{fees.grandTotal}</span>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="mt-6 w-full md:w-1/3 bg-green-500 text-white py-2 rounded-md shadow-lg text-base hover:bg-green-600 transition duration-200 disabled:bg-gray-400"
                onClick={handlePayNow}
                disabled={paymentProcessed || studentData?.payment_status === "Completed"}
              >
                {paymentProcessed || studentData?.payment_status === "Completed" ? "Payment Completed" : "Pay Now"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionPayment;
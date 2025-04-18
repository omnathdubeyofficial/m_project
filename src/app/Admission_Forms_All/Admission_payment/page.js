"use client";

import { useState, useEffect, useMemo } from "react";
import { executeQuery, executeMutation } from "../../graphqlClient";
import { UPDATE_NURSERY_ADMISSION_LIST_MUTATION } from "../../mutation/NurseryAdmissionMutation/updateNurseryAdmissionMutation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft, FaSpinner, FaCheckCircle, FaDownload } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// GraphQL query with class_title
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
      class_title
    }
  }
`;

// Hardcoded fee structure
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

// Calculate fees
const calculateFees = (className) => {
  const fees = CLASS_FEES[className] || CLASS_FEES["Nursery"];
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
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);

  // Fetch all student data on page load
  useEffect(() => {
    const fetchAllStudents = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllStudents();
  }, []);

  // Validate student ID
  const isValidStudentId = (id) => /^[A-Za-z0-9]+$/.test(id);

  // Fetch student details
  const handleFetchStudent = async (e) => {
    e.preventDefault();
    if (!studentId) {
      setErrors({ studentId: "Student ID is required." });
      toast.error("Please enter a Student ID.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (!isValidStudentId(studentId)) {
      setErrors({ studentId: "Student ID must be alphanumeric." });
      toast.error("Student ID must be alphanumeric.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsFetching(true);
    const student = allStudents.find((s) => s.student_id === studentId);
    if (!student) {
      setErrors({ studentId: "No student found with this ID." });
      toast.error("No student found with this ID.", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsFetching(false);
      return;
    }

    setStudentData(student);
    setErrors({});
    toast.success("Student details fetched successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
    setIsFetching(false);
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

    setShowModal(true);
  };

  const confirmPayment = async () => {
    setIsLoading(true);
    const classTitle = studentData.class_title || "Nursery";
    const fees = calculateFees(classTitle);
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
        setIsLoading(false);
        setShowModal(false);
        return;
      }

      setPaymentProcessed(true);
      setStudentData((prev) => ({ ...prev, ...paymentData }));
      setAllStudents((prev) =>
        prev.map((s) => (s.student_id === studentData.student_id ? { ...s, ...paymentData } : s))
      );
      setPaymentDetails(paymentData);
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
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  // Download receipt
  const downloadReceipt = () => {
    if (!paymentDetails) return;
    const receiptContent = `
      Payment Receipt
      Student ID: ${studentData.student_id}
      Student Name: ${studentData.first_name} ${studentData.last_name}
      Class: ${studentData.class_title || "Nursery"}
      Payment ID: ${paymentDetails.payment_id}
      Transaction ID: ${paymentDetails.payment_transaction_id}
      Date: ${paymentDetails.payment_date}
      Total Amount: ₹${paymentDetails.total_fees}
      Status: ${paymentDetails.payment_status}
    `;
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt_${paymentDetails.payment_id}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Memoize fees calculation
  const fees = useMemo(
    () => calculateFees(studentData?.class_title || "Nursery"),
    [studentData?.class_title]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 mt-16 lg:px-8 flex justify-center items-center">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-16 max-w-5xl w-full bg-white/80 backdrop-blur-md shadow-2xl p-8 sm:p-10 border border-gray-100/50"
      >
{/* Header */}
<div className="flex items-center justify-between flex-wrap gap-2 mb-6">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => window.history.back()}
    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-500 text-white hover:bg-red-600 transition-all duration-200 text-xs sm:text-sm"
    aria-label="Go back"
  >
    <FaArrowLeft size={14} className="sm:size-[16px]" />
    <span className="font-medium">Go Back</span>
  </motion.button>

  <h1 className="text-xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
    Admission Payment
  </h1>
</div>

        {/* Fetch Student Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Fetch Student Details</h2>
          <form onSubmit={handleFetchStudent} className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div className="w-full sm:w-1/2">
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
                Student ID <span className="text-red-500">*</span>
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                id="studentId"
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className={`w-full p-3 border ${
                  errors.studentId ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 bg-white/50`}
                placeholder="Enter Student ID"
                aria-invalid={!!errors.studentId}
                aria-describedby={errors.studentId ? "studentId-error" : undefined}
              />
              {errors.studentId && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-1"
                  id="studentId-error"
                >
                  {errors.studentId}
                </motion.p>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white py-3 px-6 hover:bg-blue-700 transition-all duration-200 flex items-center justify-center disabled:bg-blue-400"
              disabled={isFetching}
            >
              {isFetching ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Fetching...
                </>
              ) : (
                "Fetch Details"
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center py-10"
          >
            <FaSpinner className="animate-spin text-blue-500 text-4xl" />
          </motion.div>
        )}

        {/* Student Details */}
        {studentData && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Student Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: "Full Name", value: `${studentData.first_name} ${studentData.middle_name} ${studentData.last_name}` },
                { label: "Date of Birth", value: studentData.date_of_birth },
                { label: "Gender", value: studentData.gender },
                { label: "Aadhar Number", value: studentData.adhar_no },
                { label: "Caste", value: studentData.category },
                { label: "Religion", value: studentData.country },
                { label: "Father's Name", value: studentData.father_full_name },
                { label: "Mother's Name", value: studentData.mother_full_name },
                { label: "Guardian's Email", value: studentData.guardian_email_id },
                { label: "Class", value: studentData.class_title || "Nursery" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700">{item.label}</label>
                  <p className="mt-2 p-3 bg-gray-100/50 text-gray-800 border border-gray-200">{item.value || "N/A"}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Fee Structure */}
        {studentData && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admission Fee Payment</h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border border-gray-200 p-6 bg-white/50 backdrop-blur-sm"
            >
              {["Tuition", "Admission", "Uniform", "Books"].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  className="flex justify-between mb-3 text-lg text-gray-700"
                >
                  <span>{item} Fee</span>
                  <span>₹{fees[item.toLowerCase()].toLocaleString()}</span>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="flex justify-between mb-3 text-lg text-gray-700"
              >
                <span>GST ({CLASS_FEES[studentData?.class_title || "Nursery"].gstPercentage}%)</span>
                <span>₹{fees.gst.toLocaleString()}</span>
              </motion.div>
              <div className="border-t border-dashed border-gray-300 my-4"></div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="flex justify-between text-2xl font-semibold text-green-600"
              >
                <span>Grand Total</span>
                <span>₹{fees.grandTotal.toLocaleString()}</span>
              </motion.div>
            </motion.div>
            <div className="flex justify-center mt-8 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="w-full sm:w-1/3 bg-green-500 text-white py-3 shadow-lg text-lg font-medium hover:bg-green-600 transition-all duration-200 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handlePayNow}
                disabled={paymentProcessed || studentData?.payment_status === "Completed" || isLoading}
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : paymentProcessed || studentData?.payment_status === "Completed" ? (
                  <>
                    <FaCheckCircle className="mr-2" />
                    Payment Completed
                  </>
                ) : (
                  "Pay Now"
                )}
              </motion.button>
              {paymentProcessed && paymentDetails && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={downloadReceipt}
                  className="w-full sm:w-1/3 bg-blue-500 text-white py-3 shadow-lg text-lg font-medium hover:bg-blue-600 transition-all duration-200 flex items-center justify-center"
                >
                  <FaDownload className="mr-2" />
                  Download Receipt
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* Payment Confirmation Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white p-8 max-w-md w-full shadow-2xl"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Confirm Payment</h3>
                <p className="text-gray-600 mb-6">
                  You are about to pay ₹{fees.grandTotal.toLocaleString()} for {studentData.first_name}{" "}
                  {studentData.last_name}'s admission to {studentData.class_title || "Nursery"}. Proceed?
                </p>
                <div className="flex justify-end gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400 transition-all duration-200"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={confirmPayment}
                    className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 transition-all duration-200 flex items-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      "Confirm"
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AdmissionPayment;
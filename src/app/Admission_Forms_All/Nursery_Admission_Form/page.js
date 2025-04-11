"use client";

import { useState, useRef } from "react";
import { executeMutation } from "../../graphqlClient";
import { CREATE_NURSERY_ADMISSION_LIST_MUTATION } from "../../mutation/NurseryAdmissionMutation/createNurseryAdmissionListMutation";
import { ArrowLeft, FileText, File, Trash2, Edit, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaUpload, FaSave, FaTimes, FaArrowLeft } from "react-icons/fa";



// Hardcoded Nursery Fee Structure
const NURSERY_FEES = {
  tuition: 10000,
  admission: 5000,
  uniform: 2000,
  books: 1500,
  gstPercentage: 18,
};

// Calculate total and GST
const calculateFees = () => {
  const subtotal = NURSERY_FEES.tuition + NURSERY_FEES.admission + NURSERY_FEES.uniform + NURSERY_FEES.books;
  const gst = (subtotal * NURSERY_FEES.gstPercentage) / 100;
  const grandTotal = subtotal + gst;
  return {
    tuition: NURSERY_FEES.tuition,
    admission: NURSERY_FEES.admission,
    uniform: NURSERY_FEES.uniform,
    books: NURSERY_FEES.books,
    gst,
    grandTotal,
  };
};

const Nursery_Admission_Form = () => {
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
    permanent_address: "",
    previous_school: "",
    highest_qualification: "",
    percentage: "",
    entrance_exam_score: "",
    father_name: "",
    father_contact_no: "",
    father_email: "",
    relationship: "",
    profile_image: "",
    desired_class: "",
    previous_year_of_passing: "",
    board: "",
    father_whatsapp_no: "",
    father_occupation: "",
    mother_name: "",
    mother_occupation: "",
    guardian_name: "",
    guardian_contact_no: "",
    guardian_email: "",
    guardian_occupation: "",
    number_of_brothers: "",
    brother_occupation: "",
    blood_group: "",
    religion: "",
    annual_income: "",
    category: "",
    admission_status: "",
    mother_tongue: "",
    current_address: "",
    permanent_address_nearest_police_station: "",
    current_address_nearest_police_station: "",
    permanent_address_nearest_landmark: "",
    current_address_nearest_landmark: "",
    permanent_address_state: "",
    current_address_state: "",
    permanent_address_district: "",
    current_address_district: "",
    permanent_address_tehsil: "",
    current_address_tehsil: "",
    permanent_address_post_office: "",
    current_address_post_office: "",
    permanent_address_pincode: "",
    permanent_address_type: "",
    current_address_type: "",
    nationality: "",
    country: "",
    adhar_front_img: "",
    adhar_back_img: "",
    previous_year_marksheet: "",
    income_certificate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value ?? "", 
    });
  };

  const [paymentId, setPaymentId] = useState(null);


  const GST_PERCENTAGE = 18;

  const [permanentState, setPermanentState] = useState('');
  const [currentState, setCurrentState] = useState('');
  const [permanentDistrict, setPermanentDistrict] = useState('');
  const [currentDistrict, setCurrentDistrict] = useState('');
  const [permanentPostOffice, setPermanentPostOffice] = useState('');
  const [currentPostOffice, setCurrentPostOffice] = useState('');
  const [permanentPincode, setPermanentPincode] = useState('');
  const [currentPincode, setCurrentPincode] = useState('');

  // Sample data with Pincode mapping
  const stateDistrictData = {
    "Uttar Pradesh": {
      "Lucknow": {
        tehsils: ["Sadar", "Malihabad", "Mohanlalganj"],
        postOffices: {
          "Aliganj": "226024",
          "Gomti Nagar": "226010",
          "Hazratganj": "226001"
        },
      },
      "Varanasi": {
        tehsils: ["Pindra", "Sadar", "Rohaniya"],
        postOffices: {
          "Bhelupur": "221005",
          "Lanka": "221007",
          "Sigra": "221010"
        },
      },
    },
    "Maharashtra": {
      "Mumbai": {
        tehsils: ["Mumbai City", "Andheri", "Borivali"],
        postOffices: {
          "Colaba": "400005",
          "Dadar": "400014",
          "Goregaon": "400062"
        },
      },
      "Pune": {
        tehsils: ["Haveli", "Baramati", "Junnar"],
        postOffices: {
          "Shivajinagar": "411005",
          "Kothrud": "411038",
          "Hadapsar": "411028"
        },
      },
    },
  };

  // State Change Handlers
  const handlePermanentStateChange = (e) => {
    setPermanentState(e.target.value);
    setPermanentDistrict('');
    setPermanentPostOffice('');
    setPermanentPincode('');
  };

  const handleCurrentStateChange = (e) => {
    setCurrentState(e.target.value);
    setCurrentDistrict('');
    setCurrentPostOffice('');
    setCurrentPincode('');
  };

  // District Change Handlers
  const handlePermanentDistrictChange = (e) => {
    setPermanentDistrict(e.target.value);
    setPermanentPostOffice('');
    setPermanentPincode('');
  };

  const handleCurrentDistrictChange = (e) => {
    setCurrentDistrict(e.target.value);
    setCurrentPostOffice('');
    setCurrentPincode('');
  };

  // Post Office Change Handlers
  const handlePermanentPostOfficeChange = (e) => {
    const postOffice = e.target.value;
    setPermanentPostOffice(postOffice);
    setPermanentPincode(stateDistrictData[permanentState][permanentDistrict].postOffices[postOffice] || '');
  };

  const handleCurrentPostOfficeChange = (e) => {
    const postOffice = e.target.value;
    setCurrentPostOffice(postOffice);
    setCurrentPincode(stateDistrictData[currentState][currentDistrict].postOffices[postOffice] || '');
  };






  const [errors, setErrors] = useState({});

  const fileInputRefs = {
    student_profile_img: useRef(null),
    student_adhar_front_img: useRef(null),
    student_adhar_back_img: useRef(null),
    father_adhar_front_img: useRef(null),
    father_adhar_back_img: useRef(null),
    mother_adhar_front_img: useRef(null),
    mother_adhar_back_img: useRef(null),
    father_pancard_img: useRef(null),
    student_birth_certificate_img: useRef(null),
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const { name } = e.target;
    if (!file) return;

    // File validation
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, [name]: "Only JPG and PNG files are allowed." }));
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      // 1 MB size limit
      setErrors((prev) => ({ ...prev, [name]: "File size must be under 1 MB." }));
      return;
    }

    setErrors((prev) => ({ ...prev, [name]: null }));

    const formDataUpload = new FormData();
    formDataUpload.append("image", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      const data = await response.json();
      if (data.imageUrl) {
        setFormData((prev) => ({
          ...prev,
          [name]: data.imageUrl,
        }));
      } else {
        setErrors((prev) => ({ ...prev, [name]: "Upload failed." }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, [name]: "Error uploading file." }));
    }
  };

  const handleClearFile = (key) => {
    setFormData({ ...formData, [key]: "" });
    setErrors({ ...errors, [key]: null });
    if (fileInputRefs[key].current) {
      fileInputRefs[key].current.value = "";
    }
  };




  
  const handlePayNow = () => {
    if (!formData.student_profile_img || !formData.student_adhar_front_img || !formData.student_adhar_back_img) {
      alert("Please upload all required documents before proceeding with payment.");
      return;
    }
    const generatedPaymentId = `PAY${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setPaymentId(generatedPaymentId);
    setFormData({
      ...formData,
      payment_id: generatedPaymentId,
      payment_status: "Completed",
      payment_transaction_id: `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      payment_date: new Date().toISOString().split("T")[0],
      paid_amount: formData.total_fees,
      due_amount: "0",
    });
    alert(`Payment successful! Payment ID: ${generatedPaymentId}`);
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "first_name",
      "last_name",
      "adhar_num",
      "father_name",
      "mother_name",
      "father_contact_num",
      "father_email",
      "father_occupation",
      "dob",
      "gender",
      "permanent_address",
      "current_address",
      "city",
      "state",
      "pincode",
      "nationality",
      "religion",
      "caste",
      "student_profile_img",
      "student_adhar_front_img",
      "student_adhar_back_img",
      "payment_id",
      "payment_method",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/_/g, " ")} is required.`;
      }
    });

    if (formData.father_email && !/\S+@\S+\.\S+/.test(formData.father_email)) {
      newErrors.father_email = "Please enter a valid email address.";
    }

    if (formData.adhar_num && !/^\d{12}$/.test(formData.adhar_num)) {
      newErrors.adhar_num = "Aadhar number must be 12 digits.";
    }

    if (formData.father_contact_num && !/^\d{10}$/.test(formData.father_contact_num)) {
      newErrors.father_contact_num = "Contact number must be 10 digits.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!paymentId) {
      alert("Please complete the payment before submitting the application.");
      return;
    }

    try {
      const response = await executeMutation(CREATE_NURSERY_ADMISSION_LIST_MUTATION, {
        ...formData,
        gender: formData.gender.toLowerCase() ?? "other",
      });

      if (response?.errors || response?.error_msg) {
        setPopupMessage(response?.error_msg || response?.errors[0]?.message || "An error occurred.");
        setIsSuccess(false);
        setShowPopup(true);
        return;
      }

      setPopupMessage(response?.success_msg || "Admission form submitted successfully!");
      setIsSuccess(true);
      setShowPopup(true);
      setFormData({
        first_name: "",
        middle_name: "",
        last_name: "",
        adhar_num: "",
        father_name: "",
        mother_name: "",
        father_contact_num: "",
        father_email: "",
        father_occupation: "",
        dob: "",
        gender: "",
        permanent_address: "",
        current_address: "",
        city: "",
        state: "",
        pincode: "",
        nationality: "",
        religion: "",
        caste: "",
        admission_status: "Pending",
        admission_fee: String(NURSERY_FEES.admission),
        student_adhar_front_img: "",
        student_adhar_back_img: "",
        father_adhar_front_img: "",
        father_adhar_back_img: "",
        mother_adhar_front_img: "",
        mother_adhar_back_img: "",
        father_pancard_img: "",
        student_profile_img: "",
        student_birth_certificate_img: "",
        payment_id: "",
        admission_fees: String(NURSERY_FEES.admission),
        payment_method: "",
        payment_status: "Pending",
        payment_transaction_id: "",
        payment_date: "",
        total_fees: String(calculateFees().grandTotal),
        paid_amount: "0",
        due_amount: String(calculateFees().grandTotal),
      });
      setPaymentId(null);
    } catch (error) {
      setPopupMessage(error.message || "Error submitting form.");
      setIsSuccess(false);
      setShowPopup(true);
    }
  };

  const fees = calculateFees();



  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 flex justify-center mt-32">
      <form onSubmit={handleSubmit} className="max-w-7xl w-full bg-white p-8  shadow-xl border border-gray-200">
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
  Nursery Admission Form
  </h1>
</div>




        {/* Personal Information Section */}
        <div className="mb-8 mt-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Child's Personal Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600">First Name<span className="text-red-600">*</span></label>
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
          <label className="block text-sm font-medium text-gray-600">Last Name<span className="text-red-600">*</span></label>
          <input
            type="text"
            name="last_name"
            required
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Gender<span className="text-red-600">*</span></label>
          <select
            name="gender"
            required
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Date of Birth<span className="text-red-600">*</span></label>
          <input
            type="date"
            name="date_of_birth"
            required
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Blood Group</label>
          <select
            name="blood_group"
            // required
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Aadhar Number<span className="text-red-600">*</span></label>
          <input
            type="text"
            name="adhar_no"
            required
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Category<span className="text-red-600">*</span></label>
          <select
            name="category"
            required
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          >
            <option value="">Select Category</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="EWS">EWS</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Mother Tongue<span className="text-red-600">*</span></label>
          <select
            name="mother_tongue"
            required
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          >
            <option value="">Select Mother Tongue</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Marathi">Marathi</option>
            <option value="Bengali">Bengali</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
            <option value="Kannada">Kannada</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
</div>




 {/* Parent/Guardian Information */}
 <div className="mb-8">
   <h2 className="text-2xl font-semibold text-gray-700 mb-4">Parent/Guardian Information</h2>
   <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

     {/* Father Name */}
     <div>
       <label className="block text-sm font-medium text-gray-600">Father Full Name<span className="text-red-600">*</span></label>
       <input
         type="text"
         name="father_name"
         required
         onChange={handleChange}
         className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       />
     </div>

     {/* Mother Name */}
     <div>
       <label className="block text-sm font-medium text-gray-600">Mother Full Name<span className="text-red-600">*</span></label>
       <input
         type="text"
         name="mother_name"
         required
         onChange={handleChange}
         className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       />
     </div>

     {/* Father Work */}
     <div>
       <label className="block text-sm font-medium text-gray-600">Father's Work<span className="text-red-600">*</span></label>
       <select
         name="father_occupation"
         required
         onChange={handleChange}
         className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       >
         <option value="">Select Work Type</option>
         <option value="job">Private Job</option>
         <option value="government">Government Employee</option>
         <option value="business">Business</option>
       </select>
     </div>

     {/* Mother Work */}
     <div>
       <label className="block text-sm font-medium text-gray-600">Mother's Work<span className="text-red-600">*</span></label>
       <select
         name="mother_occupation"
         required
         onChange={handleChange}
         className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       >
         <option value="">Select Work Type</option>
         <option value="housewife">Housewife</option>
         <option value="job">Private Job</option>
         <option value="government">Government Employee</option>
         <option value="business">Business</option>
       </select>
     </div>

     {/* Parent WhatsApp Number */}
     <div>
       <label className="block text-sm font-medium text-gray-600">Guardian WhatsApp Number<span className="text-red-600">*</span></label>
       <input
         type="tel"
         name="father_whatsapp_no"
         required
         onChange={handleChange}
         className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       />
     </div>

     {/* Parent Mobile Number */}
     <div>
       <label className="block text-sm font-medium text-gray-600">Guardian Mobile Number<span className="text-red-600">*</span></label>
       <input
         type="tel"
         name="father_contact_no"
         required
         onChange={handleChange}
         className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       />
     </div>

     {/* Parent Email ID */}
     <div>
       <label className="block text-sm font-medium text-gray-600">Guardian Email ID<span className="text-red-600">*</span></label>
       <input
         type="email"
         name="father_email"
         required
         onChange={handleChange}
         className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       />
     </div>
       {/* Religion */}
       <div>
       <label className="block text-sm font-medium text-gray-600">Religion<span className="text-red-600">*</span></label>
       <select
         name="religion"
         required
         onChange={handleChange}
         className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       >
         <option value="">Select Religion</option>
         <option value="hindu">Hindu</option>
         <option value="muslim">Muslim</option>
         <option value="christian">Christian</option>
         <option value="sikh">Sikh</option>
         <option value="other">Other</option>
       </select>
     </div>

     {/* Annual Income */}
     <div>
       <label className="block text-sm font-medium text-gray-600">Annual Income<span className="text-red-600">*</span></label>
       <select
         name="annual_income"
         required
         onChange={handleChange}
         className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       >
         <option value="">Select Income Range</option>
         <option value="less_1_lakh">Below 1 Lakh</option>
         <option value="1_5_lakh">1 - 5 Lakh</option>
         <option value="5_10_lakh">5 - 10 Lakh</option>
         <option value="10_20_lakh">10 - 20 Lakh</option>
         <option value="20_plus_lakh">20 Lakh & Above</option>
       </select>
     </div>


   </div>
 </div>


 {/* Address Information */}
 <div className="mb-8">
   <h2 className="text-2xl font-semibold text-gray-700 mb-4">Address Information</h2>
   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
     {/* Permanent Address */}
     <div>
       <label className="block text-sm font-medium text-gray-600">Permanent Address<span className="text-red-600">*</span></label>
       <textarea
         name="permanent_address"
         required
         onChange={handleChange}
         className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       ></textarea>
     </div>

     {/* Current Address */}
     <div>
       <label className="block text-sm font-medium text-gray-600">Current Address<span className="text-red-600">*</span></label>
       <textarea
         name="current_address"
         required
         onChange={handleChange}
         className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       ></textarea>
     </div>


     
      {/* Nearest Police Station */}
      <div>
       <label className="block text-sm font-medium text-gray-600">Permanent Address Nearest Police Station<span className="text-red-600">*</span></label>
       <input
         type="text"
         name="nearest_police_station"
         required
         onChange={handleChange}
         className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       />
     </div>
      <div>
       <label className="block text-sm font-medium text-gray-600">Current Address Nearest Police Station<span className="text-red-600">*</span></label>
       <input
         type="text"
         name="nearest_police_station"
         required
         onChange={handleChange}
         className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       />
     </div>

     {/* Nearest Landmark */}
     <div>
       <label className="block text-sm font-medium text-gray-600">Permanent Address Nearest Landmark<span className="text-red-600">*</span></label>
       <input
         type="text"
         name="nearest_landmark"
         required
         onChange={handleChange}
         className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       />
     </div>
     <div>
       <label className="block text-sm font-medium text-gray-600">Current Address Nearest Landmark<span className="text-red-600">*</span></label>
       <input
         type="text"
         name="nearest_landmark"
         required
         onChange={handleChange}
         className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       />
     </div>

 

      {/* Permanent Address State */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Permanent Address State<span className="text-red-600">*</span></label>
        <select
          name="permanent_state"
          required
          onChange={handlePermanentStateChange}
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        >
          <option value="">Select State</option>
          {Object.keys(stateDistrictData).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Current Address State */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Current Address State<span className="text-red-600">*</span></label>
        <select
          name="current_state"
          required
          onChange={handleCurrentStateChange}
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        >
          <option value="">Select State</option>
          {Object.keys(stateDistrictData).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Permanent Address District */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Permanent Address District<span className="text-red-600">*</span></label>
        <select
          name="permanent_district"
          required
          onChange={handlePermanentDistrictChange}
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        >
          <option value="">Select District</option>
          {permanentState &&
            Object.keys(stateDistrictData[permanentState]).map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
        </select>
      </div>

      {/* Current Address District */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Current Address District<span className="text-red-600">*</span></label>
        <select
          name="current_district"
          required
          onChange={handleCurrentDistrictChange}
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        >
          <option value="">Select District</option>
          {currentState &&
            Object.keys(stateDistrictData[currentState]).map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
        </select>
      </div>

      {/* Permanent Address Tehsil */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Permanent Address Tehsil<span className="text-red-600">*</span></label>
        <select
          name="permanent_tehsil"
          required
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        >
          <option value="">Select Tehsil</option>
          {permanentDistrict &&
            stateDistrictData[permanentState][permanentDistrict].tehsils.map((tehsil) => (
              <option key={tehsil} value={tehsil}>
                {tehsil}
              </option>
            ))}
        </select>
      </div>

      {/* Current Address Tehsil */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Current Address Tehsil<span className="text-red-600">*</span></label>
        <select
          name="current_tehsil"
          required
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        >
          <option value="">Select Tehsil</option>
          {currentDistrict &&
            stateDistrictData[currentState][currentDistrict].tehsils.map((tehsil) => (
              <option key={tehsil} value={tehsil}>
                {tehsil}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Permanent Address Post Office<span className="text-red-600">*</span></label>
        <select
          name="permanent_post_office"
          required
          value={permanentPostOffice}
          onChange={handlePermanentPostOfficeChange}
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Post Office</option>
          {permanentDistrict &&
            Object.keys(stateDistrictData[permanentState][permanentDistrict].postOffices).map((postOffice) => (
              <option key={postOffice} value={postOffice}>
                {postOffice}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Current Address Post Office<span className="text-red-600">*</span></label>
        <select
          name="current_post_office"
          required
          value={currentPostOffice}
          onChange={handleCurrentPostOfficeChange}
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Post Office</option>
          {currentDistrict &&
            Object.keys(stateDistrictData[currentState][currentDistrict].postOffices).map((postOffice) => (
              <option key={postOffice} value={postOffice}>
                {postOffice}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">Permanent Address Pincode<span className="text-red-600">*</span></label>
        <input
          type="text"
          name="permanent_pincode"
          value={permanentPincode}
          readOnly
          className="w-full p-3 mt-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
        />
      </div>

    
    

      <div>
        <label className="block text-sm font-medium text-gray-600">Current Address Pincode<span className="text-red-600">*</span></label>
        <input
          type="text"
          name="current_pincode"
          value={currentPincode}
          readOnly
          className="w-full p-3 mt-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
        />
      </div>

 {/* Permanent Address Type */}
<div>
  <label className="block text-sm font-medium text-gray-600">Permanent Address Type<span className="text-red-600">*</span></label>
  <select
    name="permanent_address_type"
    required
    onChange={handleChange}
    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
  >
    <option value="">Select Address Type</option>
    <option value="owner">Owner</option>
    <option value="rented">Rented</option>
  </select>
</div>

{/* Current Address Type */}
<div>
  <label className="block text-sm font-medium text-gray-600">Current Address Type<span className="text-red-600">*</span></label>
  <select
    name="current_address_type"
    required
    onChange={handleChange}
    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
  >
    <option value="">Select Address Type</option>
    <option value="owner">Owner</option>
    <option value="rented">Rented</option>
  </select>
</div>


   {/* Nationality */}
<div>
  <label className="block text-sm font-medium text-gray-600">Nationality<span className="text-red-600">*</span></label>
  <select
    name="nationality"
    required
    onChange={handleChange}
    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
  >
    <option value="">Select Nationality</option>
    <option value="Indian">Indian</option>
    <option value="American">American</option>
    <option value="British">British</option>
    <option value="Canadian">Canadian</option>
    <option value="Australian">Australian</option>
  </select>
</div>

{/* Country */}
<div>
  <label className="block text-sm font-medium text-gray-600">Country<span className="text-red-600">*</span></label>
  <select
    name="country"
    required
    onChange={handleChange}
    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
  >
    <option value="">Select Country</option>
    <option value="India">India</option>
    <option value="United States">United States</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="Canada">Canada</option>
    <option value="Australia">Australia</option>
  </select>
</div>


     

   </div>
 </div>



 {/* Upload Documents */}
 <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Upload Documents</h2>
          <p className="text-red-600 font-bold mb-4">
            Note: Only JPG and PNG images under 1 MB are allowed. Please ensure the document is clear and readable.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { key: "student_profile_img", label: "Student Profile Image" },
              { key: "student_adhar_front_img", label: "Student Aadhar Front" },
              { key: "student_adhar_back_img", label: "Student Aadhar Back" },
              { key: "father_adhar_front_img", label: "Father Aadhar Front" },
              { key: "father_adhar_back_img", label: "Father Aadhar Back" },
              { key: "mother_adhar_front_img", label: "Mother Aadhar Front" },
              { key: "mother_adhar_back_img", label: "Mother Aadhar Back" },
              { key: "father_pancard_img", label: "Father Pancard" },
              { key: "student_birth_certificate_img", label: "Student Birth Certificate" },
            ].map(({ key, label }) => (
              <div key={key} className="flex flex-col items-center border p-4 w-full relative">
                <span className="font-semibold text-lg">{label}</span>
                <label className="border p-2 w-full flex items-center gap-2 cursor-pointer bg-gray-200 hover:bg-gray-300 mt-2">
                  <FaUpload /> Upload {label}
                  <input
                    type="file"
                    name={key}
                    ref={fileInputRefs[key]}
                    className="hidden"
                    accept="image/jpeg,image/png"
                    onChange={handleFileChange}
                  />
                </label>
                {errors[key] && <p className="text-red-600 mt-1">{errors[key]}</p>}
                {formData[key] && (
                  <div className="relative mt-2">
                    <img src={formData[key]} alt={label} className="w-32 h-32 rounded-lg border object-cover" />
                    <button
                      type="button"
                      onClick={() => handleClearFile(key)}
                      className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>



        
    <div className="col-span-full mt-6 border p-6">
    <h2 className="text-2xl md:text-3xl mb-5 text-left text-gray-700">Admission Fee Payment</h2>

      <div className="border p-6 bg-gray-50">
        {['Tuition', 'Admission', 'Uniform', 'Books'].map((item, index) => (
          <div key={index} className="flex justify-between mb-2 text-lg">
            <span>{item} Fee</span>
            <span>₹{fees[item.toLowerCase()]}</span>
          </div>
        ))}
        <div className="flex justify-between mb-2 text-lg">
          <span>GST ({GST_PERCENTAGE}%)</span>
          <span>₹{fees.gst}</span>
        </div>
        <div className="border-t border-dashed border-gray-400 my-4"></div>
        <div className="flex justify-between text-2xl font-bold text-green-600">
          <span>Grand Total</span>
          <span>₹{fees.grandTotal}</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
      <button
          className="mt-6 w-full md:w-1/3 bg-green-500 text-white py-2 rounded-md shadow-lg text-base hover:bg-green-600 transition duration-200"
          onClick={handlePayNow}
        >
          Pay Now
        </button>

      </div>

      <div className="flex mt-4 flex-col items-center">
        <button
          type="submit"
          className="w-full md:w-1/3 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          Submit
        </button>
      </div>
    </div>
      </form>
    </div>
  );
};

export default Nursery_Admission_Form;

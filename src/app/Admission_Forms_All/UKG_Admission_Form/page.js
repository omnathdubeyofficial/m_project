"use client";

import { useState, useRef } from "react";
import { executeMutation } from "../../graphqlClient";
import { CREATE_STUDENT_REGISTRATION_MUTATION } from "../../mutation/studentRegistrationMutations/createStudentRegistration";
import { ArrowLeft } from 'lucide-react';
import Select from 'react-select';
import { FaUpload, FaTimes,} from "react-icons/fa";
import Image from "next/image";

const Two_Admission_Form = () => {
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

  const [ setPaymentId] = useState(null);

  // const handleSubmitpay = () => {
  //   if (!paymentId) {
  //     alert('Please complete the payment before submitting the application.');
  //     return;
  //   }
  //   alert('Application Submitted Successfully!');
  // };

  const handlePayNow = () => {
    // Hardcoded payment ID for now
    const generatedPaymentId = 'PAY123456';
    setPaymentId(generatedPaymentId);
    alert(`Payment ID generated: ${generatedPaymentId}`);
  };

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

  const [fees, setFees] = useState(0);


  const classFees = {
    LKG: { total: 15000, tuition: 9000, admission: 3000, uniform: 1500, books: 1500 },
    UKG: { total: 18000, tuition: 10800, admission: 3600, uniform: 1800, books: 1800 },
    'Class 1': { total: 20000, tuition: 12000, admission: 4000, uniform: 2000, books: 2000 },
    'Class 2': { total: 22000, tuition: 13200, admission: 4400, uniform: 2200, books: 2200 },
    'Class 3': { total: 25000, tuition: 15000, admission: 5000, uniform: 2500, books: 2500 },
    'Class 4': { total: 27000, tuition: 16200, admission: 5400, uniform: 2700, books: 2700 },
    'Class 5': { total: 30000, tuition: 18000, admission: 6000, uniform: 3000, books: 3000 },
    'Class 6': { total: 35000, tuition: 21000, admission: 7000, uniform: 3500, books: 3500 },
    'Class 7': { total: 40000, tuition: 24000, admission: 8000, uniform: 4000, books: 4000 },
    'Class 8': { total: 45000, tuition: 27000, admission: 9000, uniform: 4500, books: 4500 },
    'Class 9': { total: 50000, tuition: 30000, admission: 10000, uniform: 5000, books: 5000 },
    'Class 10': { total: 55000, tuition: 33000, admission: 11000, uniform: 5500, books: 5500 },
    'Class 11': { total: 60000, tuition: 36000, admission: 12000, uniform: 6000, books: 6000 },
    'Class 12': { total: 65000, tuition: 39000, admission: 13000, uniform: 6500, books: 6500 },
  };


  const handleClassChange = (e) => {
    const selected = e.target.value;
    setSelectedClass(selected);
    const feeDetails = classFees[selected] || { total: 0, tuition: 0, admission: 0, uniform: 0, books: 0 };
    const gst = Math.round((feeDetails.total * GST_PERCENTAGE) / 100);
    setFees({ ...feeDetails, gst, grandTotal: feeDetails.total + gst });
  };



  const [errors, setErrors] = useState({});

  const fileInputRefs = {
    profileImage: useRef(null),
    aadharImageFront: useRef(null),
    aadharImageBack: useRef(null),
    documentFile: useRef(null),
  };

  const handleClearFile = (key) => {
    setFormData({ ...formData, [key]: null });
    setErrors({ ...errors, [key]: null });
    if (fileInputRefs[key].current) {
      fileInputRefs[key].current.value = '';
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const { name } = e.target;
    if (!file) return;

    // File validation
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, [name]: 'Only JPG and PNG files are allowed.' }));
      return;
    }

    if (file.size > 1 * 1024 * 1024) { // 1 MB size limit
      setErrors((prev) => ({ ...prev, [name]: 'File size must be under 1 MB.' }));
      return;
    }

    setErrors((prev) => ({ ...prev, [name]: null })); // Clear previous error

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await response.json();
      console.log('Upload Response:', data);

      if (data.imageUrl) {
        setFormData((prev) => ({
          ...prev,
          [name]: data.imageUrl,
        }));
      } else {
        console.error('Upload failed, no imageUrl returned.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };



  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    ['profileImage', 'aadharImageFront', 'aadharImageBack'].forEach((key) => {
        if (!formData[key]) {
            newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required.`;
        }
    });

    if (formData.parent_email && !/\S+@\S+\.\S+/.test(formData.parent_email)) {
      newErrors.parent_email = 'Please enter a valid email address.';
  }

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }
    console.log("Submitting Form Data:", formData);

    try {
      const response = await executeMutation(CREATE_STUDENT_REGISTRATION_MUTATION, {
        ...formData,
        gender: formData.gender?.toLowerCase() ?? "other", // Default gender if not provided
        email: formData.email ?? "",
        date_of_birth: formData.date_of_birth ?? "",
        contact_no: formData.contact_no ?? "",
        percentage: String(formData.percentage ?? "0"),
        entrance_exam_score: String(formData.entrance_exam_score ?? "0"),
        adhar_front_img: formData.aadharImageFront,
        adhar_back_img: formData.aadharImageBack,
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


  const [selectedClass, setSelectedClass] = useState('');
  const [ setSelectedSubjects] = useState([]);



  const subjectsOptions = {
    'Class 9': [
      { label: 'Mathematics', value: 'Mathematics' },
      { label: 'Science', value: 'Science' },
      { label: 'Social Studies', value: 'Social Studies' },
      { label: 'English', value: 'English' },
      { label: 'Hindi', value: 'Hindi' }
    ],
    'Class 10': [
      { label: 'Mathematics', value: 'Mathematics' },
      { label: 'Science', value: 'Science' },
      { label: 'Social Studies', value: 'Social Studies' },
      { label: 'English', value: 'English' },
      { label: 'Hindi', value: 'Hindi' }
    ],
    'Class 11': [
      { label: 'Physics', value: 'Physics' },
      { label: 'Chemistry', value: 'Chemistry' },
      { label: 'Mathematics', value: 'Mathematics' },
      { label: 'Biology', value: 'Biology' },
      { label: 'Accountancy', value: 'Accountancy' }
    ],
    'Class 12': [
      { label: 'Physics', value: 'Physics' },
      { label: 'Chemistry', value: 'Chemistry' },
      { label: 'Mathematics', value: 'Mathematics' },
      { label: 'Biology', value: 'Biology' },
      { label: 'Accountancy', value: 'Accountancy' }
    ]
  };

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
 1th Admission Form
  </h1>
</div>




        {/* Personal Information Section */}
        <div className="mb-8 mt-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Personal Information</h2>
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

        <div>
          <label className="block text-sm font-medium text-gray-600">Gender *</label>
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
          <label className="block text-sm font-medium text-gray-600">Date of Birth *</label>
          <input
            type="date"
            name="date_of_birth"
            required
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Blood Group *</label>
          <select
            name="blood_group"
            required
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
          <label className="block text-sm font-medium text-gray-600">Aadhar Number *</label>
          <input
            type="text"
            name="adhar_no"
            required
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Category *</label>
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
          <label className="block text-sm font-medium text-gray-600">Mother Tongue *</label>
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






<div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Educational Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Previous School (Required) */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Previous School *</label>
          <input
            type="text"
            name="previous_school"
            required
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        {/* Desired Class for Admission (Required) */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Desired Class for Admission *</label>
          <select
            name="desired_class"
            required
            onChange={handleClassChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="">Select Class</option>
            <option value="LKG">LKG</option>
            <option value="UKG">UKG</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={`Class ${i + 1}`}>{`Class ${i + 1}`}</option>
            ))}
          </select>
        </div>

        {/* Highest Qualification (Required for applicable classes) */}
        {selectedClass !== 'LKG' && selectedClass !== 'UKG' && (
           <div>
           <label className="block text-sm font-medium text-gray-600">Previous Year of Passing *</label>
           <input
             type="number"
             name="previous_year_of_passing"
             required
             placeholder="e.g., 2022"
             onChange={handleChange}
             className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
           />
         </div>
 
        )}

 
        {/* Select Subjects for Class 9 to 12 */}
        {['Class 9', 'Class 10', 'Class 11', 'Class 12'].includes(selectedClass) && (
          <div>
            <label className="block text-sm font-medium text-gray-600">Select Subjects * (Comma separated)</label>
            <Select
              isMulti
              name="subjects"
              options={subjectsOptions[selectedClass]}
              className="basic-multi-select mt-2"
              classNamePrefix="select"
              onChange={(selectedOptions) => {
                const subjects = selectedOptions.map(option => option.value);
                setSelectedSubjects(subjects);
                handleChange({ target: { name: 'subjects', value: subjects.join(', ') } });
              }}
            />
          </div>
        )}

        {/* Percentage (Required for applicable classes) */}
        {selectedClass !== 'LKG' && selectedClass !== 'UKG' && (
           <div>
           <label className="block text-sm font-medium text-gray-600">Previous Passing Year Percentage *</label>
           <input
             type="number"
             name="percentage"
             required
             placeholder="e.g., 85.5"
             step="0.01"
             onChange={handleChange}
             className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
           />
         </div>
 
        )}

      

        {/* Board/University (Required for higher classes) */}
        {selectedClass !== 'LKG' && selectedClass !== 'UKG' && (
         <div>
         <label className="block text-sm font-medium text-gray-600">Board *</label>
         <select
           name="board"
           required
           onChange={handleChange}
           className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
         >
           <option value="">Select Board</option>
           <option value="CBSE">CBSE</option>
           <option value="ICSE">ICSE</option>
           <option value="State Board">State Board</option>
           <option value="NIOS">NIOS</option>
           <option value="Other">Other</option>
         </select>
       </div>
        )}
      </div>
    </div>












 {/* Parent/Guardian Information */}
 <div className="mb-8">
   <h2 className="text-2xl font-semibold text-gray-700 mb-4">Parent/Guardian Information</h2>
   <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

     {/* Father Name */}
     <div>
       <label className="block text-sm font-medium text-gray-600">Father Full Name *</label>
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
       <label className="block text-sm font-medium text-gray-600">Mother Full Name *</label>
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
       <label className="block text-sm font-medium text-gray-600">Father Work *</label>
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
       <label className="block text-sm font-medium text-gray-600">Mother Work *</label>
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
       <label className="block text-sm font-medium text-gray-600">Parent WhatsApp Number *</label>
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
       <label className="block text-sm font-medium text-gray-600">Parent Mobile Number *</label>
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
       <label className="block text-sm font-medium text-gray-600">Parent Email ID *</label>
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
       <label className="block text-sm font-medium text-gray-600">Religion *</label>
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
       <label className="block text-sm font-medium text-gray-600">Annual Income *</label>
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
       <label className="block text-sm font-medium text-gray-600">Permanent Address *</label>
       <textarea
         name="permanent_address"
         required
         onChange={handleChange}
         className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       ></textarea>
     </div>

     {/* Current Address */}
     <div>
       <label className="block text-sm font-medium text-gray-600">Current Address *</label>
       <textarea
         name="current_address"
         required
         onChange={handleChange}
         className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       ></textarea>
     </div>


     
      {/* Nearest Police Station */}
      <div>
       <label className="block text-sm font-medium text-gray-600">Permanent Address Nearest Police Station *</label>
       <input
         type="text"
         name="nearest_police_station"
         required
         onChange={handleChange}
         className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       />
     </div>
      <div>
       <label className="block text-sm font-medium text-gray-600">Current Address Nearest Police Station *</label>
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
       <label className="block text-sm font-medium text-gray-600">Permanent Address Nearest Landmark *</label>
       <input
         type="text"
         name="nearest_landmark"
         required
         onChange={handleChange}
         className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
       />
     </div>
     <div>
       <label className="block text-sm font-medium text-gray-600">Current Address Nearest Landmark *</label>
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
        <label className="block text-sm font-medium text-gray-600">Permanent Address State *</label>
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
        <label className="block text-sm font-medium text-gray-600">Current Address State *</label>
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
        <label className="block text-sm font-medium text-gray-600">Permanent Address District *</label>
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
        <label className="block text-sm font-medium text-gray-600">Current Address District *</label>
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
        <label className="block text-sm font-medium text-gray-600">Permanent Address Tehsil *</label>
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
        <label className="block text-sm font-medium text-gray-600">Current Address Tehsil *</label>
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
        <label className="block text-sm font-medium text-gray-600">Permanent Address Post Office *</label>
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
        <label className="block text-sm font-medium text-gray-600">Current Address Post Office *</label>
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
        <label className="block text-sm font-medium text-gray-600">Permanent Address Pincode *</label>
        <input
          type="text"
          name="permanent_pincode"
          value={permanentPincode}
          readOnly
          className="w-full p-3 mt-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
        />
      </div>

    
    

      <div>
        <label className="block text-sm font-medium text-gray-600">Current Address Pincode *</label>
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
  <label className="block text-sm font-medium text-gray-600">Permanent Address Type *</label>
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
  <label className="block text-sm font-medium text-gray-600">Current Address Type *</label>
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
  <label className="block text-sm font-medium text-gray-600">Nationality *</label>
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
  <label className="block text-sm font-medium text-gray-600">Country *</label>
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



 <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upload Documents</h2>


 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-t pt-6">
      <p className="col-span-full text-red-600 font-bold">
      Note: Only JPG and PNG images under 1 MB are allowed. Please ensure the document is clear and easily readable.
      </p>
      {[
        { key: 'profileImage', label: 'Student Image' },
        { key: 'aadharImageFront', label: 'Student Aadhar Image Front' },
        { key: 'aadharImageBack', label: 'Student Aadhar Image Back' },
      ].map(({ key, label }, index) => (
        <div key={index} className="flex flex-col items-center border p-4  w-full relative">
          <span className="font-semibold text-lg">{label}</span>
          <label className="border p-2  w-full flex items-center gap-2 cursor-pointer bg-gray-200 hover:bg-gray-300 mt-2">
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
              <Image src={formData[key]} alt={label} className="w-32 h-32 rounded-lg border object-cover" width={500} height={300} />
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

export default Two_Admission_Form;

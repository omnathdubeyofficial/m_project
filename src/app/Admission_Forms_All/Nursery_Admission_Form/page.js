"use client";

import { useState, useRef } from "react";
import { executeMutation } from "../../graphqlClient";
import { CREATE_NURSERY_ADMISSION_LIST_MUTATION } from "../../mutation/NurseryAdmissionMutation/createNurseryAdmissionListMutation";
import { FaArrowLeft, FaUpload, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Nursery_Admission_Form = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    blood_group: "",
    adhar_no: "",
    category: "",
    mother_tangue: "",
    father_full_name: "",
    mother_full_name: "",
    father_work: "",
    mother_work: "",
    guardian_whatsapp_number: "",
    guardian_mobile_number: "",
    guardian_email_id: "",
    guardian_religion: "",
    guardian_annual_income: "",
    permanent_address: "",
    permanent_address_nearest_policestation: "",
    permanent_address_nearest_landmark: "",
    permanent_address_state: "",
    permanent_address_district: "",
    permanent_address_tehsil: "",
    permanent_address_post_office: "",
    permanent_address_pincode: "",
    permanent_address_type: "",
    nationality: "",
    current_address: "",
    current_address_nearest_policestation: "",
    current_address_nearest_landmark: "",
    current_address_state: "",
    current_address_district: "",
    current_address_tehsil: "",
    current_address_post_office: "",
    current_address_pincode: "",
    current_address_type: "",
    country: "",
    student_profile_image: "",
    student_aadhar_front: "",
    student_aadhar_back: "",
    father_aadhar_front: "",
    father_aadhar_back: "",
    mother_aadhar_front: "",
    mother_aadhar_back: "",
    student_birth_certificate: "",
  });

  const [errors, setErrors] = useState({});
  const [permanentState, setPermanentState] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [permanentDistrict, setPermanentDistrict] = useState("");
  const [currentDistrict, setCurrentDistrict] = useState("");
  const [permanentPostOffice, setPermanentPostOffice] = useState("");
  const [currentPostOffice, setCurrentPostOffice] = useState("");
  const [permanentPincode, setPermanentPincode] = useState("");
  const [currentPincode, setCurrentPincode] = useState("");

  const stateDistrictData = {
    "Uttar Pradesh": {
      Lucknow: {
        tehsils: ["Sadar", "Malihabad", "Mohanlalganj"],
        postOffices: {
          Aliganj: "226024",
          "Gomti Nagar": "226010",
          Hazratganj: "226001",
        },
      },
      Varanasi: {
        tehsils: ["Pindra", "Sadar", "Rohaniya"],
        postOffices: {
          Bhelupur: "221005",
          Lanka: "221007",
          Sigra: "221010",
        },
      },
    },
    Maharashtra: {
      Mumbai: {
        tehsils: ["Mumbai City", "Andheri", "Borivali"],
        postOffices: {
          Colaba: "400005",
          Dadar: "400014",
          Goregaon: "400062",
        },
      },
      Pune: {
        tehsils: ["Haveli", "Baramati", "Junnar"],
        postOffices: {
          Shivajinagar: "411005",
          Kothrud: "411038",
          Hadapsar: "411028",
        },
      },
    },
  };

  const fileInputRefs = {
    student_profile_image: useRef(null),
    student_aadhar_front: useRef(null),
    student_aadhar_back: useRef(null),
    father_aadhar_front: useRef(null),
    father_aadhar_back: useRef(null),
    mother_aadhar_front: useRef(null),
    mother_aadhar_back: useRef(null),
    student_birth_certificate: useRef(null),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value ?? "",
    }));
  };

  const handlePermanentStateChange = (e) => {
    const state = e.target.value;
    setPermanentState(state);
    setPermanentDistrict("");
    setPermanentPostOffice("");
    setPermanentPincode("");
    setFormData((prev) => ({
      ...prev,
      permanent_address_state: state,
      permanent_address_district: "",
      permanent_address_post_office: "",
      permanent_address_pincode: "",
    }));
  };

  const handleCurrentStateChange = (e) => {
    const state = e.target.value;
    setCurrentState(state);
    setCurrentDistrict("");
    setCurrentPostOffice("");
    setCurrentPincode("");
    setFormData((prev) => ({
      ...prev,
      current_address_state: state,
      current_address_district: "",
      current_address_post_office: "",
      current_address_pincode: "",
    }));
  };

  const handlePermanentDistrictChange = (e) => {
    const district = e.target.value;
    setPermanentDistrict(district);
    setPermanentPostOffice("");
    setPermanentPincode("");
    setFormData((prev) => ({
      ...prev,
      permanent_address_district: district,
      permanent_address_post_office: "",
      permanent_address_pincode: "",
    }));
  };

  const handleCurrentDistrictChange = (e) => {
    const district = e.target.value;
    setCurrentDistrict(district);
    setCurrentPostOffice("");
    setCurrentPincode("");
    setFormData((prev) => ({
      ...prev,
      current_address_district: district,
      current_address_post_office: "",
      current_address_pincode: "",
    }));
  };

  const handlePermanentPostOfficeChange = (e) => {
    const postOffice = e.target.value;
    setPermanentPostOffice(postOffice);
    const pincode = stateDistrictData[permanentState]?.[permanentDistrict]?.postOffices?.[postOffice] || "";
    setPermanentPincode(pincode);
    setFormData((prev) => ({
      ...prev,
      permanent_address_post_office: postOffice,
      permanent_address_pincode: pincode,
    }));
  };

  const handleCurrentPostOfficeChange = (e) => {
    const postOffice = e.target.value;
    setCurrentPostOffice(postOffice);
    const pincode = stateDistrictData[currentState]?.[currentDistrict]?.postOffices?.[postOffice] || "";
    setCurrentPincode(pincode);
    setFormData((prev) => ({
      ...prev,
      current_address_post_office: postOffice,
      current_address_pincode: pincode,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const { name } = e.target;
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, [name]: "Only JPG and PNG files are allowed." }));
      toast.error("Only JPG and PNG files are allowed for " + name.replace(/_/g, " "), {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, [name]: "File size must be under 1 MB." }));
      toast.error("File size must be under 1 MB for " + name.replace(/_/g, " "), {
        position: "top-right",
        autoClose: 3000,
      });
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
        toast.success(`${name.replace(/_/g, " ")} uploaded successfully!`, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        setErrors((prev) => ({ ...prev, [name]: "Upload failed." }));
        toast.error("Upload failed for " + name.replace(/_/g, " "), {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, [name]: "Error uploading file." }));
      toast.error("Error uploading file for " + name.replace(/_/g, " "), {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleClearFile = (key) => {
    setFormData((prev) => ({ ...prev, [key]: "" }));
    setErrors((prev) => ({ ...prev, [key]: null }));
    if (fileInputRefs[key].current) {
      fileInputRefs[key].current.value = "";
    }
    toast.info(`${key.replace(/_/g, " ")} cleared.`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "first_name",
      "last_name",
      "date_of_birth",
      "gender",
      "adhar_no",
      "category",
      "mother_tangue",
      "father_full_name",
      "mother_full_name",
      "father_work",
      "mother_work",
      "guardian_whatsapp_number",
      "guardian_mobile_number",
      "guardian_email_id",
      "guardian_religion",
      "guardian_annual_income",
      "permanent_address",
      "permanent_address_nearest_policestation",
      "permanent_address_nearest_landmark",
      "permanent_address_state",
      "permanent_address_district",
      "permanent_address_tehsil",
      "permanent_address_post_office",
      "permanent_address_pincode",
      "permanent_address_type",
      "nationality",
      "current_address",
      "current_address_nearest_policestation",
      "current_address_nearest_landmark",
      "current_address_state",
      "current_address_district",
      "current_address_tehsil",
      "current_address_post_office",
      "current_address_pincode",
      "current_address_type",
      "country",
      "student_profile_image",
      "student_aadhar_front",
      "student_aadhar_back",
      "father_aadhar_front",
      "father_aadhar_back",
      "mother_aadhar_front",
      "mother_aadhar_back",
      "student_birth_certificate",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/_/g, " ")} is required.`;
      }
    });

    if (formData.guardian_email_id && !/\S+@\S+\.\S+/.test(formData.guardian_email_id)) {
      newErrors.guardian_email_id = "Please enter a valid email address.";
    }

    if (formData.adhar_no && !/^\d{12}$/.test(formData.adhar_no)) {
      newErrors.adhar_no = "Aadhar number must be 12 digits.";
    }

    if (formData.guardian_whatsapp_number && !/^\d{10}$/.test(formData.guardian_whatsapp_number)) {
      newErrors.guardian_whatsapp_number = "WhatsApp number must be 10 digits.";
    }

    if (formData.guardian_mobile_number && !/^\d{10}$/.test(formData.guardian_mobile_number)) {
      newErrors.guardian_mobile_number = "Mobile number must be 10 digits.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields correctly.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const mutationData = {
        ...formData,
        gender: formData.gender.toLowerCase() ?? "other",
        blood_group: formData.blood_group || null,
        mother_tangue: formData.mother_tangue || null,
        mother_work: formData.mother_work || null,
        guardian_mobile_number: formData.guardian_mobile_number || null,
        guardian_annual_income: formData.guardian_annual_income || null,
        permanent_address_nearest_policestation: formData.permanent_address_nearest_policestation || null,
        permanent_address_nearest_landmark: formData.permanent_address_nearest_landmark || null,
        permanent_address_district: formData.permanent_address_district || null,
        permanent_address_tehsil: formData.permanent_address_tehsil || null,
        permanent_address_post_office: formData.permanent_address_post_office || null,
        permanent_address_type: formData.permanent_address_type || null,
        current_address_nearest_policestation: formData.current_address_nearest_policestation || null,
        current_address_nearest_landmark: formData.current_address_nearest_landmark || null,
        current_address_district: formData.current_address_district || null,
        current_address_tehsil: formData.current_address_tehsil || null,
        current_address_post_office: formData.current_address_post_office || null,
        current_address_type: formData.current_address_type || null,
        country: formData.country || null,
      };

      console.log("Mutation Data:", mutationData);

      const response = await executeMutation(CREATE_NURSERY_ADMISSION_LIST_MUTATION, mutationData);

      if (response?.errors || response?.error_msg) {
        const errorMessage = response?.error_msg || response?.errors[0]?.message || "An error occurred.";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      toast.success(response?.success_msg || "Admission form submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setFormData({
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        date_of_birth: "",
        blood_group: "",
        adhar_no: "",
        category: "",
        mother_tangue: "",
        father_full_name: "",
        mother_full_name: "",
        father_work: "",
        mother_work: "",
        guardian_whatsapp_number: "",
        guardian_mobile_number: "",
        guardian_email_id: "",
        guardian_religion: "",
        guardian_annual_income: "",
        permanent_address: "",
        permanent_address_nearest_policestation: "",
        permanent_address_nearest_landmark: "",
        permanent_address_state: "",
        permanent_address_district: "",
        permanent_address_tehsil: "",
        permanent_address_post_office: "",
        permanent_address_pincode: "",
        permanent_address_type: "",
        nationality: "",
        current_address: "",
        current_address_nearest_policestation: "",
        current_address_nearest_landmark: "",
        current_address_state: "",
        current_address_district: "",
        current_address_tehsil: "",
        current_address_post_office: "",
        current_address_pincode: "",
        current_address_type: "",
        country: "",
        student_profile_image: "",
        student_aadhar_front: "",
        student_aadhar_back: "",
        father_aadhar_front: "",
        father_aadhar_back: "",
        mother_aadhar_front: "",
        mother_aadhar_back: "",
        student_birth_certificate: "",
      });
      setPermanentState("");
      setCurrentState("");
      setPermanentDistrict("");
      setCurrentDistrict("");
      setPermanentPostOffice("");
      setCurrentPostOffice("");
      setPermanentPincode("");
      setCurrentPincode("");
    } catch (error) {
      toast.error(error.message || "Error submitting form.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 flex justify-center mt-32">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="max-w-7xl w-full bg-white p-8 shadow-xl border border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-1 p-2 pr-4 bg-red-500 text-white hover:bg-red-600 transition"
          >
            <FaArrowLeft size={20} />
            Go Back
          </button>
          <h1 className="text-2xl">Nursery Admission Form</h1>
        </div>

        <div className="mb-8 mt-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Child's Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                First Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {errors.first_name && <p className="text-red-600 mt-1">{errors.first_name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Middle Name</label>
              <input
                type="text"
                name="middle_name"
                value={formData.middle_name}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Last Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {errors.last_name && <p className="text-red-600 mt-1">{errors.last_name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Gender<span className="text-red-600">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="text-red-600 mt-1">{errors.gender}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Date of Birth<span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {errors.date_of_birth && <p className="text-red-600 mt-1">{errors.date_of_birth}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Blood Group</label>
              <select
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
              {errors.blood_group && <p className="text-red-600 mt-1">{errors.blood_group}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Aadhar Number<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="adhar_no"
                value={formData.adhar_no}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {errors.adhar_no && <p className="text-red-600 mt-1">{errors.adhar_no}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Category<span className="text-red-600">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select Category</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
                <option value="Others">Others</option>
              </select>
              {errors.category && <p className="text-red-600 mt-1">{errors.category}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Mother Tongue<span className="text-red-600">*</span>
              </label>
              <select
                name="mother_tangue"
                value={formData.mother_tangue}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
              {errors.mother_tangue && <p className="text-red-600 mt-1">{errors.mother_tangue}</p>}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Parent/Guardian Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Father Full Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="father_full_name"
                value={formData.father_full_name}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {errors.father_full_name && <p className="text-red-600 mt-1">{errors.father_full_name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Mother Full Name<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="mother_full_name"
                value={formData.mother_full_name}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {errors.mother_full_name && <p className="text-red-600 mt-1">{errors.mother_full_name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Father's Work<span className="text-red-600">*</span>
              </label>
              <select
                name="father_work"
                value={formData.father_work}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select Work Type</option>
                <option value="Private Job">Private Job</option>
                <option value="Government Employee">Government Employee</option>
                <option value="Business">Business</option>
              </select>
              {errors.father_work && <p className="text-red-600 mt-1">{errors.father_work}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Mother's Work<span className="text-red-600">*</span>
              </label>
              <select
                name="mother_work"
                value={formData.mother_work}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select Work Type</option>
                <option value="Housewife">Housewife</option>
                <option value="Private Job">Private Job</option>
                <option value="Government Employee">Government Employee</option>
                <option value="Business">Business</option>
              </select>
              {errors.mother_work && <p className="text-red-600 mt-1">{errors.mother_work}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Guardian WhatsApp Number<span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                name="guardian_whatsapp_number"
                value={formData.guardian_whatsapp_number}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {errors.guardian_whatsapp_number && (
                <p className="text-red-600 mt-1">{errors.guardian_whatsapp_number}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Guardian Mobile Number<span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                name="guardian_mobile_number"
                value={formData.guardian_mobile_number}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {errors.guardian_mobile_number && (
                <p className="text-red-600 mt-1">{errors.guardian_mobile_number}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Guardian Email ID<span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="guardian_email_id"
                value={formData.guardian_email_id}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {errors.guardian_email_id && <p className="text-red-600 mt-1">{errors.guardian_email_id}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Guardian Religion<span className="text-red-600">*</span>
              </label>
              <select
                name="guardian_religion"
                value={formData.guardian_religion}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select Religion</option>
                <option value="Hindu">Hindu</option>
                <option value="Muslim">Muslim</option>
                <option value="Christian">Christian</option>
                <option value="Sikh">Sikh</option>
                <option value="Other">Other</option>
              </select>
              {errors.guardian_religion && <p className="text-red-600 mt-1">{errors.guardian_religion}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Guardian Annual Income<span className="text-red-600">*</span>
              </label>
              <select
                name="guardian_annual_income"
                value={formData.guardian_annual_income}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select Income Range</option>
                <option value="Below 1 Lakh">Below 1 Lakh</option>
                <option value="1 - 5 Lakh">1 - 5 Lakh</option>
                <option value="5 - 10 Lakh">5 - 10 Lakh</option>
                <option value="10 - 20 Lakh">10 - 20 Lakh</option>
                <option value="20 Lakh & Above">20 Lakh & Above</option>
              </select>
              {errors.guardian_annual_income && (
                <p className="text-red-600 mt-1">{errors.guardian_annual_income}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Address Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Permanent Address<span className="text-red-600">*</span>
              </label>
              <textarea
                name="permanent_address"
                value={formData.permanent_address}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {errors.permanent_address && <p className="text-red-600 mt-1">{errors.permanent_address}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Current Address<span className="text-red-600">*</span>
              </label>
              <textarea
                name="current_address"
                value={formData.current_address}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {errors.current_address && <p className="text-red-600 mt-1">{errors.current_address}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Permanent Address Nearest Police Station<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="permanent_address_nearest_policestation"
                value={formData.permanent_address_nearest_policestation}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {errors.permanent_address_nearest_policestation && (
                <p className="text-red-600 mt-1">{errors.permanent_address_nearest_policestation}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Current Address Nearest Police Station<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="current_address_nearest_policestation"
                value={formData.current_address_nearest_policestation}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {errors.current_address_nearest_policestation && (
                <p className="text-red-600 mt-1">{errors.current_address_nearest_policestation}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Permanent Address Nearest Landmark<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="permanent_address_nearest_landmark"
                value={formData.permanent_address_nearest_landmark}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {errors.permanent_address_nearest_landmark && (
                <p className="text-red-600 mt-1">{errors.permanent_address_nearest_landmark}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Current Address Nearest Landmark<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="current_address_nearest_landmark"
                value={formData.current_address_nearest_landmark}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              {errors.current_address_nearest_landmark && (
                <p className="text-red-600 mt-1">{errors.current_address_nearest_landmark}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Permanent Address State<span className="text-red-600">*</span>
              </label>
              <select
                name="permanent_address_state"
                value={permanentState}
                onChange={handlePermanentStateChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select State</option>
                {Object.keys(stateDistrictData).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.permanent_address_state && (
                <p className="text-red-600 mt-1">{errors.permanent_address_state}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Current Address State<span className="text-red-600">*</span>
              </label>
              <select
                name="current_address_state"
                value={currentState}
                onChange={handleCurrentStateChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select State</option>
                {Object.keys(stateDistrictData).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.current_address_state && (
                <p className="text-red-600 mt-1">{errors.current_address_state}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Permanent Address District<span className="text-red-600">*</span>
              </label>
              <select
                name="permanent_address_district"
                value={permanentDistrict}
                onChange={handlePermanentDistrictChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select District</option>
                {permanentState &&
                  Object.keys(stateDistrictData[permanentState]).map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
              </select>
              {errors.permanent_address_district && (
                <p className="text-red-600 mt-1">{errors.permanent_address_district}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Current Address District<span className="text-red-600">*</span>
              </label>
              <select
                name="current_address_district"
                value={currentDistrict}
                onChange={handleCurrentDistrictChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select District</option>
                {currentState &&
                  Object.keys(stateDistrictData[currentState]).map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
              </select>
              {errors.current_address_district && (
                <p className="text-red-600 mt-1">{errors.current_address_district}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Permanent Address Tehsil<span className="text-red-600">*</span>
              </label>
              <select
                name="permanent_address_tehsil"
                value={formData.permanent_address_tehsil}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select Tehsil</option>
                {permanentDistrict &&
                  stateDistrictData[permanentState]?.[permanentDistrict]?.tehsils.map((tehsil) => (
                    <option key={tehsil} value={tehsil}>
                      {tehsil}
                    </option>
                  ))}
              </select>
              {errors.permanent_address_tehsil && (
                <p className="text-red-600 mt-1">{errors.permanent_address_tehsil}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Current Address Tehsil<span className="text-red-600">*</span>
              </label>
              <select
                name="current_address_tehsil"
                value={formData.current_address_tehsil}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select Tehsil</option>
                {currentDistrict &&
                  stateDistrictData[currentState]?.[currentDistrict]?.tehsils.map((tehsil) => (
                    <option key={tehsil} value={tehsil}>
                      {tehsil}
                    </option>
                  ))}
              </select>
              {errors.current_address_tehsil && (
                <p className="text-red-600 mt-1">{errors.current_address_tehsil}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Permanent Address Post Office<span className="text-red-600">*</span>
              </label>
              <select
                name="permanent_address_post_office"
                value={permanentPostOffice}
                onChange={handlePermanentPostOfficeChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select Post Office</option>
                {permanentDistrict &&
                  Object.keys(stateDistrictData[permanentState]?.[permanentDistrict]?.postOffices || {}).map(
                    (postOffice) => (
                      <option key={postOffice} value={postOffice}>
                        {postOffice}
                      </option>
                    )
                  )}
              </select>
              {errors.permanent_address_post_office && (
                <p className="text-red-600 mt-1">{errors.permanent_address_post_office}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Current Address Post Office<span className="text-red-600">*</span>
              </label>
              <select
                name="current_address_post_office"
                value={currentPostOffice}
                onChange={handleCurrentPostOfficeChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select Post Office</option>
                {currentDistrict &&
                  Object.keys(stateDistrictData[currentState]?.[currentDistrict]?.postOffices || {}).map(
                    (postOffice) => (
                      <option key={postOffice} value={postOffice}>
                        {postOffice}
                      </option>
                    )
                  )}
              </select>
              {errors.current_address_post_office && (
                <p className="text-red-600 mt-1">{errors.current_address_post_office}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Permanent Address Pincode<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="permanent_address_pincode"
                value={permanentPincode}
                readOnly
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
              />
              {errors.permanent_address_pincode && (
                <p className="text-red-600 mt-1">{errors.permanent_address_pincode}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Current Address Pincode<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="current_address_pincode"
                value={currentPincode}
                readOnly
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
              />
              {errors.current_address_pincode && (
                <p className="text-red-600 mt-1">{errors.current_address_pincode}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Permanent Address Type<span className="text-red-600">*</span>
              </label>
              <select
                name="permanent_address_type"
                value={formData.permanent_address_type}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select Address Type</option>
                <option value="owner">Owner</option>
                <option value="rented">Rented</option>
              </select>
              {errors.permanent_address_type && (
                <p className="text-red-600 mt-1">{errors.permanent_address_type}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Current Address Type<span className="text-red-600">*</span>
              </label>
              <select
                name="current_address_type"
                value={formData.current_address_type}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select Address Type</option>
                <option value="owner">Owner</option>
                <option value="rented">Rented</option>
              </select>
              {errors.current_address_type && (
                <p className="text-red-600 mt-1">{errors.current_address_type}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Nationality<span className="text-red-600">*</span>
              </label>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select Nationality</option>
                <option value="Indian">Indian</option>
                <option value="American">American</option>
                <option value="British">British</option>
                <option value="Canadian">Canadian</option>
                <option value="Australian">Australian</option>
              </select>
              {errors.nationality && <p className="text-red-600 mt-1">{errors.nationality}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Country<span className="text-red-600">*</span>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
              {errors.country && <p className="text-red-600 mt-1">{errors.country}</p>}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Upload Documents</h2>
          <p className="text-red-600 font-semibold mb-4">
            Note: Only JPG and PNG images under 1 MB are allowed. Please ensure the document is clear and readable.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { key: "student_profile_image", label: "Student Profile Image" },
              { key: "student_aadhar_front", label: "Student Aadhar Front" },
              { key: "student_aadhar_back", label: "Student Aadhar Back" },
              { key: "father_aadhar_front", label: "Father Aadhar Front" },
              { key: "father_aadhar_back", label: "Father Aadhar Back" },
              { key: "mother_aadhar_front", label: "Mother Aadhar Front" },
              { key: "mother_aadhar_back", label: "Mother Aadhar Back" },
              { key: "student_birth_certificate", label: "Student Birth Certificate" },
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

        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="mt-4 w-full md:w-1/3 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Submit
          </button>
          <p className="mt-4 text-gray-600">
            If registration is complete, click{" "}
            <Link href="/admission_payment" className="text-blue-600 hover:underline">
              here
            </Link>{" "}
            for admission payment.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Nursery_Admission_Form;
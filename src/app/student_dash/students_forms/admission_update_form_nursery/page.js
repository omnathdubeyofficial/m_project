"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // To get z_id from URL
import { executeQuery, executeMutation } from "../../../graphqlClient";
import { GET_NURSERY_ADMISSION_DATA } from "../../../query/NurseryAdmissionQuery/fetchNurseryAdmission";
import { CREATE_NURSERY_ADMISSION_LIST_MUTATION } from "../../../mutation/NurseryAdmissionMutation/createNurseryAdmissionListMutation";
import { UPDATE_NURSERY_ADMISSION_LIST_MUTATION } from "../../../mutation/NurseryAdmissionMutation/updateNurseryAdmissionMutation";
import { FaArrowLeft, FaUpload, FaTimes, FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const Nursery_Admission_Form = () => {
  const searchParams = useSearchParams();
  const z_id = searchParams.get("z_id"); // Get z_id from URL

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    blood_group: "",
    adhar_no: "",
    category: "",
    class_title: "Nursery", // Default to Nursery
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
  const [showPopup, setShowPopup] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [isUpdateMode, setIsUpdateMode] = useState(!!z_id); // Determine if in update mode

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


  const formatDate = (rawDate) => {
    if (!rawDate || rawDate.length !== 8) return '';
    const year = rawDate.slice(0, 4);
    const month = rawDate.slice(4, 6);
    const day = rawDate.slice(6, 8);
    return `${day}-${month}-${year}`;
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

  // Fetch data for the given z_id when in update mode
  useEffect(() => {
    if (z_id) {
      const fetchAdmissionData = async () => {
        try {
          // Assuming GET_NURSERY_ADMISSION_DATA accepts a z_id variable
          const response = await executeQuery(GET_NURSERY_ADMISSION_DATA, { z_id });
          const admissionData = response?.getNurseryAdmissionList?.find(
            (item) => item.z_id === z_id
          );

          if (admissionData) {
            // Populate formData with fetched data
            setFormData({
              first_name: admissionData.first_name || "",
              middle_name: admissionData.middle_name || "",
              last_name: admissionData.last_name || "",
              gender: admissionData.gender || "",
              date_of_birth: admissionData.date_of_birth || "",
              blood_group: admissionData.blood_group || "",
              adhar_no: admissionData.adhar_no || "",
              category: admissionData.category || "",
              class_title: admissionData.class_title || "Nursery",
              mother_tangue: admissionData.mother_tangue || "",
              father_full_name: admissionData.father_full_name || "",
              mother_full_name: admissionData.mother_full_name || "",
              father_work: admissionData.father_work || "",
              mother_work: admissionData.mother_work || "",
              guardian_whatsapp_number: admissionData.guardian_whatsapp_number || "",
              guardian_mobile_number: admissionData.guardian_mobile_number || "",
              guardian_email_id: admissionData.guardian_email_id || "",
              guardian_religion: admissionData.guardian_religion || "",
              guardian_annual_income: admissionData.guardian_annual_income || "",
              permanent_address: admissionData.permanent_address || "",
              permanent_address_nearest_policestation:
                admissionData.permanent_address_nearest_policestation || "",
              permanent_address_nearest_landmark:
                admissionData.permanent_address_nearest_landmark || "",
              permanent_address_state: admissionData.permanent_address_state || "",
              permanent_address_district: admissionData.permanent_address_district || "",
              permanent_address_tehsil: admissionData.permanent_address_tehsil || "",
              permanent_address_post_office: admissionData.permanent_address_post_office || "",
              permanent_address_pincode: admissionData.permanent_address_pincode || "",
              permanent_address_type: admissionData.permanent_address_type || "",
              nationality: admissionData.nationality || "",
              current_address: admissionData.current_address || "",
              current_address_nearest_policestation:
                admissionData.current_address_nearest_policestation || "",
              current_address_nearest_landmark:
                admissionData.current_address_nearest_landmark || "",
              current_address_state: admissionData.current_address_state || "",
              current_address_district: admissionData.current_address_district || "",
              current_address_tehsil: admissionData.current_address_tehsil || "",
              current_address_post_office: admissionData.current_address_post_office || "",
              current_address_pincode: admissionData.current_address_pincode || "",
              current_address_type: admissionData.current_address_type || "",
              country: admissionData.country || "",
              student_profile_image: admissionData.student_profile_image || "",
              student_aadhar_front: admissionData.student_aadhar_front || "",
              student_aadhar_back: admissionData.student_aadhar_back || "",
              father_aadhar_front: admissionData.father_aadhar_front || "",
              father_aadhar_back: admissionData.father_aadhar_back || "",
              mother_aadhar_front: admissionData.mother_aadhar_front || "",
              mother_aadhar_back: admissionData.mother_aadhar_back || "",
              student_birth_certificate: admissionData.student_birth_certificate || "",
            });

            // Set state for dependent fields
            setPermanentState(admissionData.permanent_address_state || "");
            setCurrentState(admissionData.current_address_state || "");
            setPermanentDistrict(admissionData.permanent_address_district || "");
            setCurrentDistrict(admissionData.current_address_district || "");
            setPermanentPostOffice(admissionData.permanent_address_post_office || "");
            setCurrentPostOffice(admissionData.current_address_post_office || "");
            setPermanentPincode(admissionData.permanent_address_pincode || "");
            setCurrentPincode(admissionData.current_address_pincode || "");
            setStudentId(admissionData.student_id || "N/A");
          } else {
            toast.error("No data found for the provided z_id.", {
              position: "top-right",
              autoClose: 3000,
            });
          }
        } catch (error) {
          console.error("Error fetching admission data:", error);
          toast.error("Failed to fetch admission data.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      };

      fetchAdmissionData();
    }
  }, [z_id]);

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
        class_title: formData.class_title || "Nursery",
      };

      let response;
      if (isUpdateMode) {
        // Update mutation
        response = await executeMutation(UPDATE_NURSERY_ADMISSION_LIST_MUTATION, {
          z_id,
          ...mutationData,
        });
      } else {
        // Create mutation
        response = await executeMutation(CREATE_NURSERY_ADMISSION_LIST_MUTATION, mutationData);
      }

      console.log("Mutation Response:", JSON.stringify(response, null, 2));

      if (response?.errors || (isUpdateMode ? response?.updateNurseryAdmissionList?.error_msg : response?.createNurseryAdmissionList?.error_msg)) {
        const errorMessage =
          (isUpdateMode
            ? response?.updateNurseryAdmissionList?.error_msg
            : response?.createNurseryAdmissionList?.error_msg) ||
          response?.errors?.[0]?.message ||
          "An error occurred.";
        setPopupMessage(errorMessage);
        setIsSuccess(false);
        setShowPopup(true);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      const successMessage = isUpdateMode
        ? response?.updateNurseryAdmissionList?.success_msg || "Admission form updated successfully!"
        : response?.createNurseryAdmissionList?.success_msg || "Admission form submitted successfully!";
      const studentIdFromResponse = isUpdateMode
        ? studentId // Keep existing studentId in update mode
        : response?.createNurseryAdmissionList?.student_id ||
          response?.createNurseryAdmissionList?.studentId ||
          response?.createNurseryAdmissionList?.id ||
          "N/A";

      if (!isUpdateMode && studentIdFromResponse === "N/A") {
        console.warn(
          "Student ID is missing or null in the response. Checked fields: student_id, studentId, id. Please verify the GraphQL response structure."
        );
      }

      setStudentId(studentIdFromResponse);
      setPopupMessage(successMessage);
      setIsSuccess(true);
      setShowPopup(true);

      toast.success(successMessage, {
        position: "top-right",
        autoClose: 3000,
      });

      if (!isUpdateMode) {
        // Reset form only for create mode
        setFormData({
          first_name: "",
          middle_name: "",
          last_name: "",
          gender: "",
          date_of_birth: "",
          blood_group: "",
          adhar_no: "",
          category: "",
          class_title: "Nursery",
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
      }
    } catch (error) {
      const errorMessage = error.message || "Error submitting form.";
      setPopupMessage(errorMessage);
      setIsSuccess(false);
      setShowPopup(true);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setStudentId("");
    setPopupMessage("");
    setIsSuccess(true);
  };

  const copyStudentId = () => {
    navigator.clipboard.writeText(studentId);
    toast.success("Student ID copied successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 flex justify-center mt-28">
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
          <h1 className="text-2xl">{isUpdateMode ? "Update Nursery Admission Form" : "Nursery Admission Form"}</h1>
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
                <option value="male">Male</option>
                <option value="female">Female</option>
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
            {isUpdateMode ? "Update" : "Submit"}
          </button>
          {!isUpdateMode && (
            <p className="mt-4 text-gray-600">
              If registration is complete, click{" "}
              <Link href="/Admission_Forms_All/Admission_payment" className="text-blue-600 hover:underline">
                here
              </Link>{" "}
              for admission payment.
            </p>
          )}
        </div>
      </form>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-500">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 m-4 transform transition-all duration-300 animate-slide-in">
            {/* Success Popup */}
            {isSuccess ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl -z-10"></div>
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg
                      className="w-12 h-12 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-green-800 text-center mb-4">
                  {isUpdateMode ? "Update Successful!" : "Registration Successful!"}
                </h2>
                {studentId && studentId !== "N/A" ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-800">
                      Student ID: <span className="text-green-600">{studentId}</span>
                    </p>
                    <button
                      onClick={copyStudentId}
                      className="p-2 bg-green-100 rounded-full hover:bg-green-200 transition-colors duration-200"
                      title="Copy Student ID"
                    >
                      <FaCopy className="text-green-600" />
                    </button>
                  </div>
                ) : (
                  <p className="text-red-600 mb-4 text-center">
                    Student ID not available. Please contact support.
                  </p>
                )}
                <div className="bg-white border border-green-200 rounded-lg p-4 mb-6 text-left text-gray-700">
                  <p className="text-sm sm:text-base">
                    Please copy your Student ID. The Student ID has also been sent to your email at{" "}
                    <span className="font-semibold text-green-600">{formData.guardian_email_id}</span>. You can check
                    your email or copy it from here.
                  </p>
                  {!isUpdateMode && (
                    <>
                      <p className="mt-2 text-sm sm:text-base">
                        The next step is the payment process. After completing the payment, your admission will be confirmed.
                        Thank you!
                      </p>
                      <p className="mt-2 text-sm sm:text-base font-semibold text-red-600">
                        Please complete the payment within 24 hours, otherwise, your registration will be rejected.
                      </p>
                    </>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  {!isUpdateMode && (
                    <Link href="/Admission_Forms_All/Admission_payment">
                      <button className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-6 rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300">
                        Proceed to Payment
                      </button>
                    </Link>
                  )}
                  <button
                    onClick={closePopup}
                    className="w-full sm:w-auto bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl -z-10"></div>
                <div className="flex justify-center mb-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <svg
                      className="w-12 h-12 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-red-800 text-center mb-4">
                  {isUpdateMode ? "Update Failed" : "Submission Failed"}
                </h2>
                <p className="text-red-600 mb-6 text-center text-sm sm:text-base">{popupMessage}</p>
                <div className="flex justify-center">
                  <button
                    onClick={closePopup}
                    className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Nursery_Admission_Form;
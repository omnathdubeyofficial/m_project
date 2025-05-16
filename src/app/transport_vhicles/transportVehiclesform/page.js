"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaUpload, FaSave, FaTimes, FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
// import Navbar from "../../navbar/page";

const TransportVehiclesForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleType: "",
    model: "",
    seatingCapacity: "",
    insuranceNumber: "",
    pollutionCertificate: "",
    registrationDate: "",
    fitnessCertificate: "",
    ownerName: "",
    ownerContact: "",
    vehicleImage: null,
    insuranceImage: null,
    pollutionImage: null,
  });

  const fileInputRefs = {
    vehicleImage: useRef(null),
    insuranceImage: useRef(null),
    pollutionImage: useRef(null),
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [e.target.name]: URL.createObjectURL(file) });
    }
  };

  const handleClearFile = (key) => {
    setFormData({ ...formData, [key]: null });
    if (fileInputRefs[key].current) {
      fileInputRefs[key].current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col">
       {/* <Navbar /> */}
      <div className="container mx-auto py-10 px-4 sm:px-6 md:px-8 max-w-7xl pt-32">
        <div className="bg-white shadow-lg p-6 sm:p-8 w-full relative ">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5">
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-blue-500 text-white px-3 py-2 flex items-center gap-2 hover:bg-blue-700"
            >
              <FaArrowLeft /> Go Back
            </button>
            <h2 className="text-2xl text-center text-gray-800">Transport Vehicle Registration</h2>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[ 
                { name: "vehicleNumber", label: "Vehicle Number", type: "text" },
                { name: "vehicleType", label: "Vehicle Type", type: "text" },
                { name: "model", label: "Model", type: "text" },
                { name: "seatingCapacity", label: "Seating Capacity", type: "number" },
                { name: "insuranceNumber", label: "Insurance Number", type: "text" },
                { name: "pollutionCertificate", label: "Pollution Certificate", type: "text" },
                { name: "registrationDate", label: "Registration Date", type: "date" },
                { name: "fitnessCertificate", label: "Fitness Certificate", type: "text" },
                { name: "ownerName", label: "Owner Name", type: "text" },
                { name: "ownerContact", label: "Owner Contact", type: "text" },
              ].map((field, index) => (
                <div key={index} className="flex flex-col">
                  <label className="font-semibold mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    className="border p-3 rounded w-full"
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-t pt-6">
              {[
                { key: "vehicleImage", label: "Vehicle Image" },
                { key: "insuranceImage", label: "Insurance Image" },
                { key: "pollutionImage", label: "Pollution Image" },
              ].map(({ key, label }, index) => (
                <div key={index} className="flex flex-col items-center border p-4 rounded-lg w-full relative">
                  <span className="font-semibold text-lg">{label}</span>
                  <label className="border p-2 rounded w-full flex items-center gap-2 cursor-pointer bg-gray-200 hover:bg-gray-300 mt-2">
                    <FaUpload /> Upload {label}
                    <input
                      type="file"
                      name={key}
                      ref={fileInputRefs[key]}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                  {formData[key] && (
                    <div className="relative mt-2">
                      <Image src={formData[key]} alt={label} className="w-32 h-32 rounded-lg border object-cover" />
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

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 flex items-center justify-center gap-2 hover:bg-blue-700 text-lg "
              >
                <FaSave /> Save Record
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransportVehiclesForm;

'use client';

import { useState, useEffect, useRef } from 'react';
import { executeMutation } from '../../../graphqlClient';
import { CREATE_CLASS_DATA_MUTATION } from '../../../mutation/classesDataMutation/createClassDataMutation';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaTimes, FaUpload } from 'react-icons/fa';
import Select from 'react-select';




export default function ClassForm() {
  const [formData, setFormData] = useState({
    class_title: '',
    tags: '',
    discount: '',
    total_seats: '',
    description: '',
    image: ''
  });

  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const fileInputRef = useRef(null);

  const classOptions = [
    "Nursery", "KG", "1st", "2nd", "3rd", "4th", "5th", "6th",
    "7th", "8th", "9th", "10th", "11th", "12th"
  ];

  useEffect(() => {
    setIsClient(true);  
  }, []);

  const subjectOptions = [
    { value: 'Math', label: 'Math' },
    { value: 'Science', label: 'Science' },
    { value: 'English', label: 'English' },
    { value: 'History', label: 'History' },
    { value: 'Geography', label: 'Geography' },
    { value: 'Computer', label: 'Computer' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Art', label: 'Art' },
    { value: 'Biology', label: 'Biology' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Physics', label: 'Physics' },
  ];

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  
  const handleSubjectChange = (selectedOptions) => {
    setSelectedSubjects(selectedOptions || []);
    setFormData(prev => ({ ...prev, tags: selectedOptions.map(sub => sub.value).join(', ') }));
  };

  const handleClearImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("image", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });
      
      const data = await response.json();
      if (data.imageUrl) {
        setFormData(prev => ({ ...prev, image: data.imageUrl }));
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'description' && value.trim().split(/\s+/).length > 20) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload an image before submitting.");
      return;
    }
    
    try {
      const response = await executeMutation(CREATE_CLASS_DATA_MUTATION, formData);
      if (response.createClassesData.success_msg) {
        setIsSuccess(true);
        setMessage(response.createClassesData.success_msg);
        setFormData({ class_title: '', tags: '', discount: '', total_seats: '', description: '', image: '' });
      } else {
        setIsSuccess(false);
        setMessage(response.createClassesData.error_msg);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("An error occurred while submitting the form.");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg mt-44 mb-24">
         <div className="flex justify-between items-center mb-6">
        <button className="text-white flex items-center bg-blue-600 p-1 pl-2 pr-3" onClick={() => window.history.back()}>
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <h2 className="text-3xl font-semibold">Add New Class</h2>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <select name="class_title" value={formData.class_title} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Class</option>
          {classOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
        
        {isClient && (
        <Select
          isMulti
          options={subjectOptions}
          value={selectedSubjects}
          onChange={handleSubjectChange}
          placeholder="Select subjects..."
        />
      )}        <input type="text" value={formData.tags} readOnly className="border p-2 bg-gray-200" />

        <input name="discount" type="number" value={formData.discount} onChange={handleChange} className="border p-2 rounded" placeholder="Discount %" />
        <input name="total_seats" type="number" value={formData.total_seats} onChange={handleChange} className="border p-2 rounded" placeholder="Total Seats" required />

        <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="border p-2 rounded" placeholder="Description (max 20 words)" required />

        <div className="border p-4 rounded bg-gray-50">
          <label className="cursor-pointer flex items-center gap-2">
            <FaUpload /> Upload Image
            <input type="file" name="image" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
          {formData.image && (
            <div className="mt-2">
              <img src={formData.image} alt="Uploaded" className="w-32 h-32 rounded border" />
              <button type="button" className="text-white mt-2 bg-red-900 p-1 rounded-xl " onClick={handleClearImage}>
                <FaTimes />
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center">
  <button type="submit" className="w-48 bg-blue-600 text-white p-2  hover:bg-blue-800">
    Submit
  </button>
</div>

      </form>
    </div>
  );
}
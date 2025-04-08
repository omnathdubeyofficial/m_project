'use client';

import { useState, useEffect, useRef } from 'react';
import { CREATE_CLASS_DATA_MUTATION } from '../../../mutation/classesDataMutation/createClassDataMutation';
import { FaArrowLeft, FaCheckCircle, FaPlus, FaTimesCircle, FaTimes, FaUpload } from 'react-icons/fa';
import { GET_CLASS_SUBJECTS_DATA } from '../../../query/GetClassSubjectsQuery/getClassSubjectsQuery';
import { executeQuery, executeMutation } from '../../../graphqlClient';
import Select from 'react-select';
import Panel_Header from '../../../dashboard/panel_header';
import Loading from '../../../Loader/page';

export default function ClassForm() {
  const initialFormState = {
    class_title: '',
    tags: '',
    discount: '',
    total_seats: '',
    description: '',
    image: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initialized as true
  const [isClient, setIsClient] = useState(false);
  const [classOptions, setClassOptions] = useState([]);
  const [subjectOptionsByClass, setSubjectOptionsByClass] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    fetchClassSubjects();
  }, []);

  const fetchClassSubjects = async () => {
    try {
      setIsLoading(true); // Set loading to true before fetching
      const response = await executeQuery(GET_CLASS_SUBJECTS_DATA);
      const classSubjects = response?.getClassSubjects || [];
      const uniqueClasses = [...new Set(classSubjects.map(item => item.class_name))];
      setClassOptions(uniqueClasses);

      const subjectOptions = {};
      classSubjects.forEach(item => {
        const subjects = item.subject_name.split(',').map(sub => sub.trim());
        subjectOptions[item.class_name] = subjects.map(subject => ({
          value: subject,
          label: subject
        }));
      });
      setSubjectOptionsByClass(subjectOptions);
    } catch (error) {
      console.error('Error fetching class subjects:', error);
    } finally {
      setIsLoading(false); // Set loading to false after fetch completes (success or failure)
    }
  };

  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const handleSubjectChange = (selectedOptions) => {
    setSelectedSubjects(selectedOptions || []);
    setFormData(prev => ({
      ...prev,
      tags: selectedOptions.map(sub => sub.value).join(', ')
    }));
  };

  const handleClearImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      const data = await response.json();
      if (data.imageUrl) {
        setFormData(prev => ({ ...prev, image: data.imageUrl }));
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'description' && value.trim().split(/\s+/).length > 20) return;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'class_title') {
      setSelectedSubjects([]);
      setFormData(prev => ({ ...prev, tags: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Please upload an image before submitting.');
      return;
    }

    try {
      const response = await executeMutation(CREATE_CLASS_DATA_MUTATION, formData);
      if (response.createClassesData.success_msg) {
        setIsSuccess(true);
        setMessage(response.createClassesData.success_msg);
        setFormData(initialFormState);
        setSelectedSubjects([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setIsSuccess(false);
        setMessage(response.createClassesData.error_msg);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('An error occurred while submitting the form.');
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const currentSubjectOptions = formData.class_title
    ? subjectOptionsByClass[formData.class_title] || []
    : [];

  // Show Loading component while isLoading is true
  if (isLoading) {
    return <Loading />;
  }

  return (
<div className="min-h-screen max-w-6xl mx-auto  items-center justify-center py-16 mt-16 sm:mt-0 px-4 sm:px-6 lg:px-8 lg:pt-36">
  <Panel_Header/>
<div className="max-w-6xl w-full bg-white  shadow-xl p-8">
<div className="mb-6">
  <div className="flex items-center gap-2">
    <FaPlus className="text-blue-600" />
    <div className="relative">
      <h2 className="text-2xl font-semibold text-gray-800">Add New Class</h2>
    </div>
  </div>
</div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Class Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class Title</label>
            <select
              name="class_title"
              value={formData.class_title}
              onChange={handleChange}
              className="w-full border border-gray-300  px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            >
              <option value="">Select Class</option>
              {classOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Subjects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subjects</label>
            {isClient && (
              <Select
                isMulti
                options={currentSubjectOptions}
                value={selectedSubjects}
                onChange={handleSubjectChange}
                placeholder="Select subjects..."
                isDisabled={!formData.class_title}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            )}
          </div>

          {/* Tags (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Selected Subjects</label>
            <input
              type="text"
              value={formData.tags}
              readOnly
              className="w-full border border-gray-200 px-4 py-2 bg-gray-100 text-gray-500"
            />
          </div>

          {/* Discount and Total Seats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
              <input
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleChange}
                className="w-full border border-gray-300  px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter discount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Seats</label>
              <input
                name="total_seats"
                type="number"
                value={formData.total_seats}
                onChange={handleChange}
                className="w-full border border-gray-300  px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter total seats"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300  px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter description (max 20 words)"
              required
            />
          </div>

          <div className="border p-4  bg-gray-50">
          <label className="cursor-pointer flex items-center gap-2">
            <FaUpload /> Upload Image
            <input
              type="file"
              name="image"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          {formData.image && (
            <div className="mt-2">
              <img
                src={formData.image}
                alt="Uploaded"
                className="w-32 h-32 rounded border"
              />
              <button
                type="button"
                className="text-white mt-2 bg-red-900 p-1 rounded-xl"
                onClick={handleClearImage}
              >
                <FaTimes />
              </button>
            </div>
          )}
        </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-48 bg-blue-600 text-white py-2 px-4  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              Submit
            </button>
          </div>

          {/* Message Popup */}
          {message && (
            <div
              className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2  shadow-md text-white flex items-center gap-2 ${
                isSuccess ? 'bg-green-600' : 'bg-red-600'
              }`}
            >
              {isSuccess ? <FaCheckCircle /> : <FaTimesCircle />}
              <span>{message}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
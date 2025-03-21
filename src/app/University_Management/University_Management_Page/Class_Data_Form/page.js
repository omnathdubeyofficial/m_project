'use client';

import { useState, useEffect } from 'react';
import { executeMutation } from "../../../graphqlClient";
import { CREATE_CLASS_DATA_MUTATION } from "../../../mutation/classesDataMutation/createClassDataMutation";
import { FaArrowLeft, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function ClassForm() {
  const [formData, setFormData] = useState({
    class_title: '',
    tags: '',
    image: '',
    student_rating: '',
    student_reviews: '',
    parents_rating: '',
    parents_reviews: '',
    discount: '',
    is_admission: 'yes',
    total_seats: '',
    filled_seats: '',
    description: ''
  });

  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await executeMutation(CREATE_CLASS_DATA_MUTATION, formData);
      if (response.createClassesData.success_msg) {
        setIsSuccess(true);
        setMessage(response.createClassesData.success_msg);
        setFormData({
          class_title: '',
          tags: '',
          image: '',
          student_rating: '',
          student_reviews: '',
          parents_rating: '',
          parents_reviews: '',
          discount: '',
          is_admission: 'yes',
          total_seats: '',
          filled_seats: '',
          description: ''
        });
      } else {
        setIsSuccess(false);
        setMessage(response.createClassesData.error_msg);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-36 py-24 p-8 m-10 bg-white shadow-xl relative">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <button className="bg-gray-600 hover:bg-blue-600 text-white px-6 py-2 flex items-center gap-2" onClick={() => window.history.back()}>
          <FaArrowLeft className="w-5 h-5" /> Back
        </button>
        <h2 className="text-3xl font-semibold text-gray-700">Class Form</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-4 gap-6">
          {Object.keys(formData).map((key) => (
            key !== 'description' && (
              <div key={key} className="flex flex-col">
                <label className="block font-semibold text-gray-600 mb-1">{key.replace('_', ' ').toUpperCase()}</label>
                {key === 'is_admission' ? (
                  <select name={key} value={formData[key]} onChange={handleChange} className="w-full p-3 border focus:ring focus:ring-blue-300">
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                ) : (
                  <input name={key} type={key.includes('seats') || key.includes('rating') ? 'number' : 'text'}
                    value={formData[key]} onChange={handleChange}
                    className="w-full p-3 border focus:ring focus:ring-blue-300" placeholder={`Enter ${key}`} />
                )}
              </div>
            )
          ))}
        </div>
        <div className="mt-6">
          <label className="block font-semibold text-gray-600 mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300" placeholder="Enter description"></textarea>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="w-48 bg-blue-600 hover:bg-blue-800 text-white py-3 rounded-lg mt-6 font-semibold text-lg">
            Submit
          </button>
        </div>
      </form>
      {message && (
        <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white text-center flex items-center gap-2 ${isSuccess ? 'bg-green-600' : 'bg-red-600'}`}>
          {isSuccess ? <FaCheckCircle className="w-6 h-6 text-white" /> : <FaTimesCircle className="w-6 h-6 text-white" />}
          {message}
        </div>
      )}
    </div>
  );
}

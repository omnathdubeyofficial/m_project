'use client';

import React, { useEffect, useState } from 'react';
import {
  FaSignOutAlt,
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { CREATE_CLASS_SUBJECTS_MUTATION } from '../mutation/classSubjectMutation/createclassSubjectMutation';
import { CREATE_CLASS_SUBJECTS_MUTATION } from '../mutation/classSubjectMutation/createclassSubjectMutation';
import { GET_CLASS_SUBJECTS_DATA } from '../query/GetClassSubjectsQuery/getClassSubjectsQuery';
import { executeQuery, executeMutation } from '../graphqlClient';

const Class_Subject_Form = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [logoutMessage, setLogoutMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isError, setIsError] = useState(false);

  const [className, setClassName] = useState('');
  const [subjectsInput, setSubjectsInput] = useState('');
  const [subjectList, setSubjectList] = useState([]);

  useEffect(() => {
    fetchClassSubjects();
  }, []);

  const fetchClassSubjects = async () => {
    const response = await executeQuery(GET_CLASS_SUBJECTS_DATA);
    setSubjectList(response?.getClassSubjects || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subjects = subjectsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .join(',');

    try {
      await executeMutation(CREATE_CLASS_SUBJECTS_MUTATION, {
        class_name: className,
        subject_name: subjects,
      });

      setClassName('');
      setSubjectsInput('');
      fetchClassSubjects();
      setLogoutMessage('Class subjects saved successfully!');
      setIsError(false);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      setLogoutMessage('Failed to save class subjects.');
      setIsError(true);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  return (
    <div className="relative p-4 sm:p-6 lg:p-10 bg-gray-50 min-h-screen">
      {/* Notification Popup */}
      {showPopup && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg text-white flex items-center gap-3 animate-fade-in-up transition-transform duration-300 ${
            isError ? 'bg-red-600' : 'bg-green-600'
          }`}
        >
          {isError ? <FaTimesCircle className="text-xl" /> : <FaCheckCircle className="text-xl" />}
          <span className="text-sm font-medium">{logoutMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-indigo-600 flex items-center text-sm font-medium"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome,{' '}
          <span className="bg-indigo-600 text-white px-3 py-1 rounded-xl">
            {firstName || 'User'}
          </span>
        </h1>
      </header>

      {/* Class + Subjects Form */}
      <section className="bg-white p-6 rounded-2xl shadow-md max-w-3xl mx-auto mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Class Subjects</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Class Name</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subjects (comma separated)</label>
            <input
              type="text"
              value={subjectsInput}
              onChange={(e) => setSubjectsInput(e.target.value)}
              required
              placeholder="e.g. Math, English, Science"
              className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-2 rounded-md shadow-md transition"
          >
            Save Subjects
          </button>
        </form>
      </section>

      {/* Subjects Table */}
      <section className="bg-white p-6 rounded-2xl shadow-md max-w-5xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">All Class Subjects</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 whitespace-nowrap">Class</th>
                <th className="px-4 py-2 whitespace-nowrap">Subjects</th>
                <th className="px-4 py-2 whitespace-nowrap">Date</th>
                <th className="px-4 py-2 whitespace-nowrap">Time</th>
              </tr>
            </thead>
            <tbody>
              {subjectList.map((item, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{item.class_name}</td>
                  <td className="px-4 py-2">{item.subject_name}</td>
                  <td className="px-4 py-2">{item.cdate}</td>
                  <td className="px-4 py-2">{item.ctime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Class_Subject_Form;

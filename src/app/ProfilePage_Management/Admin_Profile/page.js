'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: 'Musharof',
    lastName: 'Chowdhury',
    email: 'randomuser@pimjo.com',
    phone: '+09 363 398 46',
    bio: 'Team Manager',
    location: 'Arizona, United States',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-white shadow-lg mt-40">
      {/* Profile Header */}
     
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 border-b border-gray-200 rounded-t-xl bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
<div
            className='w-24 h-24 rounded-full bg-gray-200 border-4 border-white  cursor-pointer overflow-hidden profile-menu'
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <Image
              src='/img/q.png'
              alt='Profile'
              width={500}
              height={500}
              className='w-full h-full object-cover transition-transform duration-200 hover:scale-105'
            />
          </div>

        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-semibold text-gray-800">{profile.firstName} {profile.lastName}</h2>
          <p className="text-gray-600 text-lg">{profile.bio} | {profile.location}</p>
        </div>
        <button onClick={handleEdit} className="mt-4 sm:mt-0 sm:ml-auto px-6 py-2 text-white bg-indigo-600 rounded-full transition-all transform hover:bg-indigo-700 hover:scale-105 focus:outline-none">Edit</button>
      </div>

      {/* Personal Information */}
      <div className="p-6 mt-6 space-y-6 bg-gray-50 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-gray-500">First Name</p>
            {isEditing ? (
              <input 
                type="text" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleChange} 
                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-lg text-gray-800">{profile.firstName}</p>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-gray-500">Last Name</p>
            {isEditing ? (
              <input 
                type="text" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleChange} 
                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-lg text-gray-800">{profile.lastName}</p>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-gray-500">Email Address</p>
            {isEditing ? (
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-lg text-gray-800">{profile.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-gray-500">Phone</p>
            {isEditing ? (
              <input 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                className="w-full border border-gray-300 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-lg text-gray-800">{profile.phone}</p>
            )}
          </div>
        </div>

        {/* Buttons for Save and Cancel */}
        {isEditing && (
          <div className="mt-6 flex justify-end gap-4">
            <button onClick={() => setIsEditing(false)} className="px-6 py-2 bg-gray-300 rounded-lg text-gray-800 hover:bg-gray-400 transition-all">Cancel</button>
            <button onClick={handleSave} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all">Save</button>
          </div>
        )}
      </div>
    </div>
  );
}

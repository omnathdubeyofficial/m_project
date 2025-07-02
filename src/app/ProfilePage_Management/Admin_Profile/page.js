
"use client";
import { useState, useEffect, useCallback } from 'react'; // useCallback इम्पोर्ट करें
import Image from 'next/image';
import { GET_TOKAN_MANAGEMENT_DATA } from '../../query/authTokanQuery';
import { UPDATE_USER_MANAGEMENT_DATA_MUTATION } from '../../mutation/updateUserManagementData';
import { executeQuery, executeMutation } from '../../graphqlClient';
import { FaCheckCircle, FaEdit, FaSave, FaTimesCircle } from "react-icons/fa";
import Loading from '../../Loader/page'; 

export default function ProfilePage() {
 const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // fetchProfileData को useCallback में लपेटें
  const fetchProfileData = useCallback(async () => {
    try {
      const response = await executeQuery(GET_TOKAN_MANAGEMENT_DATA);
      if (response?.getUserDataFromToken) {
        setProfile(response.getUserDataFromToken);
        setFormData(response.getUserDataFromToken);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [setProfile, setFormData]); // setProfile और setFormData को डिपेंडेंसी में जोड़ा

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]); // fetchProfileData को डिपेंडेंसी में जोड़ा

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const response = await executeMutation(UPDATE_USER_MANAGEMENT_DATA_MUTATION, formData);
      if (response?.updateUserManagementData?.success_msg) {
        setProfile(formData);
        setIsEditing(false);
        setMessage(response.updateUserManagementData.success_msg);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error updating profile data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto p-6 rounded-2xl bg-white shadow-lg mt-40">
      <div className="flex flex-col sm:flex-row items-center gap-6 p-6 border-b border-gray-200 rounded-t-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white ">
        <div className='w-24 h-24 rounded-full bg-gray-200 border-4 border-white overflow-hidden profile-menu'>
          <Image src='/img/q.png' alt='Profile' width={500} height={500} className='w-full h-full object-cover' />
        </div>

        <div className=" text-center sm:text-left">
          <h2 className="text-2xl font-semibold ">{formData.first_name} {formData.middle_name} {formData.last_name}</h2>
          <p className=" text-lg"> <span className="font-semibold" >Role :</span> {formData.role}</p>
          <p className=" text-lg"> <span className="font-semibold" >User ID :</span>  {formData.userid}</p>
        </div>
        {!isEditing && (
          <div onClick={handleEdit} className=" sm:mt-0 sm:ml-auto flex items-center gap-2 cursor-pointer px-6 py-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700">
            <FaEdit /> Edit
          </div>
        )}
      </div>

      <div className="p-6 mt-6 space-y-6 bg-gray-50 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {['first_name', 'middle_name', 'last_name', 'email', 'gender', 'contact_no', 'address', 'nationality'].map((field) => (
            <div key={field} className="space-y-2">
              <label className="text-gray-500">
                {field.replace('_', ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <p className="text-lg text-gray-800">{formData[field]}</p>
              )}
            </div>
          ))}
          <div className="space-y-2">
            <label className="text-gray-500">Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-lg text-gray-800">{formData.date_of_birth}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end gap-4">
            <div onClick={() => setIsEditing(false)} className="flex items-center gap-2 px-6 py-2 bg-red-400 rounded-lg text-white hover:bg-red-600 cursor-pointer">
              <FaTimesCircle /> Cancel
            </div>
            <div onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-500 cursor-pointer">
              <FaSave /> Save
            </div>
          </div>
        )}
      </div>

      {message && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg flex items-center space-x-2 animate-fade-in">
          <FaCheckCircle className="w-6 h-6 text-white" />
          <span className="font-semibold text-lg">{message}</span>
        </div>
      )}
    </div>
  );
}









// "use client";
// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { GET_TOKAN_MANAGEMENT_DATA } from '../../query/authTokanQuery';
// import { UPDATE_USER_MANAGEMENT_DATA_MUTATION } from '../../mutation/updateUserManagementData';
// import { executeQuery, executeMutation } from '../../graphqlClient';
// import {  FaCheckCircle, FaEdit, FaSave, FaTimesCircle } from "react-icons/fa";
// import Loading from '../../Loader/page'; 

// export default function ProfilePage() {
//   const [ setProfile] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   const fetchProfileData = async () => {
//     try {
//       const response = await executeQuery(GET_TOKAN_MANAGEMENT_DATA);
//       if (response?.getUserDataFromToken) {
//         setProfile(response.getUserDataFromToken);
//         setFormData(response.getUserDataFromToken);
//       }
//     } catch (error) {
//       console.error('Error fetching profile data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSave = async () => {
//     try {
//         setIsLoading(true);
//         const response = await executeMutation(UPDATE_USER_MANAGEMENT_DATA_MUTATION, formData);
//         if (response?.updateUserManagementData?.success_msg) {
//             setProfile(formData);
//             setIsEditing(false);
//             setMessage(response.updateUserManagementData.success_msg);
//             setTimeout(() => setMessage(''), 3000);
//         }
//     } catch (error) {
//         console.error('Error updating profile data:', error);
//     } finally {
//         setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     const handleLoad = () => {
//       setIsLoading(false);
//     };

//     if (document.readyState === 'complete') {
//       handleLoad();
//     } else {
//       window.addEventListener('load', handleLoad);
//     }

//     return () => window.removeEventListener('load', handleLoad);
//   }, []);


//   if (isLoading) return <Loading />;

//   return (
//     <div className="max-w-5xl mx-auto p-6 rounded-2xl bg-white shadow-lg mt-40">
//       <div className="flex flex-col sm:flex-row items-center gap-6 p-6 border-b border-gray-200 rounded-t-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white ">
//         <div className='w-24 h-24 rounded-full bg-gray-200 border-4 border-white overflow-hidden profile-menu'>
//           <Image src='/img/q.png' alt='Profile' width={500} height={500} className='w-full h-full object-cover' />
//         </div>

//         <div className=" text-center sm:text-left">
//           <h2 className="text-2xl font-semibold ">{formData.first_name} {formData.middle_name} {formData.last_name}</h2>
//           <p className=" text-lg"> <span className="font-semibold" >Role :</span> {formData.role}</p>
//           <p className=" text-lg"> <span className="font-semibold" >User ID :</span>  {formData.userid}</p>
//         </div>
//         {!isEditing && (
//           <div onClick={handleEdit} className=" sm:mt-0 sm:ml-auto flex items-center gap-2 cursor-pointer px-6 py-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700">
//             <FaEdit /> Edit
//           </div>
//         )}
//       </div>

//       <div className="p-6 mt-6 space-y-6 bg-gray-50 rounded-xl shadow-md">
//         <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {['first_name', 'middle_name', 'last_name', 'email','gender', 'contact_no','address','nationality'].map((field) => (
//             <div key={field} className="space-y-2">
//               <label className="text-gray-500">
//                 {field.replace('_', ' ').toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
//               </label>
//               {isEditing ? (
//                 <input
//                   type="text"
//                   name={field}
//                   value={formData[field] || ''}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
//                 />
//               ) : (
//                 <p className="text-lg text-gray-800">{formData[field]}</p>
//               )}
//             </div>
//           ))}
//           <div className="space-y-2">
//             <label className="text-gray-500">Date of Birth</label>
//             {isEditing ? (
//               <input
//                 type="date"
//                 name="date_of_birth"
//                 value={formData.date_of_birth || ''}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
//               />
//             ) : (
//               <p className="text-lg text-gray-800">{formData.date_of_birth}</p>
//             )}
//           </div>
//         </div>

//         {isEditing && (
//           <div className="mt-6 flex justify-end gap-4">
//             <div onClick={() => setIsEditing(false)} className="flex items-center gap-2 px-6 py-2 bg-red-400 rounded-lg text-white hover:bg-red-600 cursor-pointer">
//               <FaTimesCircle /> Cancel
//             </div>
//             <div onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-500 cursor-pointer">
//               <FaSave /> Save
//             </div>
//           </div>
//         )}
//       </div>

//       {message && (
//         <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg flex items-center space-x-2 animate-fade-in">
//           <FaCheckCircle className="w-6 h-6 text-white" />
//           <span className="font-semibold text-lg">{message}</span>
//         </div>
//       )}
//     </div>
//   );
// }

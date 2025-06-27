// "use client";
// import { useRouter } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import Loading from '../../Loader/page';

// const MenuGrid = ({ menuItems, headerComponent: HeaderComponent }) => {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const handleLoad = () => setIsLoading(false);
//     if (document.readyState === 'complete') {
//       handleLoad();
//     } else {
//       window.addEventListener('load', handleLoad);
//     }
//     return () => window.removeEventListener('load', handleLoad);
//   }, []);


//   if (isLoading) return <Loading />;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#f0f7ff] via-[#e6f0fa] to-[#e0f2e9] pt-24 font-sans">
//     <div className="absolute inset-0 z-0 hidden lg:block">
//  <div className="absolute w-96 h-96 bg-[#8E24AA]/20 rounded-full animate-[float_7s_ease-in-out_infinite] top-20 left-20"></div>
//  <div className="absolute w-80 h-80 bg-[#8B0000]/20 rounded-full animate-[float_9s_ease-in-out_infinite] bottom-10 right-10"></div>
//  <div className="absolute w-64 h-64 bg-[#F3E5F5]/30 rounded-full animate-[float_11s_ease-in-out_infinite] top-1/3 left-1/2"></div>
// </div>
// <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Render Header Component if provided */}
//         {HeaderComponent && <HeaderComponent />}

//         {/* Grid Layout */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
//           {menuItems.map((item, index) => (
//             <div
//               key={index}
//               onClick={() => router.push(item.link)}
//               className="group relative bg-white  shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer p-6 flex flex-col items-center text-center overflow-hidden border border-gray-100 hover:border-indigo-300"
//             >
//               {/* Gradient Overlay on Hover */}
//               <div className="absolute inset-0 bg-gradient-to-t from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

//               {/* Icon */}
//               <div className="relative z-10 bg-indigo-100 p-4 rounded-full mb-4 group-hover:bg-indigo-200 transition-colors duration-300">
//                 <item.icon className="text-3xl text-indigo-600 group-hover:text-indigo-800 transition-transform duration-300 group-hover:scale-110" />
//               </div>

//               {/* Menu Name */}
//               <span className="relative z-10 text-base font-medium text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">
//                 {item.name}
//               </span>

//               {/* Subtle Hover Effect */}
//               <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MenuGrid;


"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Loading from '../../Loader/page';
import { FaUserGraduate, FaUserTie, FaBookOpen, FaCogs } from 'react-icons/fa';

const MenuGrid = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Menu Items defined inside
  const menuItems = [
    { name: "Students", link: "/students", icon: FaUserGraduate },
    { name: "Faculty", link: "/faculty", icon: FaUserTie },
    { name: "Library", link: "/library", icon: FaBookOpen },
    { name: "Settings", link: "/settings", icon: FaCogs },
  ];

  // Optional Header Component defined internally
  const HeaderComponent = () => (
    <div className="text-3xl font-bold text-center text-indigo-800 mb-10">
      Dashboard Menu
    </div>
  );

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f7ff] via-[#e6f0fa] to-[#e0f2e9] pt-24 font-sans">
      <div className="absolute inset-0 z-0 hidden lg:block">
        <div className="absolute w-96 h-96 bg-[#8E24AA]/20 rounded-full animate-[float_7s_ease-in-out_infinite] top-20 left-20"></div>
        <div className="absolute w-80 h-80 bg-[#8B0000]/20 rounded-full animate-[float_9s_ease-in-out_infinite] bottom-10 right-10"></div>
        <div className="absolute w-64 h-64 bg-[#F3E5F5]/30 rounded-full animate-[float_11s_ease-in-out_infinite] top-1/3 left-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HeaderComponent />

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => router.push(item.link)}
              className="group relative bg-white shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer p-6 flex flex-col items-center text-center overflow-hidden border border-gray-100 hover:border-indigo-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

              <div className="relative z-10 bg-indigo-100 p-4 rounded-full mb-4 group-hover:bg-indigo-200 transition-colors duration-300">
                <item.icon className="text-3xl text-indigo-600 group-hover:text-indigo-800 transition-transform duration-300 group-hover:scale-110" />
              </div>

              <span className="relative z-10 text-base font-medium text-gray-800 group-hover:text-indigo-700 transition-colors duration-300">
                {item.name}
              </span>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuGrid;

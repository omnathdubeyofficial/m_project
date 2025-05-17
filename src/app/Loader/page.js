
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // For redirecting after loading

const Loading = ({ delay = 1000 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter(); // Next.js App Router ke liye navigation

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Redirect to another page (e.g., home page) after loading
      router.push("/"); // Yahan aap apni desired redirect path daal sakte hain
    }, delay);

    return () => clearTimeout(timer); // Cleanup timer
  }, [delay, router]);

  // Hamesha ek valid JSX return karna zaroori hai
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {isLoading ? (
        <Image
          src="/gif_loading/loader_block.gif"
          alt="Loading..."
          width={500}
          height={500}
          priority // Loading ke liye priority add kiya for better performance
        />
      ) : (
        <div>Loading complete, redirecting...</div> // Fallback UI jab loading complete ho
      )}
    </div>
  );
};

export default Loading;




// "use client";

// import { useState, useEffect } from 'react';
// import Image from 'next/image';

// const Loading = ({ delay = 1000 }) => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, delay);
//     return () => clearTimeout(timer);
//   }, [delay]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-white">
//         <Image src="/gif_loading/loader_block.gif" alt="Loading..." width={500} height={500} />
//       </div>
//     );
//   }

//   return null;
// };

// export default Loading;

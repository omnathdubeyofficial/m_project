"use client";

import { useRouter } from "next/navigation";

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-700">You do not have permission to access this page.</p>
      
      <button 
        onClick={() => router.push("/login")} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
      >
        Go Back
      </button>
    </div>
  );
}

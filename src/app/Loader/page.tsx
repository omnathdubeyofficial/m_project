"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      router.push("/"); // ✅ Change this path as needed
    }, 1000); // 🔥 No props, hardcoded 1000ms delay

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {isLoading ? (
        <Image
          src="/gif_loading/loader_block.gif"
          alt="Loading..."
          width={500}
          height={500}
          priority
        />
      ) : (
        <div>Loading complete, redirecting...</div>
      )}
    </div>
  );
};

export default Loader;

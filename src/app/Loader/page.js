"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

const Loading = ({ delay = 1000 }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Image src="/gif_loading/loader_block.gif" alt="Loading..." width={500} height={500} />
      </div>
    );
  }

  return null;
};

export default Loading;

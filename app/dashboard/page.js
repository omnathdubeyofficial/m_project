"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Dashboard = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove authentication token
    router.push('/login'); // Redirect to login page
  };

  useEffect(() => {
    // Check if user is authenticated
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Dashboard</h1>
      <button onClick={handleLogout} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

"use client";

import { useRouter } from 'next/navigation'; 
import { useEffect, useState } from 'react';

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
      const token = typeof window !== 'undefined' && localStorage.getItem('authToken');
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/login'); // Redirect to login page if not authenticated
      }
    }, [router]);

    if (isAuthenticated === null) return null; // Wait for the authentication check
    if (!isAuthenticated) return null; // Handle redirection if not authenticated

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;

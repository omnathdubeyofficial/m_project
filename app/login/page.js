"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [usernameError, setUsernameError] = useState(""); // Username specific error
  const [passwordError, setPasswordError] = useState(""); // Password specific error
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogin = () => {
    const validUsername = "admin";
    const validPassword = "password";
    let isValid = true;

    if (username === "") {
      setUsernameError("Username is required");
      isValid = false;
    } else if (username !== validUsername) {
      setUsernameError("Invalid username");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (password === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password !== validPassword) {
      setPasswordError("Invalid password");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      localStorage.setItem("authToken", "your-auth-token");
      router.push("/dashboard");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Side (Image) */}
      <div className="hidden lg:block lg:w-1/1 w-full h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white relative">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <Image
          src="/img/books.jpg"
          alt="Company Logo"
          layout="fill"
          objectFit="cover"
          className="relative z-10"
        />
      </div>

      {/* Right Side (Form) */}
      <div className="flex-grow w-full flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 p-8">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 border border-gray-300 dark:border-gray-600">
          <div className="flex justify-center mb-6">
            <Image src="/img/logo.png" alt="Logo" width={120} height={120} />
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
            Sign In
          </h2>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 w-full rounded-md border-2 border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 px-4 py-3"
                placeholder="Enter your username"
              />
              {usernameError && (
                <div className="text-red-500 text-sm mt-1">{usernameError}</div>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-md border-2 border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 px-4 py-3"
                placeholder="Enter your password"
              />
              {passwordError && (
                <div className="text-red-500 text-sm mt-1">{passwordError}</div>
              )}
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>

            <div className="text-center mt-4">
              <a href="/forgot-password" className="text-indigo-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <a href="/register" className="text-indigo-600 hover:underline">
                Sign Up
              </a>
            </p>
          </div>

          <div className="mt-6 flex justify-center space-x-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              className="bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <FaFacebook className="text-blue-600 w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <FaInstagram className="text-gradient-to-br from-pink-500 via-purple-500 to-yellow-500 w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <FaLinkedin className="text-blue-700 w-6 h-6" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer"
              className="bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <FaYoutube className="text-red-600 w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

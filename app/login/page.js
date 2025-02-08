"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { executeQuery } from "../graphqlClient"; // Path to your Apollo Client setup
import { GET_LOGIN_DATA } from "../query/loginQuery";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogin = async () => {
    setErrorMsg("");
    setUsernameError("");
    setPasswordError("");

    if (!username) {
      setUsernameError("Username is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    const variables = {
      userid: username,
      password: password,
    };

    try {
      const result = await executeQuery(GET_LOGIN_DATA, variables);

      if (result?.login?.success_msg) {
        localStorage.setItem("authToken", "your-auth-token");
        setSuccessMsg(result.login.success_msg); // Success message सेट करना
        setTimeout(() => {
          router.push("/dashboard"); // 2 सेकंड बाद रीडायरेक्ट
        }, 2000);
      }
      else if (result?.login?.error_msg) {
        setErrorMsg(result.login.error_msg);
      }
    } catch (error) {
      setErrorMsg("An error occurred during login");
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
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/uiux.mp4" type="video/mp4" />
        </video>
      </div>

      {successMsg && (
  <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-md shadow-lg flex items-center space-x-2 animate-fade-in">
    <FaCheckCircle className="w-6 h-6 text-white" />
    <span className="font-semibold text-lg">{successMsg}</span>
  </div>
)}



          {/* Right Side (Form) */}
          <div className="flex-grow w-full flex flex-col justify-center items-center bg-gradient-to-r from-blue-700 via-blue-900 to-blue-950 p-8">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-gray-300">
          <div className="flex justify-center mb-6">
            <Image src="/img/logo.png" alt="Logo" width={120} height={120} />
          </div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Sign In
          </h2>
          <form className="space-y-6">
          <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 w-full rounded-md border-2 border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 px-4 py-3"
                placeholder="Enter your username"
              />
              {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-md border-2 border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 px-4 py-3"
                placeholder="Enter your password"
              />
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            </div>


            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Login
            </button>

            {errorMsg && <div className="text-red-500 text-sm mt-2 text-center">{errorMsg}</div>}


            <div className="text-center mt-4">
              <a href="/forgot-password" className="text-indigo-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
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
              <FaInstagram className="text-red-400 w-6 h-6" />
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

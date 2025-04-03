"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { executeQuery, executeMutation } from "../graphqlClient";
import { VERIFY_OTP_MUTATION } from "../mutation/Otp_V/otpMutation";
import { GET_LOGIN_DATA } from "../query/loginQuery";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaCheckCircle, FaHome, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpError, setOtpError] = useState("");

  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLogin = async () => {
    setErrorMsg("");
    setUsernameError("");
    setPasswordError("");

    if (!username) {
      setUsernameError("User ID is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    setLoading(true);
    try {
      const result = await executeQuery(GET_LOGIN_DATA, { userid: username, password });
      if (result?.login?.success_msg) {
        setShowOtpModal(true);
      } else {
        setErrorMsg(result?.login?.error_msg || "Login failed");
      }
    } catch (error) {
      setErrorMsg(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setOtpError("");
    if (!otp) {
      setOtpError("OTP is required");
      return;
    }

    setLoading(true);
    try {
      const otpResult = await executeMutation(VERIFY_OTP_MUTATION, { userid: username, otp });
      if (otpResult?.verifyOtp?.success_msg) {
        setSuccessMsg(otpResult.verifyOtp.success_msg);
        setShowOtpModal(false);
        if (otpResult.verifyOtp.token) {
          localStorage.setItem("token", otpResult.verifyOtp.token);
        }
        router.push("/dashboard");
      } else {
        setOtpError(otpResult?.verifyOtp?.error_msg || "OTP verification failed");
      }
    } catch (error) {
      setOtpError(`OTP verification failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="text-xl font-semibold text-blue-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 md:bg-none relative overflow-hidden">
      {/* Enhanced Animated Background (Visible only on desktop) */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <div className="absolute w-80 h-80 bg-blue-400 rounded-full opacity-30 animate-[float_6s_ease-in-out_infinite] top-10 left-10"></div>
        <div className="absolute w-96 h-96 bg-purple-400 rounded-full opacity-30 animate-[float_8s_ease-in-out_infinite] bottom-20 right-20"></div>
        <div className="absolute w-64 h-64 bg-pink-400 rounded-full opacity-30 animate-[float_10s_ease-in-out_infinite] top-1/2 left-1/3"></div>
      </div>

      {/* Main Container with Glassmorphism */}
      <div className="relative w-full max-w-7xl bg-white/10 md:bg-white/10 backdrop-blur-lg mt-16 shadow-xl border border-white/20 overflow-hidden flex flex-col md:flex-row z-10 transform transition-transform duration-300">
        
      <div className="md:w-1/2 relative text-white p-10  flex flex-col justify-between min-h-[50vh] md:min-h-full">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover z-[-1]"
  >
    <source src="/videos/8500482-hd_1920_1080_30fps.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <div className="relative z-10">
    <div className="flex items-center space-x-4">
      <Image src="/images/logo/image.png" alt="School Logo" width={70} height={70} className="rounded-full shadow-md" />
    </div>
  </div>
  
</div>





        {/* Right Side - Login Form */}
        <div className="md:w-1/2 p-10 bg-white/90 backdrop-blur-sm">
        <div className="flex space-x-4 mb-5">
        <button
                onClick={() => router.back()}
                className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium"
              >
                <FaArrowLeft className="mr-1" /> Back
              </button>
              <button
                onClick={() => router.push("/")}
                className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium"
              >
                <FaHome className="mr-1" /> Home
              </button>
          
            </div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-semibold text-gray-900 tracking-tight">User Login</h2>
           
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">User ID</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 p-4 focus:ring-2 focus:ring-indigo-500 bg-white/50 shadow-inner"
                placeholder="Enter your User ID"
              />
              {usernameError && <p className="text-red-500 text-sm mt-2">{usernameError}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 p-4 focus:ring-2 focus:ring-indigo-500 bg-white/50 shadow-inner"
                placeholder="Enter your password"
              />
              {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-200 transform hover:-translate-y-1"
            >
              Sign In
            </button>

            <div className="text-center">
              <Link href="/forgot-password" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative z-10 flex justify-center space-x-3 mt-8">

<a href="https://facebook.com" target="_blank" className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white bg-[#3b5998] text-white hover:bg-[#2d4373] transition transform hover:rotate-12">
  <FaFacebook size={24} />
</a>
<a href="https://instagram.com" target="_blank" className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white bg-[#e1306c] text-white hover:bg-[#b92b5b] transition transform hover:rotate-12">
  <FaInstagram size={24} />
</a>
<a href="https://linkedin.com" target="_blank" className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white bg-[#0077b5] text-white hover:bg-[#005f8f] transition transform hover:rotate-12">
  <FaLinkedin size={24} />
</a>
<a href="https://youtube.com" target="_blank" className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white bg-[#ff0000] text-white hover:bg-[#cc0000] transition transform hover:rotate-12">
  <FaYoutube size={24} />
</a>
</div>
            {errorMsg && <div className="text-red-500 text-sm text-center mt-4">{errorMsg}</div>}
          </form>
        </div>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-3 animate-bounce">
          <FaCheckCircle size={22} />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Verify OTP</h3>
            <div className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 p-4 focus:ring-2 focus:ring-indigo-500 bg-white/50 shadow-inner"
                  placeholder="Enter OTP"
                />
                {otpError && <p className="text-red-500 text-sm mt-2">{otpError}</p>}
              </div>
              <div className="flex justify-between gap-4">
                <button
                  onClick={() => setShowOtpModal(false)}
                  className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-xl hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleOtpSubmit}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl hover:bg-indigo-700 transition"
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
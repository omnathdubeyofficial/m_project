"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { executeQuery, executeMutation } from "../graphqlClient";
import { VERIFY_OTP_MUTATION } from "../mutation/Otp_V/otpMutation";
import { GET_LOGIN_DATA } from "../query/loginQuery";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube, FaCheckCircle, FaHome, FaArrowLeft } from "react-icons/fa";

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
      setUsernameError("Student ID is required");
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
        router.push("/dashboard"); // Redirect to a school dashboard
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-medium text-blue-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 p-4">
      {/* Main Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side - School Branding */}
        <div className="md:w-1/2 bg-blue-600 text-white p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <Image src="/img/school-logo.png" alt="School Logo" width={60} height={60} />
              <h1 className="text-2xl font-bold">Springfield School</h1>
            </div>
            <p className="mt-4 text-sm">Welcome back! Log in to access your school portal securely.</p>
          </div>
          <div className="flex space-x-4 mt-6">
            <a href="https://facebook.com" target="_blank" className="text-white hover:text-blue-200">
              <FaFacebook size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" className="text-white hover:text-blue-200">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" className="text-white hover:text-blue-200">
              <FaLinkedin size={24} />
            </a>
            <a href="https://youtube.com" target="_blank" className="text-white hover:text-blue-200">
              <FaYoutube size={24} />
            </a>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="md:w-1/2 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Student Login</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => router.push("/")}
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <FaHome className="mr-1" /> Home
              </button>
              <button
                onClick={() => router.back()}
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <FaArrowLeft className="mr-1" /> Back
              </button>
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Student ID</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your Student ID"
              />
              {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Sign In
            </button>

            {errorMsg && <div className="text-red-500 text-sm text-center">{errorMsg}</div>}
          </form>
        </div>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <FaCheckCircle size={20} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Verify OTP</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter OTP"
                />
                {otpError && <p className="text-red-500 text-sm mt-1">{otpError}</p>}
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowOtpModal(false)}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleOtpSubmit}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
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
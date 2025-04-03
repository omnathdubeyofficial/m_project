"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaArrowLeft, FaHome } from "react-icons/fa";
import Link from "next/link";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
  const [successMsg, setSuccessMsg] = useState("");

  const router = useRouter();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setEmailError("");

    if (!email) {
      setEmailError("Email ID is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Simulate sending OTP (no backend yet)
    setStep(2);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setOtpError("");

    if (!otp) {
      setOtpError("OTP is required");
      return;
    }

    // Simulate OTP verification (no backend yet)
    setStep(3);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError("");

    if (!newPassword || !confirmPassword) {
      setPasswordError("Both password fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Simulate password update (no backend yet)
    setSuccessMsg("Password updated successfully!");
    setStep(4);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4 sm:p-6 md:p-0">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl bg-white/90 backdrop-blur-lg shadow-xl border border-white/20 p-6 sm:p-8 md:p-10 rounded-2xl z-10">
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6 justify-between items-center">
          <div className="flex space-x-4">
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
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight mt-4 sm:mt-0">
            Forgot Password
          </h2>
        </div>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Registered Email ID
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 p-3 sm:p-4 focus:ring-2 focus:ring-indigo-500 bg-white/50 shadow-inner"
                placeholder="Enter your email ID"
              />
              {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 sm:py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-200 transform hover:-translate-y-1"
            >
              Verify Email ID
            </button>
          </form>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div>
              <p className="text-gray-700 text-sm sm:text-base mb-4">
                An OTP has been sent to <span className="font-semibold">{email}</span>. Please check your inbox.
              </p>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 p-3 sm:p-4 focus:ring-2 focus:ring-indigo-500 bg-white/50 shadow-inner"
                placeholder="Enter OTP"
              />
              {otpError && <p className="text-red-500 text-sm mt-2">{otpError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 sm:py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-200 transform hover:-translate-y-1"
            >
              Submit OTP
            </button>
          </form>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 p-3 sm:p-4 focus:ring-2 focus:ring-indigo-500 bg-white/50 shadow-inner"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 p-3 sm:p-4 focus:ring-2 focus:ring-indigo-500 bg-white/50 shadow-inner"
                placeholder="Confirm new password"
              />
              {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 sm:py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-200 transform hover:-translate-y-1"
            >
              Update Password
            </button>
          </form>
        )}

        {/* Step 4: Success Message */}
        {step === 4 && (
          <div className="text-center space-y-6">
            <div className="flex justify-center items-center space-x-3 text-green-500">
              <FaCheckCircle size={24} />
              <span className="text-lg sm:text-xl font-semibold">{successMsg}</span>
            </div>
            <p className="text-gray-700 text-sm sm:text-base">
              Your password has been updated successfully. You can now log in with your new password.
            </p>
            <Link
              href="/login"
              className="inline-block bg-indigo-600 text-white py-2 sm:py-3 px-6 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-200 transform hover:-translate-y-1"
            >
              Go to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
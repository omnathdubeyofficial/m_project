"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaHome, FaExclamationCircle } from "react-icons/fa";
import Link from "next/link";
import { executeMutation } from "../graphqlClient";
import { SEND_OTP_FOR_PASSWORD_RESET } from "../mutation/ForgetPasswordMutation/sendOtpForPasswordReset";
import { VERIFY_OTP_AND_RESET_PASSWORD } from "../mutation/ForgetPasswordMutation/verifyOtpAndResetPassword";


const ForgotPassword = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [userIdError, setUserIdError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [step, setStep] = useState(1);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0); // Timer in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const router = useRouter();

// Password validation function
const validatePassword = (password) => {
  const hasNumber = /[0-9]/.test(password); // कम से कम एक नंबर हो
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password); // कम से कम एक symbol हो
  const hasLowerCase = /[a-z]/.test(password); // कम से कम एक छोटा लेटर हो (a-z)
  const hasUpperCase = /[A-Z]/.test(password); // कम से कम एक बड़ा लेटर हो (A-Z)
  const lengthValid = password.length >= 8 && password.length <= 50; // लंबाई 8 से 50 के बीच हो
  const onlyLatin = /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]*$/.test(password); // सिर्फ Latin characters और symbols हों

  return {
    isValid:
      hasNumber &&
      hasSymbol &&
      hasLowerCase &&
      hasUpperCase &&
      lengthValid &&
      onlyLatin,

    errors: [
      !hasNumber && "Password must contain at least one number",
      !hasSymbol &&
        "Password must contain at least one symbol (!@#$%^&*(),.?\":{}|<>)",
      !hasLowerCase && "Password must contain at least one lowercase letter",
      !hasUpperCase && "Password must contain at least one uppercase letter",
      !lengthValid && "Password must be between 8 and 50 characters",
      !onlyLatin &&
        "Password must contain only Latin letters, numbers, and allowed symbols",
    ].filter(Boolean),
  };
};


  // Timer effect for resend button
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval); // Cleanup on unmount or timer change
    } else {
      setIsResendDisabled(false); // Enable resend button when timer reaches 0
    }
  }, [resendTimer]);

  // Step 1: Send OTP (also used for resend)
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setUserIdError("");
    setEmailError("");
    setErrorMsg("");

    if (!userId) {
      setUserIdError("User ID is required");
      return;
    }
    if (!email) {
      setEmailError("Email ID is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const variables = { userid: userId, email };
      const result = await executeMutation(SEND_OTP_FOR_PASSWORD_RESET, variables);
      const response = result?.sendOtpForPasswordReset;

      if (response?.success_msg) {
        setStep(2);
        setResendTimer(120); // Start 2-minute timer (120 seconds)
        setIsResendDisabled(true); // Disable resend button
      } else {
        setErrorMsg(response?.error_msg || "Failed to send OTP. Please try again.");
      }
    } catch {
      setErrorMsg("An error occurred. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = (e) => {
    e.preventDefault();
    handleEmailSubmit(e); // Reuse the same function with current userId and email
  };

  // Step 2: Verify OTP and Reset Password
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setOtpError("");
    setPasswordError("");
    setErrorMsg("");

    if (!otp || otp.length < 4) {
      setOtpError("Please enter a valid OTP (minimum 6 characters)");
      return;
    }
    if (!newPassword || !confirmPassword) {
      setPasswordError("Both password fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.errors.join(", "));
      return;
    }

    setLoading(true);
    try {
      const variables = { userid: userId, otp, newPassword };
      const result = await executeMutation(VERIFY_OTP_AND_RESET_PASSWORD, variables);
      const response = result?.verifyOtpAndResetPassword;

      if (response?.success_msg) {
        setSuccessMsg(response.success_msg);
        setStep(3);
      } else {
        setErrorMsg(response?.error_msg || "Invalid OTP or failed to reset password.");
      }
    } catch  {
      setErrorMsg("An error occurred during password reset.");
    } finally {
      setLoading(false);
    }
  };

  // Format timer as MM:SS
  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
  };

  return (
    <div>
            <div className="absolute inset-0 z-0 hidden lg:block">
        <div className="absolute w-96 h-96 bg-[#8E24AA]/20 rounded-full animate-[float_7s_ease-in-out_infinite] top-20 left-20"></div>
        <div className="absolute w-80 h-80 bg-[#8B0000]/20 rounded-full animate-[float_9s_ease-in-out_infinite] bottom-10 right-10"></div>
        <div className="absolute w-64 h-64 bg-[#F3E5F5]/30 rounded-full animate-[float_11s_ease-in-out_infinite] top-1/3 left-1/2"></div>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 sm:p-6 md:p-0">
        <div className="relative w-full mt-44 mb-24 max-w-md sm:max-w-lg md:max-w-xl bg-white/90 backdrop-blur-lg shadow-xl border border-white/20 p-6 sm:p-8 md:p-10 z-10">
          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-6 justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={() => router.back()}
                className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium"
                disabled={loading}
              >
                <FaArrowLeft className="mr-1" /> Back
              </button>
              <button
                onClick={() => router.push("/")}
                className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium"
                disabled={loading}
              >
                <FaHome className="mr-1" /> Home
              </button>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight mt-4 sm:mt-0">
              Forgot Password
            </h2>
          </div>

          {/* Step 1: User ID & Email */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                  User ID
                </label>
                <input
                  id="userId"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value.trim())}
                  className="mt-2 w-full rounded-xl border border-gray-200 p-3 sm:p-4 focus:ring-2 focus:ring-indigo-500 bg-white/50 shadow-inner"
                  placeholder="Enter your User ID"
                  disabled={loading}
                />
                {userIdError && <p className="text-red-500 text-sm mt-2">{userIdError}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Registered Email ID
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  className="mt-2 w-full rounded-xl border border-gray-200 p-3 sm:p-4 focus:ring-2 focus:ring-indigo-500 bg-white/50 shadow-inner"
                  placeholder="Enter your email ID"
                  disabled={loading}
                />
                {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
              </div>
              {errorMsg && (
                <div className="text-red-500 text-sm flex items-center">
                  <FaExclamationCircle className="mr-2" /> {errorMsg}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 sm:py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-200 transform hover:-translate-y-1 disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Verify Email ID"}
              </button>
            </form>
          )}

          {/* Step 2: OTP Verification and Password Reset */}
          {step === 2 && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-2xl p-4  max-w-lg md:max-w-xl mx-auto mb-6">
                  <div className="bg-green-100 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base leading-relaxed">
                      <span className="block font-medium text-gray-900 mb-1">OTP Sent Successfully</span>
                      We’ve sent an OTP to{" "}
                      <span className="font-semibold text-green-700">{email}</span> for User ID{" "}
                      <span className="font-semibold text-green-700">{userId}</span>. Please check your inbox.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Didn’t receive the OTP?{" "}
                      <button
                        onClick={handleResendOtp}
                        className={`text-green-600 font-medium hover:underline ${
                          isResendDisabled ? "cursor-not-allowed opacity-50" : ""
                        }`}
                        disabled={isResendDisabled || loading}
                      >
                        Resend
                      </button>
                      {isResendDisabled && (
                        <span className="ml-2 text-gray-600">({formatTimer(resendTimer)})</span>
                      )}
                    </p>
                    <div className="mt-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
                      <span className="font-semibold">Note:</span> For your security,{" "}
                      <span className="font-semibold">do not share your OTP with anyone</span>. It is meant
                      for your personal use only.
                    </div>
                  </div>
                </div>

                <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                  User ID
                </label>
                <input
                  id="userId"
                  type="text"
                  value={userId}
                  className="mt-2 w-full rounded-xl border border-gray-200 p-3 sm:p-4 bg-gray-100 shadow-inner"
                  disabled
                />
              </div>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.trim())}
                  className="mt-2 w-full rounded-xl border border-gray-200 p-3 sm:p-4 focus:ring-2 focus:ring-indigo-500 bg-white/50 shadow-inner"
                  placeholder="Enter OTP"
                  disabled={loading}
                />
                {otpError && <p className="text-red-500 text-sm mt-2">{otpError}</p>}
              </div>
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
                  disabled={loading}
                  maxLength={50}
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
                  disabled={loading}
                  maxLength={50}
                />
                {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
              </div>
              {errorMsg && (
                <div className="text-red-500 text-sm flex items-center">
                  <FaExclamationCircle className="mr-2" /> {errorMsg}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 sm:py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-200 transform hover:-translate-y-1 disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? "Processing..." : "Verify OTP & Reset Password"}
              </button>
            </form>
          )}

          {/* Step 3: Success/Error Message */}
          {step === 3 && (
            <div className="text-center space-y-6">
              {successMsg ? (
               <div className="max-w-md mx-auto mt-10  p-6 sm:p-8 text-center space-y-5">
               {/* ✅ Big Green Check Icon */}
               <div className="flex justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-green-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4 -4M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10s-4.48 10 -10 10z" />
                 </svg>
               </div>
             
               {/* ✅ Success Heading */}
               <h2 className="text-xl sm:text-2xl font-semibold text-green-700">{successMsg}</h2>
             
               {/* ✅ Message */}
               <div className="bg-green-50 border border-green-100 text-green-900 p-4 rounded-xl shadow-sm max-w-md mx-auto text-sm sm:text-base">
  Your password has been updated successfully for User ID{" "}
  <span className="font-semibold text-green-700">{userId}</span>. You can now log in using your new password.
</div>

             
               {/* ✅ CTA Button */}
               <Link
                 href="/login"
                 className="inline-block bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base font-medium px-6 py-3  transition-transform duration-200 hover:-translate-y-1"
               >
                 Go to Login
               </Link>
             </div>
             
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex justify-center items-center space-x-3 text-red-500">
                    <FaExclamationCircle size={32} className="animate-pulse" />
                    <span className="text-lg sm:text-xl font-semibold">
                      {errorMsg || "Something went wrong!"}
                    </span>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="inline-block bg-indigo-600 text-white py-2 sm:py-3 px-6 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-200 transform hover:-translate-y-1"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
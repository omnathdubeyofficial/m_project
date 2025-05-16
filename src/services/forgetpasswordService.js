import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

const sendOtpForPasswordReset = async (args = {}) => {
  // console.log("🔔 [sendOtpForPasswordReset] Input Args:", args);

  const { userid, email } = args;

  // Step 1: Input validation
  if (!userid || !email) {
    // console.log("❌ [Validation Error] Missing userid or email.");
    return {
      success_msg: null,
      error_msg: "Both UserID and Email are required fields.",
    };
  }

  try {
    // Step 2: Ensure Prisma is connected
    if (!prisma || !prisma.user_management) {
      // console.log("❌ [Database Error] Prisma not initialized.");
      return {
        success_msg: null,
        error_msg: "Database connection error. Please try again later.",
      };
    }

    // Step 3: Fetch user
    const user = await prisma.user_management.findFirst({
      where: { userid, email },
    });

    if (!user) {
      // console.log("❌ [User Not Found] No matching user found.");
      return {
        success_msg: null,
        error_msg: "No user found with the provided UserID and Email.",
      };
    }

    // Step 4: Generate OTP and expiry
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpExpiry = BigInt(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Step 5: Save OTP in database
    try {
      await prisma.user_management.update({
        where: { z_id: user.z_id },
        data: { otp, otpExpiry },
      });
    } catch  {
      // console.error("❌ [Database Update Error] Failed to store OTP:", updateError.message || updateError);
      return {
        success_msg: null,
        error_msg: "Failed to store OTP in the database. Please try again.",
      };
    }

    // Step 6: Send OTP via email
    try {
      await sendOtpEmail(email, otp);
    } catch (emailError) {
      // console.error("❌ [Email Send Error]:", emailError.message || emailError);

      // Detect possible internet issue
      if (
        emailError.code === 'ENOTFOUND' ||
        emailError.code === 'ECONNREFUSED' ||
        emailError.message?.toLowerCase().includes("network") ||
        emailError.message?.toLowerCase().includes("timeout")
      ) {
        return {
          success_msg: null,
          error_msg: "Network error while sending email. Please check your internet connection.",
        };
      }

      return {
        success_msg: null,
        error_msg: "Failed to send OTP email. Please try again later.",
      };
    }

    // Step 7: Success response
    // console.log(`✅ [Success] OTP sent to: ${email}`);
    return {
      success_msg: "An OTP has been sent to your registered email address.",
      error_msg: null,
    };

  } catch (err) {
    console.error("❌ [Unhandled Error]:", err.message || err);

    if (
      err.code === 'ENOTFOUND' ||
      err.code === 'ECONNREFUSED' ||
      err.message?.toLowerCase().includes("network") ||
      err.message?.toLowerCase().includes("internet")
    ) {
      return {
        success_msg: null,
        error_msg: "Internet connection error. Please check your network and try again.",
      };
    }

    return {
      success_msg: null,
      error_msg: `Unexpected server error: ${err.message || "Please try again later."}`,
    };
  }
};

  


  const verifyOtpAndResetPassword = async (args) => {
    const { userid, otp, newPassword } = args;
    console.log("🔐 [verifyOtpAndResetPassword] Input:", { userid, otp });
  
    try {
      const user = await prisma.user_management.findFirst({ where: { userid } });
      console.log("📄 [verifyOtpAndResetPassword] User Lookup Result:", user);
  
      if (!user) {
        return { error_msg: "User not found" };
      }
  
      if (!user.otp || !user.otpExpiry || Date.now() > Number(user.otpExpiry)) {
        console.log("⏰ [verifyOtpAndResetPassword] OTP expired or invalid");
        return { error_msg: "OTP expired or invalid" };
      }
  
      if (user.otp !== otp) {
        console.log("❌ [verifyOtpAndResetPassword] Incorrect OTP");
        return { error_msg: "Incorrect OTP" };
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      console.log("🔒 [verifyOtpAndResetPassword] Password hashed");
  
      await prisma.user_management.update({
        where: { z_id: user.z_id },
        data: {
          password: hashedPassword,
          otp: null,
          otpExpiry: null,
        },
      });
  
      console.log("✅ [verifyOtpAndResetPassword] Password updated in DB");
  
      await sendPasswordUpdateConfirmationEmail(user.email);
      console.log("📨 [verifyOtpAndResetPassword] Confirmation email sent");
  
      return { success_msg: "Password updated successfully", error_msg: null };
    } catch (err) {
      console.error("❌ [verifyOtpAndResetPassword] Error:", err.message || err);
      return { error_msg: "Failed to reset password", success_msg: null };
    }
  };
  


// 3. Send OTP Email
const sendOtpEmail = async (email, otp) => {
  console.log("📬 [sendOtpEmail] Sending OTP email to:", email);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Password Reset OTP',
    text: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
  console.log("✅ [sendOtpEmail] Email sent successfully");
};


// 4. Confirmation Email
const sendPasswordUpdateConfirmationEmail = async (email) => {
  console.log("📬 [sendPasswordUpdateConfirmationEmail] Sending to:", email);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Updated Successfully',
    text: `Your password has been successfully updated. If you did not do this, contact support immediately.`,
  };

  await transporter.sendMail(mailOptions);
  console.log("✅ [sendPasswordUpdateConfirmationEmail] Confirmation email sent");
};

export {
  sendOtpForPasswordReset,
  verifyOtpAndResetPassword,
};

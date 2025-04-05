import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

const sendOtpForPasswordReset = async (args = {}) => {
    console.log("🔔 [sendOtpForPasswordReset] Input Args:", args);
  
    const { userid, email } = args;
  
    if (!userid || !email) {
      console.log("❌ [sendOtpForPasswordReset] Missing userid or email.");
      return {
        success_msg: null,
        error_msg: "UserID और Email दोनों ज़रूरी हैं।",
      };
    }
  
    try {
      const user = await prisma.user_management.findFirst({
        where: { userid, email },
      });
  
      if (!user) {
        console.log("❌ [sendOtpForPasswordReset] User not found.");
        return {
          success_msg: null,
          error_msg: "User not found with this UserID and Email.",
        };
      }
  
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiry = BigInt(Date.now() + 10 * 60 * 1000); // convert to BigInt for DB
      
      await prisma.user_management.update({
        where: { z_id: user.z_id },
        data: { otp, otpExpiry }
      });
      
  
      console.log(`✅ [sendOtpForPasswordReset] OTP generated: ${otp}`);
      await sendOtpEmail(email, otp);
      console.log(`📧 [sendOtpForPasswordReset] OTP sent to: ${email}`);
  
      return {
        success_msg: "OTP sent to your email.",
        error_msg: null,
      };
    } catch (err) {
      console.error("❌ Error sending OTP:", err.message || err);
      return {
        success_msg: null,
        error_msg: "Failed to send OTP. Please try again later.",
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

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { setUserDate, setUserTime, setDateFormat } from './dateTimeService.js';
// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
// Get all users
const getUserManagementData = async () => {
  try {
    let getData = await prisma.user_management.findMany()
    return getData

  } catch (err) {
    console.error("Error while fetching user management data:", err)
  } finally {
    prisma.$disconnect()
  }
};


// Function to verify a password
async function verifyPassword(plainPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}

const login = async (_, { userid, password }) => {
  try {
    console.log("🔹 Login attempt for userid:", userid);

    // Check DB connection before query
    if (!prisma || !prisma.user_management) {
      console.log("❌ Database connection error");
      return { error_msg: "Unable to connect to the database. Please try again later.", token: null };
    }

    const user = await prisma.user_management.findFirst({ where: { userid } });
    console.log("🔹 User fetched from DB:", user ? "User found" : "User not found");

    if (!user) {
      return { error_msg: "Invalid Username. Please check your userid.", token: null };
    }

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return { error_msg: "Invalid Password. Please try again.", token: null };
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    // Save OTP to DB
    try {
      await prisma.user_management.update({
        where: { z_id: user.z_id },
        data: {
          otp,
          otpExpiry
        }
      });
    } catch (dbUpdateErr) {
      console.error("❌ OTP Save Error:", dbUpdateErr.message || dbUpdateErr);
      return { error_msg: "Error saving OTP. Please try again.", token: null };
    }

    // Send OTP to user's email
    try {
      await sendOtpEmail(user.email, otp);
    } catch (emailErr) {
      console.error("❌ OTP Email Error:", emailErr.message || emailErr);
      return { error_msg: "Unable to send OTP email. Check your internet connection or try again later.", token: null };
    }

    return {
      success_msg: "OTP sent to your email. Please verify to complete login.",
      token: null,
      requiresOtp: true
    };

  } catch (err) {
    console.error("❌ Unknown Error:", err.message || err);

    if (err.code === 'ENOTFOUND' || err.message?.includes("fetch failed")) {
      return { error_msg: "Network error. Please check your internet connection.", token: null };
    }

    return {
      error_msg: `Server error: ${err.message || "Unknown error occurred. Please try again."}`,
      token: null
    };
  }
};


// New endpoint to verify OTP and generate token
const verifyOtp = async (_, { userid, otp }, { res }) => {
  try {
    console.log("🔹 OTP verification attempt for userid:", userid);

    // Fetch user using userid, then use z_id for updates
    const user = await prisma.user_management.findFirst({ where: { userid } });
    if (!user) {
      return { error_msg: "Invalid user", token: null };
    }

    // Check OTP validity
    if (!user.otp || !user.otpExpiry || Date.now() > user.otpExpiry) {
      return { error_msg: "OTP expired or invalid", token: null };
    }

    if (user.otp !== otp) {
      console.log("❌ Invalid OTP");
      return { error_msg: "Invalid OTP", token: null };
    }

    // OTP is valid, clear it from database using z_id
    await prisma.user_management.update({
      where: { z_id: user.z_id }, // z_id use karo
      data: {
        otp: null,
        otpExpiry: null
      }
    });

    // JWT Configuration
    const SECRET_KEY = process.env.JWT_SECRET;
    const JWT_ISSUER = process.env.JWT_ISSUER;
    const JWT_AUDIENCE = process.env.JWT_AUDIENCE;
    const JWT_ALGORITHM = process.env.JWT_ALGORITHM || "HS256";

    if (!SECRET_KEY || !JWT_ISSUER || !JWT_AUDIENCE) {
      throw new Error("Missing JWT configuration in environment variables!");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userid: user.userid,
        role: user.role,
      },
      SECRET_KEY,
      {
        expiresIn: "6h",
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
        algorithm: JWT_ALGORITHM,
      }
    );

    // Set cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      secure: true,
      maxAge: 6 * 60 * 60 * 1000,
    });

    await new Promise((resolve) => setTimeout(resolve, 10));
    console.log("✅ Login Successful with OTP verification");

    return { success_msg: "Login successful", token };

  } catch (err) {
    console.error("❌ Error during OTP verification:", err.message || err);
    return { error_msg: `❌ Error during OTP verification: ${err.message || err}`, token: null };
  }
};

// Email sending function
const sendOtpEmail = async (email, otp) => {
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
    subject: 'Your Login OTP',
    text: `Your OTP for login is: ${otp}. It will expire in 10 minutes.`
  };

  await transporter.sendMail(mailOptions);
};






// const login = async ({ userid, password }) => {
//   let error_msg = ""
//   try {
//     const user = await prisma.user_management.findFirst({
//       where: { userid },
//     });

//     if (user) {
//       console.log("The user data is :", user)
//       const isMatch = await verifyPassword(password, user.password);
//       if (isMatch) {
//         console.log('Login successful');
//         const success_msg = "Login successfully."
//         return { ...user, success_msg };
//       } else {
//         error_msg = 'Invalid password'
//         console.log(error_msg);
//         return { error_msg }
//       }
//     } else {
//       error_msg = "Invalid Username"
//       console.log(error_msg);
//       return { error_msg }
//     }
//   } catch (err) {
//     error_msg = `Facing error while login: ${err.message || err}`
//     console.error(error_msg)
//     return { error_msg }
//   } finally {
//     prisma.$disconnect()
//   }
// }


// Function to hash a password
async function hashPassword(plainPassword) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
}

// Create a new user
const createUserManagementData = async ({ first_name, middle_name, last_name, gender, email, password, contact_no, role, status, subject_specialization, class_assigned, teacher_id, admin_id, joining_date, qualification, enrollment_no, date_of_birth, standard, section, parent_id, admission_date, children_id, occupation, address, nationality, profile_img, adhar_card_front_img, adhar_card_back_img, pan_card_img }) => {

  try {
    const hashedPassword = await hashPassword(password)
    const userId = (name, date) => {
      if (name != null || name != "" || name != undefined || date != null || date != "" || date != undefined) {
        console.log(`${name}${date}`)
        return `${name}${date}`
      }
    }

    //  user data created successfully
    let userData = await prisma.user_management.create({
      data: { z_id: uuidv4(), userid: userId(first_name, date_of_birth), first_name, middle_name, last_name, gender, email, password: hashedPassword, contact_no, role, status, subject_specialization, class_assigned, teacher_id, admin_id, joining_date: setDateFormat(joining_date), qualification, enrollment_no, date_of_birth: setDateFormat(date_of_birth), standard, section, parent_id, admission_date: setDateFormat(admission_date), children_id, occupation, address, nationality, profile_img, adhar_card_front_img, adhar_card_back_img, pan_card_img, cdate: setUserDate(), ctime: setUserTime() },
    });

    const success_msg = "Data created successfully."
    console.log(userData)
    return { ...userData, success_msg }

  } catch (e) {
    const error_msg = `Error while creating user management data: ${e.message || e}`;
    console.error(error_msg);
    return { error_msg };

  } finally {
    prisma.$disconnect()
  }
};

// Update an existing user by ID
const updateUserManagementData = async ({ z_id, first_name, middle_name, last_name, gender, email, password, contact_no, role, status, subject_specialization, class_assigned, teacher_id, admin_id, joining_date, qualification, enrollment_no, date_of_birth, standard, section, parent_id, admission_date, children_id, occupation, address, nationality, profile_img, adhar_card_front_img, adhar_card_back_img, pan_card_img }) => {

  try {

    let updateData = await prisma.user_management.update({
      where: { z_id },
      data: { first_name, middle_name, last_name, gender, email, password, contact_no, role, status, subject_specialization, class_assigned, teacher_id, admin_id, joining_date: setDateFormat(joining_date), qualification, enrollment_no, date_of_birth: setDateFormat(date_of_birth), standard, section, parent_id, admission_date: setDateFormat(admission_date), children_id, occupation, address, nationality, profile_img, adhar_card_front_img, adhar_card_back_img, pan_card_img, udate: setUserDate(), utime: setUserTime() },
    });
    const success_msg = "User management data updated successfully."
    updateData = { ...updateData, success_msg }
    return updateData;

  } catch (e) {
    const error_msg = `Error while updating user management data: ${e.message || e}`
    console.error("Error while updating user management data:", error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};


// Delete a user by ID
const deleteUserManagementData = async ({ z_id }) => {
  try {
    let deleteData = await prisma.user_management.delete({
      where: { z_id },
    });
    const success_msg = "User management data deleted successfully."
    deleteData = { ...deleteData, success_msg }
    return deleteData;
  } catch (e) {
    const error_msg = `Error while deleting user management data: ${e.message || e}`
    console.error("Error while deleting user management data:", error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

export { getUserManagementData,verifyOtp, createUserManagementData, updateUserManagementData, deleteUserManagementData, login };

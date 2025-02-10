import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { setUserDate, setUserTime } from './dateTimeService.js';
// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';



const SECRET_KEY = process.env.JWT_SECRET;


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

const login = async ({ userid, password }) => {
  let error_msg = "";
  try {
    const user = await prisma.user_management.findFirst({
      where: { userid },
    });

    if (user) {
      console.log("The user data is :", user);
      const isMatch = await verifyPassword(password, user.password);
      if (isMatch) {
        console.log("Login successful");

        // Generate JWT token
        const token = jwt.sign(
          { userid: user.userid, role: user.role }, // Include role in the payload
          SECRET_KEY,
          { expiresIn: '6h' } // Set expiration time
        );

        const success_msg = "Login successfully.";
        console.log("The token is:", token)
        return { token, success_msg }; // Return token along with user info
      } else {
        error_msg = "Invalid password";
        console.log(error_msg);
        return { error_msg };
      }
    } else {
      error_msg = "Invalid Username";
      console.log(error_msg);
      return { error_msg };
    }
  } catch (err) {
    error_msg = `Facing error while login: ${err.message || err}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
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
const createUserManagementData = async ({ first_name, middle_name, last_name, gender, email, password, contact_no, role, status, subject_specialization, class_assigned, teacher_id, admin_id, joining_date, qualification, enrollment_no, date_of_birth, standard, section, parent_id, admission_date, children_id, occupation, address, nationality }) => {

  try {
    const hashedPassword = await hashPassword(password)
    const userId = (name, date) => {
      if (name != null || name != "" || name != undefined || date != null || date != "" || date != undefined) {
        return `${name}${date}`
      }
    }
    //  user data created successfully
    let userData = await prisma.user_management.create({
      data: { z_id: uuidv4(), userid: userId(first_name, date_of_birth), first_name, middle_name, last_name, gender, email, password: hashedPassword, contact_no, role, status, subject_specialization, class_assigned, teacher_id, admin_id, joining_date, qualification, enrollment_no, date_of_birth, standard, section, parent_id, admission_date, children_id, occupation, address, nationality, cdate: setUserDate(), ctime: setUserTime() },
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
const updateUserManagementData = async ({ z_id, first_name, middle_name, last_name, gender, email, password, contact_no, role, status, subject_specialization, class_assigned, teacher_id, admin_id, joining_date, qualification, enrollment_no, date_of_birth, standard, section, parent_id, admission_date, children_id, occupation, address, nationality }) => {

  try {

    let updateData = await prisma.user_management.update({
      where: { z_id },
      data: { first_name, middle_name, last_name, gender, email, password, contact_no, role, status, subject_specialization, class_assigned, teacher_id, admin_id, joining_date, qualification, enrollment_no, date_of_birth, standard, section, parent_id, admission_date, children_id, occupation, address, nationality, udate: setUserDate(), utime: setUserTime() },
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

export { getUserManagementData, createUserManagementData, updateUserManagementData, deleteUserManagementData, login };

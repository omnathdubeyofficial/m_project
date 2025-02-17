import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getSecurity = async () => {
  return await prisma.security_form.findMany();
};

// Create a new user
const createSecurity = async ({ security_id, first_name, last_name, address, adhar_num, pan_num, gender, contact_num, email, date_of_birth, age, qualification, profile_img, adhar_img, pan_img }) => {
  try {
    // To generate student_id as first two letters of first_name then date of birth and then last letter of first_name

    const generateSecurityId = `${first_name.toLowerCase().slice(0, 4)}${adhar_num.slice(adhar_num.length - 4, adhar_num.length)}${first_name.toLowerCase().slice(first_name.length - 2, first_name.length)}`

    console.log("The security id is:", generateSecurityId)

    const createdData = await prisma.security_form.create({
      data: { z_id: uuidv4(), security_id: generateSecurityId, first_name, last_name, address, adhar_num, pan_num, gender, contact_num, email, date_of_birth, age, qualification, profile_img, adhar_img, pan_img, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "Security form completed successfully."
    return { ...createdData, success_msg }
  } catch (e) {
    const error_msg = `${e}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }

};

// Update an existing user by ID
const updateSecurity = async ({ z_id, security_id, first_name, last_name, address, adhar_num, pan_num, gender, contact_num, email, date_of_birth, age, qualification, profile_img, adhar_img, pan_img }) => {
  try {

    const updatedData = await prisma.security_form.update({
      where: { z_id },
      data: { security_id, first_name, last_name, address, adhar_num, pan_num, gender, contact_num, email, date_of_birth, age, qualification, profile_img, adhar_img, pan_img, udate: setUserDate(), utime: setUserTime() },
    });
    const success_msg = "Security form updated successfully."
    return { ...updatedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};


// Delete a user by ID
const deleteSecurity = async ({ z_id }) => {
  try {
    console.log("z_id :", z_id)
    const deletedData = await prisma.security_form.delete({
      where: { z_id },
    });
    const success_msg = "security form deleted successfully."
    return { ...deletedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

export { getSecurity, createSecurity, updateSecurity, deleteSecurity };

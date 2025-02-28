import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getPhoneDirectory = async () => {
  return await prisma.phone_directory.findMany();
};

// Create a new user
const createPhoneDirectory = async ({ full_name, contact_no, whatsapp_no, email, profession, status }) => {
  try {
    const createdData = await prisma.phone_directory.create({
      data: { z_id: uuidv4(), full_name, contact_no, whatsapp_no, email, profession, status, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "Phone directory created successfully."
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
const updatePhoneDirectory = async ({ z_id, full_name, contact_no, whatsapp_no, email, profession, status }) => {
  try {

    const updatedData = await prisma.phone_directory.update({
      where: { z_id },
      data: { full_name, contact_no, whatsapp_no, email, profession, status, udate: setUserDate(), utime: setUserTime() },
    });
    const success_msg = "Phone directory updated successfully."
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
const deletePhoneDirectory = async ({ z_id }) => {
  try {
    console.log("z_id :", z_id)
    const deletedData = await prisma.phone_directory.delete({
      where: { z_id },
    });
    const success_msg = "Phone directory deleted successfully."
    return { ...deletedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

export { getPhoneDirectory, createPhoneDirectory, updatePhoneDirectory, deletePhoneDirectory };

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime, setDateFormat } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getNoticeBoardLists = async () => {
  return await prisma.noticeboard.findMany();
};

// Create a new user
const createNoticeBoardLists = async ({ title, description, notice_date, expiry_date, category, issued_by, audience, attachments }) => {
  try {
    const createdData = await prisma.noticeboard.create({
      data: { z_id: uuidv4(), notice_id: (Math.random() * 10).toFixed(3).toString(), title, description, notice_date: setDateFormat(notice_date), expiry_date: setDateFormat(expiry_date), category, issued_by, audience, attachments, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "Noticeboard list created successfully."
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
const updateNoticeBoardLists = async ({ z_id, title, description, notice_date, expiry_date, category, issued_by, audience, attachments }) => {
  try {

    const updatedData = await prisma.noticeboard.update({
      where: { z_id },
      data: { title, description, notice_date: setDateFormat(notice_date), expiry_date: setDateFormat(expiry_date), category, issued_by, audience, attachments, udate: setUserDate(), utime: setUserTime() },
    });
    const success_msg = "Noticeboard list updated successfully."
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
const deleteNoticeBoardLists = async ({ z_id }) => {
  try {
    console.log("z_id :", z_id)
    const deletedData = await prisma.noticeboard.delete({
      where: { z_id },
    });
    const success_msg = "Noticeboard list deleted successfully."
    return { ...deletedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

export { getNoticeBoardLists, createNoticeBoardLists, updateNoticeBoardLists, deleteNoticeBoardLists };

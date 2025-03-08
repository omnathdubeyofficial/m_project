import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime, setDateFormat } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getIssuedBook = async () => {
  return await prisma.issued_books.findMany();
};

// Create a new user
const createIssuedBook = async ({ book_id, student_id, teacher_id,
  guest_id, issued_by, issue_date, issue_time, due_date, return_date, return_time, status, fine_amount, remarks }) => {
  try {
    const createdData = await prisma.issued_books.create({
      data: { z_id: uuidv4(), book_id, student_id, teacher_id, guest_id, issued_by, issue_date: setDateFormat(issue_date), issue_time, due_date: setDateFormat(due_date), return_date: setDateFormat(return_date), return_time, status, fine_amount, remarks, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "Books issued created successfully."
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
const updateIssuedBook = async ({ z_id, book_id, student_id, teacher_id,
  guest_id, issued_by, issue_date, issue_time, due_date, return_date, return_time, status, fine_amount, remarks }) => {
  try {

    const updatedData = await prisma.issued_books.update({
      where: { z_id },
      data: { book_id, student_id, teacher_id, guest_id, issued_by, issue_date: setDateFormat(issue_date), issue_time, due_date: setDateFormat(due_date), return_date: setDateFormat(return_date), return_time, status, fine_amount, remarks, udate: setUserDate(), utime: setUserTime() },
    });
    const success_msg = "Books issued updated successfully."
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
const deleteIssuedBook = async ({ z_id }) => {
  try {
    console.log("z_id :", z_id)
    const deletedData = await prisma.issued_books.delete({
      where: { z_id },
    });
    const success_msg = "Books issued deleted successfully."
    return { ...deletedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

export { getIssuedBook, createIssuedBook, updateIssuedBook, deleteIssuedBook };

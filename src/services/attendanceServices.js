import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getAttendanceData = async () => {
  return await prisma.attendance.findMany();
};

// Create a new user
const createAttendanceData = async ({ student_name, roll_no, date, standard, division, subject, time_in, time_out, attendance_status, attendance_marked_by }) => {
  try {
    const createdData = await prisma.attendance.create({
      data: { z_id: uuidv4(), student_name, roll_no, date, standard, division, subject, time_in, time_out, attendance_status, attendance_marked_by, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "Registration completed successfully."
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
const updateAttendanceData = async ({ z_id, first_name, middle_name, last_name, email, date_of_birth, adhar_no, gender, contact_no, address, previous_school, highest_qualification, percentage, entrance_exam_score, parent_name, parent_contact_no, parent_email, relationship, profile_image }) => {
  try {

    const updatedData = await prisma.attendance.update({
      where: { z_id },
      data: { first_name, middle_name, last_name, email, date_of_birth, adhar_no, gender, contact_no, address, previous_school, highest_qualification, percentage, entrance_exam_score, parent_name, parent_contact_no, parent_email, relationship, profile_image, udate: setUserDate(), utime: setUserTime() },
    });
    const success_msg = "Registration updated successfully."
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
const deleteAttendanceData = async ({ z_id }) => {
  try {
    console.log("z_id :", z_id)
    const deletedData = await prisma.attendance.delete({
      where: { z_id },
    });
    const success_msg = "Registration deleted successfully."
    return { ...deletedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

export { getAttendanceData, createAttendanceData, updateAttendanceData, deleteAttendanceData };

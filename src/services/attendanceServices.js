import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime, setDateFormat } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getAttendanceData = async () => {
  return await prisma.attendance.findMany();
};

// Create a new user
const createAttendanceData = async ({ student_name, roll_no, date, standard, division, subject, time_in, time_out, attendance_status, attendance_marked_by, attendance_marked_by_role }) => {
  try {
    if (attendance_status.toLowerCase() != "absent" && subject.toLowerCase() == "morning_arrival") {
      time_in = setUserTime()
    }
    const createdData = await prisma.attendance.create({
      data: { z_id: uuidv4(), student_name, roll_no, date: setDateFormat(date), standard, division, subject, time_in, time_out, attendance_status, attendance_marked_by, attendance_marked_by_role, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "Attendance created successfully."
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
const updateAttendanceData = async ({ z_id, student_name, roll_no, date, standard, division, subject, time_in, time_out, attendance_status, attendance_marked_by, attendance_marked_by_role }) => {
  try {
    if (attendance_status.toLowerCase() != "absent" && subject.toLowerCase() == "evening_session") {
      time_out = setUserTime()
    }
    const updatedData = await prisma.attendance.update({
      where: { z_id },
      data: { student_name, roll_no, date: setDateFormat(date), standard, division, subject, time_in, time_out, attendance_status, attendance_marked_by, attendance_marked_by_role, udate: setUserDate(), utime: setUserTime() },
    });

    const success_msg = "Attendance updated successfully."
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
    const success_msg = "Attendance deleted successfully."
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

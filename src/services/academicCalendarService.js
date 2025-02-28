import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getAcademicCalendar = async () => {
  return await prisma.academic_calendar.findMany();
};

// Create a new user
const createAcademicCalendar = async ({ program, from_date, to_date, start_time, end_time, program_details, pdf_file, host }) => {
  try {
    const createdData = await prisma.academic_calendar.create({
      data: { z_id: uuidv4(), program, from_date, to_date, start_time, end_time, program_details, pdf_file, host, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "Academic calendar created successfully."
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
const updateAcademicCalendar = async ({ z_id, program, from_date, to_date, start_time, end_time, program_details, pdf_file, host }) => {
  try {

    const updatedData = await prisma.academic_calendar.update({
      where: { z_id },
      data: { program, from_date, to_date, start_time, end_time, program_details, pdf_file, host, udate: setUserDate(), utime: setUserTime() },
    });
    const success_msg = "Academic calendar updated successfully."
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
const deleteAcademicCalendar = async ({ z_id }) => {
  try {
    console.log("z_id :", z_id)
    const deletedData = await prisma.academic_calendar.delete({
      where: { z_id },
    });
    const success_msg = "Academic calendar deleted successfully."
    return { ...deletedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

export { getAcademicCalendar, createAcademicCalendar, updateAcademicCalendar, deleteAcademicCalendar };

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime, unique_id, setDateFormat } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getStudentRegistration = async () => {
  return await prisma.student_registration.findMany();
};

// Create a new user
const createStudentRegistration = async ({ first_name, middle_name, last_name, email, date_of_birth, adhar_no, gender, contact_no, address, previous_school, highest_qualification, percentage, entrance_exam_score, parent_name, parent_contact_no, parent_email, relationship, profile_image }) => {
  try {

    const createdData = await prisma.student_registration.create({
      data: { z_id: uuidv4(), student_id: unique_id(first_name), first_name, middle_name, last_name, email, date_of_birth: setDateFormat(date_of_birth), adhar_no, gender, contact_no, address, previous_school, highest_qualification, percentage, entrance_exam_score, parent_name, parent_contact_no, parent_email, relationship, profile_image, cdate: setUserDate(), ctime: setUserTime() },
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
const updateStudentRegistration = async ({ z_id, first_name, middle_name, last_name, email, date_of_birth, student_id, adhar_no, gender, contact_no, address, previous_school, highest_qualification, percentage, entrance_exam_score, parent_name, parent_contact_no, parent_email, relationship, profile_image }) => {
  try {

    const updatedData = await prisma.student_registration.update({
      where: { z_id },
      data: { first_name, middle_name, last_name, email, date_of_birth: setDateFormat(date_of_birth), adhar_no, gender, student_id, contact_no, address, previous_school, highest_qualification, percentage, entrance_exam_score, parent_name, parent_contact_no, parent_email, relationship, profile_image, udate: setUserDate(), utime: setUserTime() },
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
const deleteStudentRegistration = async ({ z_id }) => {
  try {
    console.log("z_id :", z_id)
    const deletedData = await prisma.student_registration.delete({
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

export { getStudentRegistration, createStudentRegistration, updateStudentRegistration, deleteStudentRegistration };

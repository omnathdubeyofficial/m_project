import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime, setDateFormat } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getAdmissionForm = async () => {
  return await prisma.admission_form.findMany();
};

// Create a new user
const createAdmissionForm = async ({ student_name, adhar_number, pan_number, email, profile_img, contact_number, date_of_birth, gender, address, city, state, pincode, nationality, course_applied, education_qualification, percentage, bank_name, bank_account_holder_name, bank_branch, account_number, ifsc_code, adhar_card_img, pan_card_img, prev_marksheet, passbook, guardian_name, guardian_contact, admission_status, submission_date, admission_fee }) => {
  try {

    const createdData = await prisma.admission_form.create({
      data: { z_id: uuidv4(), student_name, adhar_number, pan_number, email, profile_img, contact_number, date_of_birth: setDateFormat(date_of_birth), gender, address, city, state, pincode, nationality, course_applied, education_qualification, percentage, bank_name, bank_account_holder_name, bank_branch, account_number, ifsc_code, adhar_card_img, pan_card_img, prev_marksheet, passbook, guardian_name, guardian_contact, admission_status, submission_date: setDateFormat(submission_date), admission_fee, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "Admission form completed successfully."
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
const updateAdmissionForm = async ({ z_id, student_name, adhar_number, pan_number, email, profile_img, contact_number, date_of_birth, gender, address, city, state, pincode, nationality, course_applied, education_qualification, percentage, bank_name, bank_account_holder_name, bank_branch, account_number, ifsc_code, adhar_card_img, pan_card_img, prev_marksheet, passbook, guardian_name, guardian_contact, admission_status, submission_date, admission_fee }) => {
  try {

    const updatedData = await prisma.admission_form.update({
      where: { z_id },
      data: { student_name, adhar_number, pan_number, email, profile_img, contact_number, date_of_birth: setDateFormat(date_of_birth), gender, address, city, state, pincode, nationality, course_applied, education_qualification, percentage, bank_name, bank_account_holder_name, bank_branch, account_number, ifsc_code, adhar_card_img, pan_card_img, prev_marksheet, passbook, guardian_name, guardian_contact, admission_status, submission_date: setDateFormat(submission_date), admission_fee, udate: setUserDate(), utime: setUserTime() },
    });
    const success_msg = "Admission form updated successfully."
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
const deleteAdmissionForm = async ({ z_id }) => {
  try {
    console.log("z_id :", z_id)
    const deletedData = await prisma.admission_form.delete({
      where: { z_id },
    });
    const success_msg = "Admission form deleted successfully."
    return { ...deletedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

export { getAdmissionForm, createAdmissionForm, updateAdmissionForm, deleteAdmissionForm };

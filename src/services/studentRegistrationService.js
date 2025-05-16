import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime, unique_id, setDateFormat } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getStudentRegistration = async () => {
  return await prisma.student_registration.findMany();
};

// Create a new user
const createStudentRegistration = async ({ first_name, middle_name, last_name, adhar_no, gender, email, date_of_birth, contact_no, permanent_address, previous_school, highest_qualification, percentage, entrance_exam_score, father_name, father_contact_no, father_email, relationship, profile_image, desired_class, previous_year_of_passing, board, father_whatsapp_no, father_occupation, mother_name, mother_occupation, guardian_name, guardian_contact_no, guardian_email, guardian_occupation, number_of_brothers, brother_occupation, blood_group, religion, annual_income, category, mother_tongue, current_address, permanent_address_nearest_police_station, current_address_nearest_police_station, permanent_address_nearest_landmark, current_address_nearest_landmark, permanent_address_state, current_address_state, permanent_address_district, current_address_district, permanent_address_tehsil, current_address_tehsil, permanent_address_post_office, current_address_post_office, permanent_address_pincode, permanent_address_type, current_address_type, nationality, country, adhar_front_img, adhar_back_img, previous_year_marksheet, income_certificate }) => {
  try {

    const createdData = await prisma.student_registration.create({
      data: { z_id: uuidv4(), first_name, middle_name, last_name, student_id: unique_id(first_name), adhar_no, gender, email, date_of_birth: setDateFormat(date_of_birth), contact_no, permanent_address, previous_school, highest_qualification, percentage, entrance_exam_score, father_name, father_contact_no, father_email, relationship, profile_image, desired_class, previous_year_of_passing, board, father_whatsapp_no, father_occupation, mother_name, mother_occupation, guardian_name, guardian_contact_no, guardian_email, guardian_occupation, number_of_brothers, brother_occupation, blood_group, religion, annual_income, category, admission_status: "Pending", mother_tongue, current_address, permanent_address_nearest_police_station, current_address_nearest_police_station, permanent_address_nearest_landmark, current_address_nearest_landmark, permanent_address_state, current_address_state, permanent_address_district, current_address_district, permanent_address_tehsil, current_address_tehsil, permanent_address_post_office, current_address_post_office, permanent_address_pincode, permanent_address_type, current_address_type, nationality, country, adhar_front_img, adhar_back_img, previous_year_marksheet, income_certificate, cdate: setUserDate(), ctime: setUserTime() },
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
const updateStudentRegistration = async ({ z_id, first_name, middle_name, last_name, adhar_no, gender, email, date_of_birth, contact_no, permanent_address, previous_school, highest_qualification, percentage, entrance_exam_score, father_name, father_contact_no, father_email, relationship, profile_image, desired_class, previous_year_of_passing, board, father_whatsapp_no, father_occupation, mother_name, mother_occupation, guardian_name, guardian_contact_no, guardian_email, guardian_occupation, number_of_brothers, brother_occupation, blood_group, religion, annual_income, category, admission_status, mother_tongue, current_address, permanent_address_nearest_police_station, current_address_nearest_police_station, permanent_address_nearest_landmark, current_address_nearest_landmark, permanent_address_state, current_address_state, permanent_address_district, current_address_district, permanent_address_tehsil, current_address_tehsil, permanent_address_post_office, current_address_post_office, permanent_address_pincode, permanent_address_type, current_address_type, nationality, country, adhar_front_img, adhar_back_img, previous_year_marksheet, income_certificate }) => {
  try {

    const updatedData = await prisma.student_registration.update({
      where: { z_id },
      data: { first_name, middle_name, last_name, adhar_no, gender, email, date_of_birth: setDateFormat(date_of_birth), contact_no, permanent_address, previous_school, highest_qualification, percentage, entrance_exam_score, father_name, father_contact_no, father_email, relationship, profile_image, desired_class, previous_year_of_passing, board, father_whatsapp_no, father_occupation, mother_name, mother_occupation, guardian_name, guardian_contact_no, guardian_email, guardian_occupation, number_of_brothers, brother_occupation, blood_group, religion, annual_income, category, admission_status, mother_tongue, current_address, permanent_address_nearest_police_station, current_address_nearest_police_station, permanent_address_nearest_landmark, current_address_nearest_landmark, permanent_address_state, current_address_state, permanent_address_district, current_address_district, permanent_address_tehsil, current_address_tehsil, permanent_address_post_office, current_address_post_office, permanent_address_pincode, permanent_address_type, current_address_type, nationality, country, adhar_front_img, adhar_back_img, previous_year_marksheet, income_certificate, udate: setUserDate(), utime: setUserTime() },
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

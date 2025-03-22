import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime, setDateFormat, unique_id } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getNurseryAdmissionList = async () => {
  return await prisma.nursery_admission_lists.findMany();
};

// Create a new user
const createNurseryAdmissionList = async ({ first_name, middle_name, last_name, adhar_num, father_name, mother_name, father_contact_num, father_email, father_occupation, dob, gender, permanent_address, current_address, city, state, pincode, nationality, religion, caste, admission_status, admission_fee, student_adhar_front_img, student_adhar_back_img, father_adhar_front_img, father_adhar_back_img, mother_adhar_front_img, mother_adhar_back_img, father_pancard_img, student_profile_img, student_birth_certificate_img: String, payment_id, admission_fees, payment_method, payment_status, payment_transaction_id, payment_date, total_fees, paid_amount, due_amount }) => {
  try {
    const createdData = await prisma.nursery_admission_lists.create({
      data: { z_id: uuidv4(), student_id: unique_id(first_name), first_name, middle_name, last_name, adhar_num, father_name, mother_name, father_contact_num, father_email, father_occupation, dob: setDateFormat(dob), gender, permanent_address, current_address, city, state, pincode, nationality, religion, caste, admission_status, admission_fee, student_adhar_front_img, student_adhar_back_img, father_adhar_front_img, father_adhar_back_img, mother_adhar_front_img, mother_adhar_back_img, father_pancard_img, student_profile_img, student_birth_certificate_img: String, payment_id, admission_fees, payment_method, payment_status, payment_transaction_id, payment_date, total_fees, paid_amount, due_amount, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "Nursery admission list created successfully."
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
const updateNurseryAdmissionList = async ({ z_id, first_name, middle_name, last_name, adhar_num, father_name, mother_name, father_contact_num, father_email, father_occupation, dob, gender, permanent_address, current_address, city, state, pincode, nationality, religion, caste, admission_status, admission_fee, student_adhar_front_img, student_adhar_back_img, father_adhar_front_img, father_adhar_back_img, mother_adhar_front_img, mother_adhar_back_img, father_pancard_img, student_profile_img, student_birth_certificate_img: String, payment_id, admission_fees, payment_method, payment_status, payment_transaction_id, payment_date, total_fees, paid_amount, due_amount }) => {
  try {

    const updatedData = await prisma.nursery_admission_lists.update({
      where: { z_id },
      data: { first_name, middle_name, last_name, adhar_num, father_name, mother_name, father_contact_num, father_email, father_occupation, dob: setDateFormat(dob), gender, permanent_address, current_address, city, state, pincode, nationality, religion, caste, admission_status, admission_fee, student_adhar_front_img, student_adhar_back_img, father_adhar_front_img, father_adhar_back_img, mother_adhar_front_img, mother_adhar_back_img, father_pancard_img, student_profile_img, student_birth_certificate_img: String, payment_id, admission_fees, payment_method, payment_status, payment_transaction_id, payment_date, total_fees, paid_amount, due_amount, udate: setUserDate(), utime: setUserTime() },
    });
    const success_msg = "Nursery admission list updated successfully."
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
const deleteNurseryAdmissionList = async ({ z_id }) => {
  try {
    console.log("z_id :", z_id)
    const deletedData = await prisma.nursery_admission_lists.delete({
      where: { z_id },
    });
    const success_msg = "Nursery admission list deleted successfully."
    return { ...deletedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

export { getNurseryAdmissionList, createNurseryAdmissionList, updateNurseryAdmissionList, deleteNurseryAdmissionList };

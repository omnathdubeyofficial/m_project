import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime, unique_id, setDateFormat } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getDriverList = async () => {
  return await prisma.drivers_list.findMany();
};

// Create a new user
const createDriverForm = async ({ first_name, email, phone_no, whatsapp_no, alternate_no, blood_group, permanent_address, gender, dob, status, shift, registration_date, joining_date, adhar_card_num, pan_num, license_number, license_expiry, license_img, adhar_card_front_img, adhar_card_back_img, pan_card_img, last_eye_checkup_date, eye_test_result, visually_impared, eye_disorder, bank_name, bank_account_num, account_holder_name, ifsc_code, bank_branch_name, bank_passbook_img, middle_name, last_name, current_address, joining_salary, current_salary, state, pincode, country, city, previous_work_description }) => {
  try {

    const createdData = await prisma.drivers_list.create({
      data: { z_id: uuidv4(), driver_id: unique_id(first_name), first_name, email, phone_no, whatsapp_no, alternate_no, blood_group, permanent_address, gender, dob: setDateFormat(dob), status, shift, registration_date: setDateFormat(registration_date), joining_date: setDateFormat(joining_date), adhar_card_num, pan_num, license_number, license_expiry, license_img, adhar_card_front_img, adhar_card_back_img, pan_card_img, last_eye_checkup_date: setDateFormat(last_eye_checkup_date), eye_test_result, visually_impared, eye_disorder, bank_name, bank_account_num, account_holder_name, ifsc_code, bank_branch_name, bank_passbook_img, middle_name, last_name, current_address, joining_salary, current_salary, state, pincode, country, city, previous_work_description, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "Driver form created successfully."
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
const updateDriverList = async ({ z_id, first_name, email, phone_no, whatsapp_no, alternate_no, blood_group, permanent_address, gender, dob, status, shift, registration_date, joining_date, adhar_card_num, pan_num, license_number, license_expiry, license_img, adhar_card_front_img, adhar_card_back_img, pan_card_img, last_eye_checkup_date, eye_test_result, visually_impared, eye_disorder, bank_name, bank_account_num, account_holder_name, ifsc_code, bank_branch_name, bank_passbook_img, middle_name, last_name, current_address, joining_salary, current_salary, state, pincode, country, city, previous_work_description }) => {
  try {

    const updatedData = await prisma.drivers_list.update({
      where: { z_id },
      data: { first_name, email, phone_no, whatsapp_no, alternate_no, blood_group, permanent_address, gender, dob: setDateFormat(dob), status, shift, registration_date: setDateFormat(registration_date), joining_date: setDateFormat(joining_date), adhar_card_num, pan_num, license_number, license_expiry, license_img, adhar_card_front_img, adhar_card_back_img, pan_card_img, last_eye_checkup_date: setDateFormat(last_eye_checkup_date), eye_test_result, visually_impared, eye_disorder, bank_name, bank_account_num, account_holder_name, ifsc_code, bank_branch_name, bank_passbook_img, middle_name, last_name, current_address, joining_salary, current_salary, state, pincode, country, city, previous_work_description, udate: setUserDate(), utime: setUserTime() },
    });
    const success_msg = "Driver list updated successfully."
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
const deleteDriverList = async ({ z_id }) => {
  try {
    console.log("z_id :", z_id)
    const deletedData = await prisma.drivers_list.delete({
      where: { z_id },
    });
    const success_msg = "Driver list deleted successfully."
    return { ...deletedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

export { getDriverList, createDriverForm, updateDriverList, deleteDriverList };

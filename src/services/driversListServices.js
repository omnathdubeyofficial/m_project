import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getDriverLists = async () => {
  return await prisma.drivers_list.findMany();
};

// Create a new user
const createDriverLists = async ({ driver_id, first_name, email, phone_no, whatsapp_no, alternate_no, blood_group, permanent_address, gender, dob, status, shift, registration_date, joining_date, adhar_card_num, pan_num, license_number, license_expiry, license_img, adhar_card_front_img, adhar_card_back_img, pan_card_img, last_eye_checkup_date, eye_test_result, visually_impared, eye_disorder, bank_name, bank_account_num, account_holder_name, ifsc_code, bank_branch_name, bank_passbook_img, middle_name, last_name, current_address, joining_salary, current_salary }) => {
  try {
    const unique_driver_id = `${first_name.toUpperCase().slice(0, 3)}${Math.floor(Math.random() * 100000)}${first_name.toUpperCase().slice(first_name.length - 1, first_name.length)}`
    const createdData = await prisma.drivers_list.create({
      data: { z_id: uuidv4(), driver_id: unique_driver_id, first_name, email, phone_no, whatsapp_no, alternate_no, blood_group, permanent_address, gender, dob, status, shift, registration_date, joining_date, adhar_card_num, pan_num, license_number, license_expiry, license_img, adhar_card_front_img, adhar_card_back_img, pan_card_img, last_eye_checkup_date, eye_test_result, visually_impared, eye_disorder, bank_name, bank_account_num, account_holder_name, ifsc_code, bank_branch_name, bank_passbook_img, middle_name, last_name, current_address, joining_salary, current_salary, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "Driver list created successfully."
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
const updateDriverLists = async ({ z_id, first_name, email, phone_no, whatsapp_no, alternate_no, blood_group, permanent_address, gender, dob, status, shift, registration_date, joining_date, adhar_card_num, pan_num, license_number, license_expiry, license_img, adhar_card_front_img, adhar_card_back_img, pan_card_img, last_eye_checkup_date, eye_test_result, visually_impared, eye_disorder, bank_name, bank_account_num, account_holder_name, ifsc_code, bank_branch_name, bank_passbook_img, middle_name, last_name, current_address, joining_salary, current_salary }) => {
  try {

    const updatedData = await prisma.drivers_list.update({
      where: { z_id },
      data: { first_name, email, phone_no, whatsapp_no, alternate_no, blood_group, permanent_address, gender, dob, status, shift, registration_date, joining_date, adhar_card_num, pan_num, license_number, license_expiry, license_img, adhar_card_front_img, adhar_card_back_img, pan_card_img, last_eye_checkup_date, eye_test_result, visually_impared, eye_disorder, bank_name, bank_account_num, account_holder_name, ifsc_code, bank_branch_name, bank_passbook_img, middle_name, last_name, current_address, joining_salary, current_salary, udate: setUserDate(), utime: setUserTime() },
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
const deleteDriverLists = async ({ z_id }) => {
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

export { getDriverLists, createDriverLists, updateDriverLists, deleteDriverLists };

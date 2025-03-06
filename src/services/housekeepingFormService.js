import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime, unique_id } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getHouseKeepingList = async () => {
  return await prisma.housekeeping_list.findMany();
};

// Create a new user
const createHouseKeepingForm = async ({ first_name, middle_name, last_name, gender, contact_no, whatsapp_no, email, adhar_no, pan_no, joining_date, work_description, start_time, end_time, assigned_by, supervisor_comments, feedback, permanent_address, current_address, state, pincode, country, city, previous_work_description, joining_salary, current_salary, bank_account_num, bank_name, account_holder_name, bank_branch_name, ifsc_code, bank_passbook_img, adhar_front_img, adhar_back_img, pan_img }) => {
  try {
    const unique_staff_id = `${first_name.toUpperCase().slice(0, 3)}${Math.floor(Math.random() * 100000)}${first_name.toUpperCase().slice(first_name.length - 1, first_name.length)}`
    const createdData = await prisma.housekeeping_list.create({
      data: { z_id: uuidv4(), staff_id: unique_id(first_name), first_name, middle_name, last_name, gender, contact_no, whatsapp_no, email, adhar_no, pan_no, joining_date, work_description, start_time, end_time, assigned_by, supervisor_comments, feedback, permanent_address, current_address, state, pincode, country, city, previous_work_description, joining_salary, current_salary, bank_account_num, bank_name, account_holder_name, bank_branch_name, ifsc_code, bank_passbook_img, adhar_front_img, adhar_back_img, pan_img, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "Housekeeping form created successfully."
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
const updateHouseKeepingList = async ({ z_id, first_name, middle_name, last_name, gender, contact_no, whatsapp_no, email, adhar_no, pan_no, joining_date, work_description, start_time, end_time, assigned_by, supervisor_comments, feedback, permanent_address, current_address, state, pincode, country, city, previous_work_description, joining_salary, current_salary, bank_account_num, bank_name, account_holder_name, bank_branch_name, ifsc_code, bank_passbook_img, adhar_front_img, adhar_back_img, pan_img }) => {
  try {

    const updatedData = await prisma.housekeeping_list.update({
      where: { z_id },
      data: { first_name, middle_name, last_name, gender, contact_no, whatsapp_no, email, adhar_no, pan_no, joining_date, work_description, start_time, end_time, assigned_by, supervisor_comments, feedback, permanent_address, current_address, state, pincode, country, city, previous_work_description, joining_salary, current_salary, bank_account_num, bank_name, account_holder_name, bank_branch_name, ifsc_code, bank_passbook_img, adhar_front_img, adhar_back_img, pan_img, udate: setUserDate(), utime: setUserTime() },
    });
    const success_msg = "Housekeeping list updated successfully."
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
const deleteHouseKeepingList = async ({ z_id }) => {
  try {
    console.log("z_id :", z_id)
    const deletedData = await prisma.housekeeping_list.delete({
      where: { z_id },
    });
    const success_msg = "Housekeeping list deleted successfully."
    return { ...deletedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

export { getHouseKeepingList, createHouseKeepingForm, updateHouseKeepingList, deleteHouseKeepingList };

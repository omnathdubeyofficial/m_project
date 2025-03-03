import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getSecurityList = async () => {
  return await prisma.security_form.findMany();
};

// Create a new user
const createSecurityForm = async ({ first_name, last_name, permanent_address, current_address, state, pincode, country, city, whatsapp_num, bank_account_num, bank_name, account_holder_name, bank_branch_name, ifsc_code, bank_passbook_img, joining_date, joining_salary, current_salary, previous_work_description, adhar_num, pan_num, gender, contact_num, email, date_of_birth, age, qualification, profile_img, adhar_img, pan_img }) => {
  try {
    const generateSecurityId = `${first_name.toUpperCase().slice(0, 3)}${Math.floor(Math.random() * 10000)}${first_name.toUpperCase().slice(first_name.length - 2, first_name.length)}`

    console.log("The security id is:", generateSecurityId)

    const createdData = await prisma.security_form.create({
      data: { z_id: uuidv4(), security_id: generateSecurityId, first_name, last_name, permanent_address, current_address, state, pincode, country, city, whatsapp_num, bank_account_num, bank_name, account_holder_name, bank_branch_name, ifsc_code, bank_passbook_img, joining_date, joining_salary, current_salary, previous_work_description, adhar_num, pan_num, gender, contact_num, email, date_of_birth, age, qualification, profile_img, adhar_img, pan_img, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "Security form completed successfully."
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
const updateSecurityList = async ({ z_id, security_id, first_name, last_name, permanent_address, current_address, state, pincode, country, city, whatsapp_num, bank_account_num, bank_name, account_holder_name, bank_branch_name, ifsc_code, bank_passbook_img, joining_date, joining_salary, current_salary, previous_work_description, adhar_num, pan_num, gender, contact_num, email, date_of_birth, age, qualification, profile_img, adhar_img, pan_img }) => {
  try {

    const updatedData = await prisma.security_form.update({
      where: { z_id },
      data: { security_id, first_name, last_name, permanent_address, current_address, state, pincode, country, city, whatsapp_num, bank_account_num, bank_name, account_holder_name, bank_branch_name, ifsc_code, bank_passbook_img, joining_date, joining_salary, current_salary, previous_work_description, adhar_num, pan_num, gender, contact_num, email, date_of_birth, age, qualification, profile_img, adhar_img, pan_img, udate: setUserDate(), utime: setUserTime() },
    });
    const success_msg = "Security form updated successfully."
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
const deleteSecurityList = async ({ z_id }) => {
  try {
    console.log("z_id :", z_id)
    const deletedData = await prisma.security_form.delete({
      where: { z_id },
    });
    const success_msg = "security form deleted successfully."
    return { ...deletedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

export { getSecurityList, createSecurityForm, updateSecurityList, deleteSecurityList };

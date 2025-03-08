import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime, unique_id, setDateFormat } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getEventRegistrationList = async () => {
  return await prisma.event_registration_form.findMany();
};

// Create a new user
const createEventRegistrationForm = async ({ event_id, participant_name, sptetc_id, participant_type, email, whatsapp_number, contact_number, address, age, gender, institution_name, class_or_grade, registration_date, payment_id, payment_status, payment_method, registration_status }) => {
  try {

    const createdData = await prisma.event_registration_form.create({
      data: { z_id: uuidv4(), registration_id: unique_id(participant_name), event_id, participant_name, sptetc_id, participant_type, email, whatsapp_number, contact_number, address, age, gender, institution_name, class_or_grade, registration_date: setDateFormat(registration_date), payment_id, payment_status, payment_method, registration_status, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "Event registration form created successfully."
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
const updateEventRegistrationList = async ({ z_id, event_id, participant_name, sptetc_id, participant_type, email, whatsapp_number, contact_number, address, age, gender, institution_name, class_or_grade, registration_date, payment_id, payment_status, payment_method, registration_status }) => {
  try {

    const updatedData = await prisma.event_registration_form.update({
      where: { z_id },
      data: { event_id, participant_name, sptetc_id, participant_type, email, whatsapp_number, contact_number, address, age, gender, institution_name, class_or_grade, registration_date: setDateFormat(registration_date), payment_id, payment_status, payment_method, registration_status, udate: setUserDate(), utime: setUserTime() },
    });
    const success_msg = "Event registration list updated successfully."
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
const deleteEventRegistrationList = async ({ z_id }) => {
  try {
    console.log("z_id :", z_id)
    const deletedData = await prisma.event_registration_form.delete({
      where: { z_id },
    });
    const success_msg = "Event registration list deleted successfully."
    return { ...deletedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

export { getEventRegistrationList, createEventRegistrationForm, updateEventRegistrationList, deleteEventRegistrationList };

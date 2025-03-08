import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime, unique_id, setDateFormat } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getEventCreationList = async () => {
  return await prisma.event_creation_form.findMany();
};

// Create a new user
const createEventForm = async ({ event_name, event_type, event_date, start_time, end_time, venue, organizer_name, organizer_contact_no, organizer_whatsapp_no, organizer_email_id, description, target_audience, max_participants, registration_deadline, event_status, resources_required }) => {
  try {
    const createdData = await prisma.event_creation_form.create({
      data: { z_id: uuidv4(), event_id: unique_id(event_name), event_name, event_type, event_date: setDateFormat(event_date), start_time, end_time, venue, organizer_name, organizer_contact_no, organizer_whatsapp_no, organizer_email_id, description, target_audience, max_participants, registration_deadline, event_status, resources_required, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "Event form created successfully."
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
const updateEventList = async ({ z_id, event_name, event_type, event_date, start_time, end_time, venue, organizer_name, organizer_contact_no, organizer_whatsapp_no, organizer_email_id, description, target_audience, max_participants, registration_deadline, event_status, resources_required }) => {
  try {

    const updatedData = await prisma.event_creation_form.update({
      where: { z_id },
      data: { event_name, event_type, event_date: setDateFormat(event_date), start_time, end_time, venue, organizer_name, organizer_contact_no, organizer_whatsapp_no, organizer_email_id, description, target_audience, max_participants, registration_deadline, event_status, resources_required, udate: setUserDate(), utime: setUserTime() },
    });
    const success_msg = "Event list updated successfully."
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
const deleteEventList = async ({ z_id }) => {
  try {
    console.log("z_id :", z_id)
    const deletedData = await prisma.event_creation_form.delete({
      where: { z_id },
    });
    const success_msg = "Event list deleted successfully."
    return { ...deletedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

export { getEventCreationList, createEventForm, updateEventList, deleteEventList };

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime, setDateFormat } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getHolidayLists = async () => {
  return await prisma.holiday_lists.findMany();
};

// Create a new user
const createHolidayLists = async ({ from_date, to_date, day, holiday_name, details }) => {
  try {
    const createdData = await prisma.holiday_lists.create({
      data: { z_id: uuidv4(), from_date: setDateFormat(from_date), to_date: setDateFormat(to_date), day, holiday_name, details, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "Holiday list created successfully."
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
const updateHolidayLists = async ({ z_id, from_date, to_date, day, holiday_name, details }) => {
  try {

    const updatedData = await prisma.holiday_lists.update({
      where: { z_id },
      data: { from_date: setDateFormat(from_date), to_date: setDateFormat(to_date), day, holiday_name, details, udate: setUserDate(), utime: setUserTime() },
    });
    const success_msg = "Holiday list updated successfully."
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
const deleteHolidayLists = async ({ z_id }) => {
  try {
    console.log("z_id :", z_id)
    const deletedData = await prisma.holiday_lists.delete({
      where: { z_id },
    });
    const success_msg = "Holiday list deleted successfully."
    return { ...deletedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

export { getHolidayLists, createHolidayLists, updateHolidayLists, deleteHolidayLists };

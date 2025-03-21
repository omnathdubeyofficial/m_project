import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime, unique_id } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getClassesDataList = async () => {
  return await prisma.classes_data.findMany();
};

// Create a new user
const createClassesData = async ({ class_title, description, tags, image, student_rating, student_reviews, parents_rating, parents_reviews, discount, is_admission, total_seats, filled_seats }) => {
  try {
    const createdData = await prisma.classes_data.create({
      data: { z_id: uuidv4(), classes_id: unique_id("class"), class_title, description, tags, image, student_rating, student_reviews, parents_rating, parents_reviews, discount, is_admission, total_seats, filled_seats, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "Class data created successfully."
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
const updateClassesData = async ({ z_id, class_title, description, tags, image, student_rating, student_reviews, parents_rating, parents_reviews, discount, is_admission, total_seats, filled_seats }) => {
  try {

    const updatedData = await prisma.classes_data.update({
      where: { z_id },
      data: { class_title, description, tags, image, student_rating, student_reviews, parents_rating, parents_reviews, discount, is_admission, total_seats, filled_seats, udate: setUserDate(), utime: setUserTime() },
    });
    const success_msg = "Class data updated successfully."
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
const deleteClassesData = async ({ z_id }) => {
  try {
    console.log("z_id :", z_id)
    const deletedData = await prisma.classes_data.delete({
      where: { z_id },
    });
    const success_msg = "Class data deleted successfully."
    return { ...deletedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

export { getClassesDataList, createClassesData, updateClassesData, deleteClassesData };

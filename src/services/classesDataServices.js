import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime, unique_id } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getClassesDataList = async () => {
  const orderedTitles = [
   "Nursery", "LKG", "UKG","1st", "2nd", "3rd", "4th", "5th", "6th",
    "7th", "8th", "9th", "10th", "11th", "12th"
  ];

  const classes = await prisma.classes_data.findMany();

  // Custom sorting using the orderedTitles index
  const sortedClasses = classes.sort((a, b) => {
    return orderedTitles.indexOf(a.class_title) - orderedTitles.indexOf(b.class_title);
  });

  return sortedClasses;
};

const createClassesData = async ({ class_title, description, tags, image, student_rating, student_reviews, parents_rating, parents_reviews, discount, is_admission, total_seats, filled_seats }) => {
  try {
    const existingClass = await prisma.classes_data.findFirst({
      where: { class_title }
    });

    if (existingClass) {
      return { error_msg: "This class already exists in the database." };
    }

    const createdData = await prisma.classes_data.create({
      data: { 
        z_id: uuidv4(),
        classes_id: unique_id("class"),
        class_title, 
        description, 
        tags, 
        image, 
        student_rating, 
        student_reviews, 
        parents_rating, 
        parents_reviews, 
        discount, 
        is_admission, 
        total_seats, 
        filled_seats, 
        cdate: setUserDate(), 
        ctime: setUserTime() 
      },
    });

    return { ...createdData, success_msg: "New class data created successfully." };
  } catch (e) {
    const error_msg = `${e}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
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

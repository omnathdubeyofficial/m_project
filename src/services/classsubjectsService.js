import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { setUserDate, setUserTime } from './dateTimeService.js';

const prisma = new PrismaClient();

// 🔹 Get all class subjects
const getClassSubjects = async () => {
  const orderedTitles = [
    "Nursery", "LKG", "UKG", "1st", "2nd", "3rd", "4th", "5th",
    "6th", "7th", "8th", "9th", "10th", "11th", "12th"
  ];

  try {
    const data = await prisma.class_subjects.findMany();

    // class_name ke order ke according sort karna
    const sortedData = data.sort((a, b) => {
      return orderedTitles.indexOf(a.class_name) - orderedTitles.indexOf(b.class_name);
    });

    return sortedData;
  } catch (error) {
    console.error("Error fetching class subjects:", error);
    return { error_msg: error.toString() };
  } finally {
    await prisma.$disconnect();
  }
};


// 🔹 Create new class subject record
const createClassSubject = async ({ class_name, subject_name }) => {
  try {
    // Check if the class name already exists
    const existing = await prisma.class_subjects.findFirst({
      where: {
        class_name,
      },
    });

    if (existing) {
      return {
        error_msg:
          "This class name already exists. If you want to make changes, please edit the existing entry or delete it and create a new one. Thank you.",
      };
    }

    // If not existing, create new entry
    const created = await prisma.class_subjects.create({
      data: {
        z_id: uuidv4(),
        class_name,
        subject_name,
        cdate: setUserDate(),
        ctime: setUserTime(),
      },
    });

    return { ...created, success_msg: "Class subject created successfully." };
  } catch (error) {
    console.error("Error creating class subject:", error);
    return { error_msg: error.toString() };
  } finally {
    await prisma.$disconnect();
  }
};


// 🔹 Update existing class subject
const updateClassSubject = async ({ z_id, class_name, subject_name }) => {
  try {
    const updated = await prisma.class_subjects.update({
      where: { z_id },
      data: {
        class_name,
        subject_name,
        udate: setUserDate(),
        utime: setUserTime(),
      },
    });
    return { ...updated, success_msg: "Class subject updated successfully." };
  } catch (error) {
    console.error("Error updating class subject:", error);
    return { error_msg: error.toString() };
  } finally {
    await prisma.$disconnect();
  }
};

// 🔹 Delete class subject
const deleteClassSubject = async ({ z_id }) => {
  try {
    const deleted = await prisma.class_subjects.delete({
      where: { z_id },
    });
    return { ...deleted, success_msg: "Class subject deleted successfully." };
  } catch (error) {
    console.error("Error deleting class subject:", error);
    return { error_msg: error.toString() };
  } finally {
    await prisma.$disconnect();
  }
};

export {
  getClassSubjects,
  createClassSubject,
  updateClassSubject,
  deleteClassSubject
};

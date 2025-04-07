import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { setUserDate, setUserTime } from './dateTimeService.js';

const prisma = new PrismaClient();

// 🔹 Get all class subjects
const getClassSubjects = async () => {
  try {
    const data = await prisma.class_subjects.findMany();
    return data;
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

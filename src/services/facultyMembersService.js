// facultyService.js
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { setUserDate, setUserTime } from './dateTimeService.js';

const prisma = new PrismaClient();

// ✅ Create Faculty Member
const createFaculty = async ({
  full_name,
  profession,
  qualification,
  experience,
  department,
  facebook_link,
  instagram_link,
  youtube_link,
  linkedin_link,
  x_link,
  profile_image,
}) => {
  try {
    const newFaculty = await prisma.faculty_members.create({
      data: {
        z_id: uuidv4(),
        full_name,
        profession,
        qualification,
        experience,
        department,
        facebook_link,
        instagram_link,
        youtube_link,
        linkedin_link,
        x_link,
        profile_image,
        cdate: setUserDate(),
        ctime: setUserTime(),
      },
    });
    const success_msg = 'Faculty member added successfully.';
    return { ...newFaculty, success_msg };
  } catch (error) {
    const error_msg = `Error while adding faculty: ${error}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
};

// 📥 Get All Faculty Members
const getAllFaculty = async () => {
  try {
    const allFaculty = await prisma.faculty_members.findMany({
      orderBy: { cdate: 'desc' },
    });
    return allFaculty;
  } catch (error) {
    const error_msg = `Error fetching faculty members: ${error}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
};

// ✏️ Update Faculty Member
const updateFaculty = async ({
  z_id,
  full_name,
  profession,
  qualification,
  experience,
  department,
  facebook_link,
  instagram_link,
  youtube_link,
  linkedin_link,
  x_link,
  profile_image,
}) => {
  try {
    const updated = await prisma.faculty_members.update({
      where: { z_id },
      data: {
        full_name,
        profession,
        qualification,
        experience,
        department,
        facebook_link,
        instagram_link,
        youtube_link,
        linkedin_link,
        x_link,
        profile_image,
        udate: setUserDate(),
        utime: setUserTime(),
      },
    });
    const success_msg = 'Faculty member updated successfully.';
    return { ...updated, success_msg };
  } catch (error) {
    const error_msg = `Error while updating faculty member: ${error}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
};

// ❌ Delete Faculty Member
const deleteFaculty = async ({ z_id }) => {
  try {
    const deleted = await prisma.faculty_members.delete({
      where: { z_id },
    });
    const success_msg = 'Faculty member deleted successfully.';
    return { ...deleted, success_msg };
  } catch (error) {
    const error_msg = `Error while deleting faculty member: ${error}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
};

export {
  createFaculty,
  getAllFaculty,
  updateFaculty,
  deleteFaculty,
};

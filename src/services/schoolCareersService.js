import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { setUserDate, setUserTime } from './dateTimeService.js';

const prisma = new PrismaClient();

// Get all careers
const getSchoolCareers = async () => {
  return await prisma.school_careers.findMany();
};

// Create a new career entry
const createSchoolCareer = async ({
  position_title, av_salary, department, required_qualification, required_language,
  required_experience, employment_type, number_of_vacancies, required_work_time,
  location, job_description, application_start, application_deadline,
  is_active
}) => {
  try {
    const createdData = await prisma.school_careers.create({
      data: {
        z_id: uuidv4(),
        job_id: uuidv4(), // Auto-generated unique job ID
        position_title,
        av_salary,
        department,
        required_qualification,
        required_language,
        required_experience,
        employment_type,
        number_of_vacancies,
        required_work_time,
        location,
        job_description,
        application_start,
        application_deadline,
        cdate: setUserDate(),
        ctime: setUserTime(),
        is_active
      },
    });
    const success_msg = "School career created successfully.";
    return { ...createdData, success_msg };
  } catch (e) {
    const error_msg = `${e}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
};

// Update an existing career
const updateSchoolCareer = async ({
  z_id, position_title, av_salary, department, required_qualification, required_language,
  required_experience, employment_type, number_of_vacancies, required_work_time,
  location, job_description, application_start, application_deadline,
  is_active
}) => {
  try {
    const updatedData = await prisma.school_careers.update({
      where: { z_id },
      data: {
        position_title,
        av_salary,
        department,
        required_qualification,
        required_language,
        required_experience,
        employment_type,
        number_of_vacancies,
        required_work_time,
        location,
        job_description,
        application_start,
        application_deadline,
        udate: setUserDate(),
        utime: setUserTime(),
        is_active
      },
    });
    const success_msg = "School career updated successfully.";
    return { ...updatedData, success_msg };
  } catch (err) {
    const error_msg = `${err}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
};

// Delete career
const deleteSchoolCareer = async ({ z_id }) => {
  try {
    const deletedData = await prisma.school_careers.delete({
      where: { z_id },
    });
    const success_msg = "School career deleted successfully.";
    return { ...deletedData, success_msg };
  } catch (err) {
    const error_msg = `${err}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
};

export {
  getSchoolCareers,
  createSchoolCareer,
  updateSchoolCareer,
  deleteSchoolCareer
};

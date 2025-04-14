import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { setUserDate, setUserTime } from './dateTimeService.js';

const prisma = new PrismaClient();

// ✅ Apply for a job (Create)
const applyForJob = async ({
  full_name,
  email,
  phone_number,
  whatsapp_number,
  position_applied_for,
  cover_letter,
  resume_pdf,
}) => {
  try {
    const newApplication = await prisma.job_applications.create({
      data: {
        z_id: uuidv4(),
        full_name,
        email,
        phone_number,
        whatsapp_number,
        position_applied_for,
        cover_letter,
        resume_pdf,
        cdate: setUserDate(),
        ctime: setUserTime(),
      },
    });
    const success_msg = 'Application submitted successfully.';
    return { ...newApplication, success_msg };
  } catch (error) {
    const error_msg = `Error while applying: ${error}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
};

// 📥 Get all job applications
const getAllApplications = async () => {
  try {
    const applications = await prisma.job_applications.findMany({
      orderBy: { cdate: 'desc' },
    });
    return applications;
  } catch (error) {
    const error_msg = `Error fetching applications: ${error}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
};

// ✏️ Update a job application
const updateApplication = async ({
  z_id,
  full_name,
  email,
  phone_number,
  whatsapp_number,
  position_applied_for,
  cover_letter,
  resume_pdf,
}) => {
  try {
    const updatedApp = await prisma.job_applications.update({
      where: { z_id },
      data: {
        full_name,
        email,
        phone_number,
        whatsapp_number,
        position_applied_for,
        cover_letter,
        resume_pdf,
        udate: setUserDate(),
        utime: setUserTime(),
      },
    });
    const success_msg = 'Application updated successfully.';
    return { ...updatedApp, success_msg };
  } catch (error) {
    const error_msg = `Error while updating application: ${error}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
};

// ❌ Delete a job application
const deleteApplication = async ({ z_id }) => {
  try {
    const deleted = await prisma.job_applications.delete({
      where: { z_id },
    });
    const success_msg = 'Application deleted successfully.';
    return { ...deleted, success_msg };
  } catch (error) {
    const error_msg = `Error while deleting application: ${error}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
};

export {
  applyForJob,
  getAllApplications,
  updateApplication,
  deleteApplication,
};

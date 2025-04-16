import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { setUserDate, setUserTime, setDateFormat, unique_id } from './dateTimeService.js';

const prisma = new PrismaClient();

// Get all nursery admissions
const getNurseryAdmissionList = async () => {
  try {
    const admissions = await prisma.nursery_admissions.findMany();
    return admissions;
  } catch (error) {
    console.error('Error fetching nursery admissions:', error);
    throw new Error('Failed to fetch nursery admissions');
  } finally {
    await prisma.$disconnect();
  }
};

// Create a new nursery admission
const createNurseryAdmissionList = async ({
  first_name,
  middle_name,
  last_name,
  adhar_no,
  father_full_name,
  mother_full_name,
  guardian_whatsapp_number,
  guardian_email_id,
  father_work,
  date_of_birth,
  gender,
  permanent_address,
  current_address,
  permanent_address_state,
  current_address_state,
  permanent_address_pincode,
  current_address_pincode,
  nationality,
  guardian_religion,
  category,
  payment_id,
  total_fees,
  payment_method,
  payment_status,
  payment_transaction_id,
  payment_date,
  paid_amount,
  student_aadhar_front,
  student_aadhar_back,
  father_aadhar_front,
  father_aadhar_back,
  mother_aadhar_front,
  mother_aadhar_back,
  student_profile_image,
  student_birth_certificate,
}) => {
  try {
    // Validate required fields
    if (!first_name || !last_name || !date_of_birth) {
      throw new Error('First name, last name, and date of birth are required');
    }

    const createdData = await prisma.nursery_admissions.create({
      data: {
        z_id: uuidv4(),
        student_id: unique_id(first_name),
        first_name,
        middle_name,
        last_name,
        adhar_no,
        father_full_name,
        mother_full_name,
        guardian_whatsapp_number,
        guardian_email_id,
        father_work,
        date_of_birth: setDateFormat(date_of_birth),
        gender,
        permanent_address,
        current_address,
        permanent_address_state,
        current_address_state,
        permanent_address_pincode,
        current_address_pincode,
        nationality,
        guardian_religion,
        category,
        payment_id,
        total_fees,
        payment_method,
        payment_status,
        payment_transaction_id,
        payment_date,
        paid_amount,
        student_aadhar_front,
        student_aadhar_back,
        father_aadhar_front,
        father_aadhar_back,
        mother_aadhar_front,
        mother_aadhar_back,
        student_profile_image,
        student_birth_certificate,
        cdate: setUserDate(),
        ctime: setUserTime(),
      },
    });

    return {
      ...createdData,
      success_msg: 'Nursery admission created successfully',
    };
  } catch (error) {
    console.error('Error creating nursery admission:', error);
    return {
      error_msg: error.message || 'Failed to create nursery admission',
    };
  } finally {
    await prisma.$disconnect();
  }
};

// Update an existing nursery admission by ID
const updateNurseryAdmissionList = async ({
  z_id,
  first_name,
  middle_name,
  last_name,
  adhar_no,
  father_full_name,
  mother_full_name,
  guardian_whatsapp_number,
  guardian_email_id,
  father_work,
  date_of_birth,
  gender,
  permanent_address,
  current_address,
  permanent_address_state,
  current_address_state,
  permanent_address_pincode,
  current_address_pincode,
  nationality,
  guardian_religion,
  category,
  payment_id,
  total_fees,
  payment_method,
  payment_status,
  payment_transaction_id,
  payment_date,
  paid_amount,
  student_aadhar_front,
  student_aadhar_back,
  father_aadhar_front,
  father_aadhar_back,
  mother_aadhar_front,
  mother_aadhar_back,
  student_profile_image,
  student_birth_certificate,
}) => {
  try {
    // Validate z_id
    if (!z_id) {
      throw new Error('z_id is required for updating');
    }

    const updatedData = await prisma.nursery_admissions.update({
      where: { z_id },
      data: {
        first_name,
        middle_name,
        last_name,
        adhar_no,
        father_full_name,
        mother_full_name,
        guardian_whatsapp_number,
        guardian_email_id,
        father_work,
        date_of_birth: date_of_birth ? setDateFormat(date_of_birth) : undefined,
        gender,
        permanent_address,
        current_address,
        permanent_address_state,
        current_address_state,
        permanent_address_pincode,
        current_address_pincode,
        nationality,
        guardian_religion,
        category,
        payment_id,
        total_fees,
        payment_method,
        payment_status,
        payment_transaction_id,
        payment_date,
        paid_amount,
        student_aadhar_front,
        student_aadhar_back,
        father_aadhar_front,
        father_aadhar_back,
        mother_aadhar_front,
        mother_aadhar_back,
        student_profile_image,
        student_birth_certificate,
        udate: setUserDate(),
        utime: setUserTime(),
      },
    });

    return {
      ...updatedData,
      success_msg: 'Nursery admission updated successfully',
    };
  } catch (error) {
    console.error('Error updating nursery admission:', error);
    return {
      error_msg: error.message || 'Failed to update nursery admission',
    };
  } finally {
    await prisma.$disconnect();
  }
};

// Delete a nursery admission by ID
const deleteNurseryAdmissionList = async ({ z_id }) => {
  try {
    // Validate z_id
    if (!z_id) {
      throw new Error('z_id is required for deletion');
    }

    const deletedData = await prisma.nursery_admissions.delete({
      where: { z_id },
    });

    return {
      ...deletedData,
      success_msg: 'Nursery admission deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting nursery admission:', error);
    return {
      error_msg: error.message || 'Failed to delete nursery admission',
    };
  } finally {
    await prisma.$disconnect();
  }
};

export {
  getNurseryAdmissionList,
  createNurseryAdmissionList,
  updateNurseryAdmissionList,
  deleteNurseryAdmissionList,
};
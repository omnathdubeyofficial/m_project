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
  gender,
  blood_group,
  adhar_no,
  category,
  mother_tangue,
  father_full_name,
  mother_full_name,
  father_work,
  mother_work,
  guardian_whatsapp_number,
  guardian_mobile_number,
  guardian_email_id,
  guardian_religion,
  guardian_annual_income,
  permanent_address,
  permanent_address_nearest_policestation,
  permanent_address_nearest_landmark,
  permanent_address_state,
  permanent_address_district,
  permanent_address_tehsil,
  permanent_address_post_office,
  permanent_address_pincode,
  permanent_address_type,
  nationality,
  current_address,
  current_address_nearest_policestation,
  current_address_nearest_landmark,
  current_address_state,
  current_address_district,
  current_address_tehsil,
  current_address_post_office,
  current_address_pincode,
  current_address_type,
  country,
  student_profile_image,
  student_aadhar_front,
  student_aadhar_back,
  father_aadhar_front,
  father_aadhar_back,
  mother_aadhar_front,
  mother_aadhar_back,
  student_birth_certificate,
  payment_id,
  payment_status,
  payment_transaction_id,
  payment_date,
  total_fees,
  paid_amount,
  payment_method,
  date_of_birth,
  class_title,
}) => {
  try {
    // ✅ Required field validation
    if (!first_name || !last_name || !date_of_birth || !class_title) {
      throw new Error('First name, last name, date of birth, and class title are required');
    }

    let created = null; // ✅ Declare here to use outside transaction

    await prisma.$transaction(async (tx) => {
      // ✅ Check if class_title exists
      const classData = await tx.classes_data.findFirst({
        where: { class_title },
      });

      if (!classData) {
        throw new Error(`Class title "${class_title}" does not exist in classes_data`);
      }

      // ✅ Validate total seats
      const totalSeats = parseInt(classData.total_seats);
      if (isNaN(totalSeats) || totalSeats <= 0) {
        throw new Error(`Invalid or missing total_seats for class "${class_title}"`);
      }

      // ✅ Check current admission count
      const currentAdmissionsCount = await tx.nursery_admissions.count({
        where: { class_title },
      });

      if (currentAdmissionsCount >= totalSeats) {
        throw new Error(`No more seats available for class "${class_title}"`);
      }

      // ✅ Create admission
      created = await tx.nursery_admissions.create({
        data: {
          z_id: uuidv4(),
          student_id: unique_id(first_name),
          date_of_birth: setDateFormat(date_of_birth),
          first_name,
          middle_name,
          last_name,
          gender,
          blood_group,
          adhar_no,
          category,
          mother_tangue,
          father_full_name,
          mother_full_name,
          father_work,
          mother_work,
          guardian_whatsapp_number,
          guardian_mobile_number,
          guardian_email_id,
          guardian_religion,
          guardian_annual_income,
          permanent_address,
          permanent_address_nearest_policestation,
          permanent_address_nearest_landmark,
          permanent_address_state,
          permanent_address_district,
          permanent_address_tehsil,
          permanent_address_post_office,
          permanent_address_pincode,
          permanent_address_type,
          nationality,
          current_address,
          current_address_nearest_policestation,
          current_address_nearest_landmark,
          current_address_state,
          current_address_district,
          current_address_tehsil,
          current_address_post_office,
          current_address_pincode,
          current_address_type,
          country,
          student_profile_image,
          student_aadhar_front,
          student_aadhar_back,
          father_aadhar_front,
          father_aadhar_back,
          mother_aadhar_front,
          mother_aadhar_back,
          student_birth_certificate,
          payment_id,
          payment_status,
          payment_transaction_id,
          payment_date,
          total_fees,
          paid_amount,
          payment_method,
          class_title,
          cdate: setUserDate(),
          ctime: setUserTime(),
        },
      });

      // ✅ Update filled_seats
      await tx.classes_data.update({
        where: { z_id: classData.z_id },
        data: {
          filled_seats: (currentAdmissionsCount + 1).toString(),
        },
      });
    });

    return { ...created, success_msg: 'Nursery admission created successfully' };

  } catch (error) {
    console.error('Error creating nursery admission:', {
      message: error.message,
      stack: error.stack,
      class_title,
      operation: 'createNurseryAdmissionList',
    });
    return { error_msg: error.message };
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
  gender,
  blood_group,
  adhar_no,
  category,
  mother_tangue,
  father_full_name,
  mother_full_name,
  father_work,
  mother_work,
  guardian_whatsapp_number,
  guardian_mobile_number,
  guardian_email_id,
  guardian_religion,
  guardian_annual_income,
  permanent_address,
  permanent_address_nearest_policestation,
  permanent_address_nearest_landmark,
  permanent_address_state,
  permanent_address_district,
  permanent_address_tehsil,
  permanent_address_post_office,
  permanent_address_pincode,
  permanent_address_type,
  nationality,
  current_address,
  current_address_nearest_policestation,
  current_address_nearest_landmark,
  current_address_state,
  current_address_district,
  current_address_tehsil,
  current_address_post_office,
  current_address_pincode,
  current_address_type,
  country,
  student_profile_image,
  student_aadhar_front,
  student_aadhar_back,
  father_aadhar_front,
  father_aadhar_back,
  mother_aadhar_front,
  mother_aadhar_back,
  student_birth_certificate,
  payment_id,
  payment_status,
  payment_transaction_id,
  payment_date,
  total_fees,
  paid_amount,
  payment_method,
  date_of_birth,
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
        gender,
        blood_group,
        adhar_no,
        category,
        mother_tangue,
        father_full_name,
        mother_full_name,
        father_work,
        mother_work,
        guardian_whatsapp_number,
        guardian_mobile_number,
        guardian_email_id,
        guardian_religion,
        guardian_annual_income,
        permanent_address,
        permanent_address_nearest_policestation,
        permanent_address_nearest_landmark,
        permanent_address_state,
        permanent_address_district,
        permanent_address_tehsil,
        permanent_address_post_office,
        permanent_address_pincode,
        permanent_address_type,
        nationality,
        current_address,
        current_address_nearest_policestation,
        current_address_nearest_landmark,
        current_address_state,
        current_address_district,
        current_address_tehsil,
        current_address_post_office,
        current_address_pincode,
        current_address_type,
        country,
        student_profile_image,
        student_aadhar_front,
        student_aadhar_back,
        father_aadhar_front,
        father_aadhar_back,
        mother_aadhar_front,
        mother_aadhar_back,
        student_birth_certificate,
        payment_id,
        payment_status,
        payment_transaction_id,
        payment_date,
        total_fees,
        paid_amount,
        payment_method,
        date_of_birth: date_of_birth ? setDateFormat(date_of_birth) : undefined,
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
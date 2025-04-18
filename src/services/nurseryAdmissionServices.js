import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { setUserDate, setUserTime, setDateFormat, unique_id } from './dateTimeService.js';

const prisma = new PrismaClient();


const getNurseryAdmissionList = async () => {
  try {
    const admissions = await prisma.nursery_admissions.findMany();
    return { success_msg: 'Nursery admissions fetched successfully', data: admissions };
  } catch (error) {
    console.error('Error fetching nursery admissions:', {
      message: error.message,
      stack: error.stack,
      operation: 'getNurseryAdmissionList',
    });
    return { error_msg: error.message || 'Failed to fetch nursery admissions' };
  } finally {
    await prisma.$disconnect();
  }
};


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
    // Validate required fields
    if (!first_name || !last_name || !date_of_birth || !class_title) {
      throw new Error('First name, last name, date of birth, and class title are required');
    }

    // Use transaction for atomicity
    await prisma.$transaction(async (tx) => {
      // Check if class_title exists in classes_data
      const classData = await tx.classes_data.findFirst({
        where: { class_title },
      });

      if (!classData) {
        throw new Error(`Class title ${class_title} does not exist in classes_data`);
      }

      // Validate total_seats
      const totalSeats = classData.total_seats;
      if (!totalSeats || isNaN(parseInt(totalSeats)) || parseInt(totalSeats) < 0) {
        throw new Error(`Invalid or missing total_seats for class ${class_title}`);
      }

      // Check current number of admissions for this class_title
      const currentAdmissionsCount = await tx.nursery_admissions.count({
        where: { class_title },
      });

      const currentAdmissionsCountStr = currentAdmissionsCount.toString();

      // Log for debugging
      console.log(`Current admissions for ${class_title}: ${currentAdmissionsCountStr}, Total seats: ${totalSeats}`);

      // Check if adding a new admission exceeds total_seats
      if (parseInt(currentAdmissionsCountStr) >= parseInt(totalSeats)) {
        throw new Error(`No more seats available for class ${class_title}`);
      }

      // Create the nursery admission
      await tx.nursery_admissions.create({
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

      // Update filled_seats to total count of admissions
      const newAdmissionsCount = (currentAdmissionsCount + 1).toString();
      await tx.classes_data.update({
        where: { z_id: classData.z_id },
        data: {
          filled_seats: newAdmissionsCount,
        },
      });
    });

    return { success_msg: 'Nursery admission created successfully' };
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
  class_title,
}) => {
  try {
    // Validate z_id
    if (!z_id) {
      throw new Error('z_id is required for updating');
    }

    // Use transaction for atomicity
    await prisma.$transaction(async (tx) => {
      // Get current admission to check class_title
      const admission = await tx.nursery_admissions.findUnique({
        where: { z_id },
      });

      if (!admission) {
        throw new Error(`Nursery admission with z_id ${z_id} not found`);
      }

      // If class_title is provided, validate it
      let newClassData = null;
      if (class_title) {
        newClassData = await tx.classes_data.findFirst({
          where: { class_title },
        });

        if (!newClassData) {
          throw new Error(`Class title ${class_title} does not exist in classes_data`);
        }

        // Validate total_seats
        const totalSeats = newClassData.total_seats;
        if (!totalSeats || isNaN(parseInt(totalSeats)) || parseInt(totalSeats) < 0) {
          throw new Error(`Invalid or missing total_seats for class ${class_title}`);
        }

        // Check current number of admissions for new class_title
        const currentAdmissionsCount = await tx.nursery_admissions.count({
          where: { class_title },
        });

        const currentAdmissionsCountStr = currentAdmissionsCount.toString();

        // Check if changing class_title would exceed total_seats
        if (parseInt(currentAdmissionsCountStr) >= parseInt(totalSeats)) {
          throw new Error(`No more seats available for class ${class_title}`);
        }
      }

      // Update the admission
      await tx.nursery_admissions.update({
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
          class_title,
          udate: setUserDate(),
          utime: setUserTime(),
        },
      });

      // If class_title changed, update filled_seats for old and new class_title
      if (class_title && admission.class_title && admission.class_title !== class_title) {
        // Update filled_seats for old class_title
        const oldClassData = await tx.classes_data.findFirst({
          where: { class_title: admission.class_title },
        });

        if (oldClassData) {
          const oldAdmissionsCount = await tx.nursery_admissions.count({
            where: { class_title: admission.class_title },
          });
          await tx.classes_data.update({
            where: { z_id: oldClassData.z_id },
            data: {
              filled_seats: (oldAdmissionsCount - 1).toString(), // Reflect new count
            },
          });
        }

        // Update filled_seats for new class_title
        if (newClassData) {
          const newAdmissionsCount = await tx.nursery_admissions.count({
            where: { class_title },
          });
          await tx.classes_data.update({
            where: { z_id: newClassData.z_id },
            data: {
              filled_seats: newAdmissionsCount.toString(), // Reflect new count
            },
          });
        }
      } else if (class_title) {
        // If class_title didn't change, update filled_seats for current class_title
        if (newClassData) {
          const newAdmissionsCount = await tx.nursery_admissions.count({
            where: { class_title },
          });
          await tx.classes_data.update({
            where: { z_id: newClassData.z_id },
            data: {
              filled_seats: newAdmissionsCount.toString(),
            },
          });
        }
      }
    });

    return { success_msg: 'Nursery admission updated successfully' };
  } catch (error) {
    console.error('Error updating nursery admission:', {
      message: error.message,
      stack: error.stack,
      z_id,
      class_title,
      operation: 'updateNurseryAdmissionList',
    });
    return { error_msg: error.message };
  } finally {
    await prisma.$disconnect();
  }
};


const deleteNurseryAdmissionList = async ({ z_id }) => {
  try {
    // Validate z_id
    if (!z_id) {
      throw new Error('z_id is required for deletion');
    }

    // Use transaction for atomicity
    await prisma.$transaction(async (tx) => {
      // Get the admission to find its class_title
      const admission = await tx.nursery_admissions.findUnique({
        where: { z_id },
      });

      if (!admission) {
        throw new Error(`Nursery admission with z_id ${z_id} not found`);
      }

      // Delete the admission
      await tx.nursery_admissions.delete({
        where: { z_id },
      });

      // Update filled_seats in classes_data
      if (admission.class_title) {
        const classData = await tx.classes_data.findFirst({
          where: { class_title: admission.class_title },
        });

        if (classData) {
          const newAdmissionsCount = await tx.nursery_admissions.count({
            where: { class_title: admission.class_title },
          });
          await tx.classes_data.update({
            where: { z_id: classData.z_id },
            data: {
              filled_seats: newAdmissionsCount.toString(),
            },
          });
        }
      }
    });

    return { success_msg: 'Nursery admission deleted successfully' };
  } catch (error) {
    console.error('Error deleting nursery admission:', {
      message: error.message,
      stack: error.stack,
      z_id,
      operation: 'deleteNurseryAdmissionList',
    });
    return { error_msg: error.message };
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
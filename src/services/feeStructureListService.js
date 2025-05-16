import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getFeeStructureLists = async () => {
  return await prisma.fee_structure_data.findMany();
};

// Create a new user
const createFeeStructureList = async ({ class_name, class_section, academic_year, admission_fee, library_fee, uniform_fee, lab_fee, computer_class_fee, annual_fee, sports_fee, activity_fee, examination_fee, hostel_fee, transport_fee_per_km, sibling_discount, early_payment_discount, scholarship_amount, id_card_fee, medical_fee, exam_admit_card, platform_fee, other_fee }) => {
  try {
    const createdData = await prisma.fee_structure_data.create({
      data: { z_id: uuidv4(), class_name, class_section, academic_year, admission_fee, library_fee, uniform_fee, lab_fee, computer_class_fee, annual_fee, sports_fee, activity_fee, examination_fee, hostel_fee, transport_fee_per_km, sibling_discount, early_payment_discount, scholarship_amount, id_card_fee, medical_fee, exam_admit_card, platform_fee, other_fee, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "Fees structure list created successfully."
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
const updateFeeStructureList = async ({ z_id, class_name, class_section, academic_year, admission_fee, library_fee, uniform_fee, lab_fee, computer_class_fee, annual_fee, sports_fee, activity_fee, examination_fee, hostel_fee, transport_fee_per_km, sibling_discount, early_payment_discount, scholarship_amount, id_card_fee, medical_fee, exam_admit_card, platform_fee, other_fee }) => {
  try {

    const updatedData = await prisma.fee_structure_data.update({
      where: { z_id },
      data: { class_name, class_section, academic_year, admission_fee, library_fee, uniform_fee, lab_fee, computer_class_fee, annual_fee, sports_fee, activity_fee, examination_fee, hostel_fee, transport_fee_per_km, sibling_discount, early_payment_discount, scholarship_amount, id_card_fee, medical_fee, exam_admit_card, platform_fee, other_fee, udate: setUserDate(), utime: setUserTime() },
    });
    const success_msg = "Fees structure list updated successfully."
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
const deleteFeeStructureList = async ({ z_id }) => {
  try {
    console.log("z_id :", z_id)
    const deletedData = await prisma.fee_structure_data.delete({
      where: { z_id },
    });
    const success_msg = "Fees structure list deleted successfully."
    return { ...deletedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

export { getFeeStructureLists, createFeeStructureList, updateFeeStructureList, deleteFeeStructureList };

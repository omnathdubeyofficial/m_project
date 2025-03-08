import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime, setDateFormat } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getTransportVehicleRegistration = async () => {
  return await prisma.transport_vehicle_registration.findMany();
};

// Create a new user
const createTransportVehicleRegistration = async ({ vehicle_id, vehicle_number, vehicle_type, fuel_type, seating_capacity, vehicle_img, model, chassis_number, engine_number, insurance_policy_number, insurance_policy_certificate, insurance_expiry_date, fitness_certificate_expiry_date, puc_certificate, permit_number, permit_expiry_date, status, gps_tracker_id, owner_first_name, owner_middle_name, owner_last_name, owner_address, owner_mobile_num, alternate_mobile_num, owner_email, owner_whatsapp_num, owner_dob, owner_pincode, owner_district, owner_state, owner_country, owner_adhar_num, owner_pan_num, owner_adhar_img, owner_pan_img, owner_bank_passbook_img, bank_name, bank_account_holder_name, bank_ifsc, bank_account_num, bank_branch_code, bank_branch_name }) => {
  try {

    const createdData = await prisma.transport_vehicle_registration.create({
      data: { z_id: uuidv4(), vehicle_id, vehicle_number, vehicle_type, fuel_type, seating_capacity, vehicle_img, model, chassis_number, engine_number, insurance_policy_number, insurance_policy_certificate, insurance_expiry_date: setDateFormat(insurance_expiry_date), fitness_certificate_expiry_date: setDateFormat(fitness_certificate_expiry_date), puc_certificate, permit_number, permit_expiry_date: setDateFormat(permit_expiry_date), status, gps_tracker_id, owner_first_name, owner_middle_name, owner_last_name, owner_address, owner_mobile_num, alternate_mobile_num, owner_email, owner_whatsapp_num, owner_dob: setDateFormat(owner_dob), owner_pincode, owner_district, owner_state, owner_country, owner_adhar_num, owner_pan_num, owner_adhar_img, owner_pan_img, owner_bank_passbook_img, bank_name, bank_account_holder_name, bank_ifsc, bank_account_num, bank_branch_code, bank_branch_name, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "Transport vehicle Registration completed successfully."
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
const updateTransportVehicleRegistration = async ({ z_id, vehicle_id, vehicle_number, vehicle_type, fuel_type, seating_capacity, vehicle_img, model, chassis_number, engine_number, insurance_policy_number, insurance_policy_certificate, insurance_expiry_date, fitness_certificate_expiry_date, puc_certificate, permit_number, permit_expiry_date, status, gps_tracker_id, owner_first_name, owner_middle_name, owner_last_name, owner_address, owner_mobile_num, alternate_mobile_num, owner_email, owner_whatsapp_num, owner_dob, owner_pincode, owner_district, owner_state, owner_country, owner_adhar_num, owner_pan_num, owner_adhar_img, owner_pan_img, owner_bank_passbook_img, bank_name, bank_account_holder_name, bank_ifsc, bank_account_num, bank_branch_code, bank_branch_name }) => {
  try {

    const updatedData = await prisma.transport_vehicle_registration.update({
      where: { z_id },
      data: { vehicle_id, vehicle_number, vehicle_type, fuel_type, seating_capacity, vehicle_img, model, chassis_number, engine_number, insurance_policy_number, insurance_policy_certificate, insurance_expiry_date: setDateFormat(insurance_expiry_date), fitness_certificate_expiry_date: setDateFormat(fitness_certificate_expiry_date), puc_certificate, permit_number, permit_expiry_date: setDateFormat(permit_expiry_date), status, gps_tracker_id, owner_first_name, owner_middle_name, owner_last_name, owner_address, owner_mobile_num, alternate_mobile_num, owner_email, owner_whatsapp_num, owner_dob: setDateFormat(owner_dob), owner_pincode, owner_district, owner_state, owner_country, owner_adhar_num, owner_pan_num, owner_adhar_img, owner_pan_img, owner_bank_passbook_img, bank_name, bank_account_holder_name, bank_ifsc, bank_account_num, bank_branch_code, bank_branch_name, udate: setUserDate(), utime: setUserTime() },
    });
    const success_msg = "Transport vehicle Registration updated successfully."
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
const deleteTransportVehicleRegistration = async ({ z_id }) => {
  try {
    console.log("z_id :", z_id)
    const deletedData = await prisma.transport_vehicle_registration.delete({
      where: { z_id },
    });
    const success_msg = "Transport vehicle Registration deleted successfully."
    return { ...deletedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

export { getTransportVehicleRegistration, createTransportVehicleRegistration, updateTransportVehicleRegistration, deleteTransportVehicleRegistration };

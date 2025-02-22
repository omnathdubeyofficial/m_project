import { gql } from 'graphql-tag';

const transportVehicleRegistrationType = gql`
  # User type definition
  type transportVehicleRegistration {
    z_id : String
    vehicle_id : String
    vehicle_number : String
    vehicle_type : String
    fuel_type : String
    seating_capacity : String
    vehicle_img : String
    model : String
    chassis_number : String
    engine_number : String
    insurance_policy_number : String
    insurance_policy_certificate : String
    insurance_expiry_date : String
    fitness_certificate_expiry_date : String
    puc_certificate : String
    permit_number : String
    permit_expiry_date : String
    status : String
    gps_tracker_id : String
    owner_first_name : String
    owner_middle_name : String
    owner_last_name : String
    owner_address : String
    owner_mobile_num : String
    alternate_mobile_num : String
    owner_email : String
    owner_whatsapp_num : String
    owner_dob : String
    owner_pincode : String
    owner_district : String
    owner_state : String
    owner_country : String
    owner_adhar_num : String
    owner_pan_num : String
    owner_adhar_img : String
    owner_pan_img : String
    owner_bank_passbook_img : String
    bank_name : String
    bank_account_holder_name : String
    bank_ifsc : String
    bank_account_num : String
    bank_branch_code : String
    bank_branch_name : String
    cdate : String
    ctime : String
    udate : String
    utime : String
    success_msg : String
    error_msg : String
  }

  # Query type for fetching users
  type Query {
    getTransportVehicleRegistration: [transportVehicleRegistration]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createTransportVehicleRegistration(vehicle_id : String, vehicle_number : String, vehicle_type : String, fuel_type : String, seating_capacity : String,
    vehicle_img : String, model : String, chassis_number : String, engine_number : String, insurance_policy_number : String, insurance_policy_certificate : String,insurance_expiry_date : String, fitness_certificate_expiry_date : String, puc_certificate : String, permit_number : String, permit_expiry_date : String, status : String, gps_tracker_id : String, owner_first_name : String, owner_middle_name : String, owner_last_name : String, owner_address : String,owner_mobile_num : String, alternate_mobile_num : String, owner_email : String, owner_whatsapp_num : String, owner_dob : String, owner_pincode : String, owner_district : String, owner_state : String, owner_country : String,owner_adhar_num : String, owner_pan_num : String, owner_adhar_img : String, owner_pan_img : String, owner_bank_passbook_img : String, bank_name : String, bank_account_holder_name : String, bank_ifsc : String, bank_account_num : String, bank_branch_code : String, bank_branch_name : String): transportVehicleRegistration

    updateTransportVehicleRegistration(z_id : String, vehicle_id : String, vehicle_number : String, vehicle_type : String, fuel_type : String, seating_capacity : String,vehicle_img : String, model : String, chassis_number : String, engine_number : String, insurance_policy_number : String, insurance_policy_certificate : String,insurance_expiry_date : String, fitness_certificate_expiry_date : String, puc_certificate : String, permit_number : String, permit_expiry_date : String, status : String, gps_tracker_id : String, owner_first_name : String, owner_middle_name : String, owner_last_name : String, owner_address : String,owner_mobile_num : String, alternate_mobile_num : String, owner_email : String, owner_whatsapp_num : String, owner_dob : String, owner_pincode : String, owner_district : String, owner_state : String, owner_country : String,owner_adhar_num : String, owner_pan_num : String, owner_adhar_img : String, owner_pan_img : String, owner_bank_passbook_img : String, bank_name : String, bank_account_holder_name : String, bank_ifsc : String, bank_account_num : String, bank_branch_code : String, bank_branch_name : String): transportVehicleRegistration

    deleteTransportVehicleRegistration(z_id : String): transportVehicleRegistration
  }
`;

export default transportVehicleRegistrationType;

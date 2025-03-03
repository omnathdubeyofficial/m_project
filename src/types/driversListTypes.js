import { gql } from 'graphql-tag';

const driversListType = gql`
  # User type definition
  type driversListTypes {
    z_id : String
    driver_id : String
    first_name : String
    email : String
    phone_no : String
    whatsapp_no : String
    alternate_no : String
    blood_group : String
    permanent_address : String
    gender : String
    dob : String
    status : String
    shift : String
    registration_date : String
    joining_date : String
    adhar_card_num : String
    pan_num : String
    license_number : String
    license_expiry : String
    license_img : String
    adhar_card_front_img : String
    adhar_card_back_img : String
    pan_card_img : String
    last_eye_checkup_date : String
    eye_test_result : String
    visually_impared : String
    eye_disorder : String
    bank_name : String
    bank_account_num : String
    account_holder_name : String
    ifsc_code : String
    bank_branch_name : String
    bank_passbook_img : String
    middle_name : String
    last_name : String
    current_address : String
    joining_salary : String
    current_salary : String
    state : String
    pincode : String
    country : String
    city : String
    previous_work_description : String
    cdate : String
    ctime : String
    udate : String
    utime : String
    success_msg : String
    error_msg : String
  }

  # Query type for fetching users
  type Query {
    getDriverList: [driversListTypes]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createDriverForm(first_name : String, email : String, phone_no : String, whatsapp_no : String, alternate_no : String, blood_group : String, permanent_address : String, gender : String, dob : String, status : String, shift : String, registration_date : String, joining_date : String, adhar_card_num : String, pan_num : String, license_number : String, license_expiry : String, license_img : String, adhar_card_front_img : String, adhar_card_back_img : String, pan_card_img : String, last_eye_checkup_date : String, eye_test_result : String, visually_impared : String, eye_disorder : String, bank_name : String, bank_account_num : String, account_holder_name : String, ifsc_code : String, bank_branch_name : String, bank_passbook_img : String, middle_name : String, last_name : String, current_address : String, joining_salary : String, current_salary : String, state : String, pincode : String, country : String, city : String, previous_work_description : String): driversListTypes

    updateDriverList(z_id : String, first_name : String, email : String, phone_no : String, whatsapp_no : String, alternate_no : String, blood_group : String, permanent_address : String, gender : String, dob : String, status : String, shift : String, registration_date : String, joining_date : String, adhar_card_num : String, pan_num : String, license_number : String, license_expiry : String, license_img : String, adhar_card_front_img : String, adhar_card_back_img : String, pan_card_img : String, last_eye_checkup_date : String, eye_test_result : String, visually_impared : String, eye_disorder : String, bank_name : String, bank_account_num : String, account_holder_name : String, ifsc_code : String, bank_branch_name : String, bank_passbook_img : String, middle_name : String, last_name : String, current_address : String,joining_salary : String, current_salary : String, state : String, pincode : String, country : String, city : String, previous_work_description : String): driversListTypes

    deleteDriverList(z_id : String): driversListTypes
  }
`;

export default driversListType;

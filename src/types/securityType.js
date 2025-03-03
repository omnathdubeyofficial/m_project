import { gql } from 'graphql-tag';

const securityType = gql`
  # User type definition
  type securityTypes {
    z_id : String
    security_id : String
    first_name : String
    last_name : String
    permanent_address : String
    current_address : String
    state : String
    pincode : String
    country : String
    city : String
    whatsapp_num : String
    bank_account_num : String
    bank_name : String
    account_holder_name : String
    bank_branch_name : String
    ifsc_code : String
    bank_passbook_img : String
    joining_date : String
    joining_salary : String
    current_salary : String
    previous_work_description : String
    adhar_num : String
    pan_num : String
    gender : String
    contact_num : String
    email : String
    date_of_birth : String
    s_date : String
    age : String
    qualification : String
    profile_img : String
    adhar_img : String
    pan_img : String
    cdate : String
    ctime : String
    udate : String
    utime : String
    success_msg : String
    error_msg : String
  }

  # Query type for fetching users
  type Query {
    getSecurityList: [securityTypes]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createSecurityForm(first_name : String, last_name : String, permanent_address : String, current_address : String, state : String, pincode : String,country : String, city : String, whatsapp_num : String, bank_account_num : String, bank_name : String, account_holder_name : String, bank_branch_name : String, ifsc_code : String, bank_passbook_img : String, joining_date : String, joining_salary : String, current_salary : String, previous_work_description : String, adhar_num : String, pan_num : String, gender : String, contact_num : String, email : String, date_of_birth : String, age : String,qualification : String, s_date : String, profile_img : String, adhar_img : String, pan_img : String): securityTypes

    updateSecurityList(z_id : String, security_id : String, first_name : String, last_name : String, permanent_address : String, current_address : String, state : String, pincode : String, country : String, city : String, whatsapp_num : String, bank_account_num : String, bank_name : String, account_holder_name : String, bank_branch_name : String, ifsc_code : String, bank_passbook_img : String, joining_date : String, joining_salary : String, current_salary : String
    previous_work_description : String, adhar_num : String, pan_num : String, gender : String, contact_num : String, email : String, date_of_birth : String, age : String,qualification : String,s_date : String, profile_img : String, adhar_img : String, pan_img : String): securityTypes

    deleteSecurityList(z_id : String): securityTypes
  }
`;

export default securityType;

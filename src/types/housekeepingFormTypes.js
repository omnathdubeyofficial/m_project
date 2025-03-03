import { gql } from 'graphql-tag';

const housekeepingListType = gql`
  # User type definition
  type housekeepingListTypes {
    z_id : String
    staff_id : String
    first_name : String
    middle_name : String
    last_name : String
    gender : String
    contact_no : String
    whatsapp_no : String
    email : String
    adhar_no : String
    pan_no : String
    joining_date : String
    work_description : String
    start_time : String
    end_time : String
    assigned_by : String
    supervisor_comments : String
    feedback : String
    permanent_address : String
    current_address : String
    state : String
    pincode : String
    country : String
    city : String
    previous_work_description : String
    joining_salary : String
    current_salary : String
    bank_account_num : String
    bank_name : String
    account_holder_name : String
    bank_branch_name : String
    ifsc_code : String
    bank_passbook_img : String
    adhar_front_img : String
    adhar_back_img : String
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
    getHouseKeepingList: [housekeepingListTypes]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createHouseKeepingForm(first_name : String, middle_name : String, last_name : String, gender : String, contact_no : String, whatsapp_no : String, email : String, adhar_no : String, pan_no : String, joining_date : String, work_description : String, start_time : String, end_time : String, assigned_by : String, supervisor_comments : String, feedback : String, permanent_address : String, current_address : String, state : String, pincode : String, country : String, city : String, previous_work_description : String, joining_salary : String, current_salary : String, bank_account_num : String, bank_name : String, account_holder_name : String, bank_branch_name : String, ifsc_code : String, bank_passbook_img : String, adhar_front_img : String, adhar_back_img : String, pan_img : String): housekeepingListTypes

    updateHouseKeepingList(z_id : String, first_name : String, middle_name : String, last_name : String, gender : String, contact_no : String, whatsapp_no : String, email : String, adhar_no : String, pan_no : String, joining_date : String, work_description : String, start_time : String, end_time : String, assigned_by : String, supervisor_comments : String, feedback : String, permanent_address : String, current_address : String, state : String, pincode : String, country : String, city : String, previous_work_description : String, joining_salary : String, current_salary : String, bank_account_num : String, bank_name : String, account_holder_name : String, bank_branch_name : String, ifsc_code : String, bank_passbook_img : String, adhar_front_img : String, adhar_back_img : String, pan_img : String): housekeepingListTypes

    deleteHouseKeepingList(z_id : String): housekeepingListTypes
  }
`;

export default housekeepingListType;

import { gql } from 'graphql-tag';

const admissionFormType = gql`
  # User type definition
  type admissionForm {
    z_id : String
    student_name : String
    adhar_number : String
    pan_number : String
    email : String
    profile_img : String
    contact_number : String
    date_of_birth : String
    gender : String
    address : String
    city : String
    state : String
    pincode : String
    nationality : String
    course_applied : String
    education_qualification : String
    percentage : String
    bank_name : String
    bank_account_holder_name : String
    bank_branch : String
    account_number : String
    ifsc_code : String
    adhar_card_img : String
    pan_card_img : String
    prev_marksheet : String
    passbook : String
    guardian_name : String
    guardian_contact : String
    admission_status : String
    submission_date : String
    admission_fee : String
    cdate : String
    ctime : String
    udate : String
    utime : String
    success_msg : String
    error_msg : String
  }

  # Query type for fetching users
  type Query {
    getAdmissionForm: [admissionForm]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createAdmissionForm(student_name : String, adhar_number : String, pan_number : String, email : String, profile_img : String, contact_number : String, date_of_birth : String, gender : String, address : String, city : String, state : String, pincode : String, nationality : String, course_applied : String, education_qualification : String, percentage : String, bank_name : String, bank_account_holder_name : String, bank_branch : String, account_number : String, ifsc_code : String, adhar_card_img : String, pan_card_img : String, prev_marksheet : String, passbook : String, guardian_name : String, guardian_contact : String, admission_status : String, submission_date : String, admission_fee : String, cdate : String, ctime : String): admissionForm

    updateAdmissionForm(z_id : String, student_name : String, adhar_number : String, pan_number : String, email : String, profile_img : String, contact_number : String, date_of_birth : String, gender : String, address : String, city : String, state : String, pincode : String, nationality : String, course_applied : String, education_qualification : String, percentage : String, bank_name : String, bank_account_holder_name : String, bank_branch : String, account_number : String, ifsc_code : String, adhar_card_img : String, pan_card_img : String, prev_marksheet : String, passbook : String, guardian_name : String, guardian_contact : String, admission_status : String, submission_date : String, admission_fee : String, udate : String, utime : String): admissionForm

    deleteAdmissionForm(z_id : String): admissionForm
  }
`;

export default admissionFormType;

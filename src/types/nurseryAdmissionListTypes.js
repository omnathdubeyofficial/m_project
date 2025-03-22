import { gql } from 'graphql-tag';

const nurseryAdmissionListType = gql`
  # User type definition
  type nurseryAdmissionListTypes {
    z_id : String
    student_id : String
    first_name : String
    middle_name : String
    last_name : String
    adhar_num : String
    father_name : String
    mother_name : String
    father_contact_num : String
    father_email : String
    father_occupation : String
    dob : String
    gender : String
    permanent_address : String
    current_address : String
    city : String
    state : String
    pincode : String
    nationality : String
    religion : String
    caste : String
    admission_status : String
    admission_fee : String
    student_adhar_front_img : String
    student_adhar_back_img : String
    father_adhar_front_img : String
    father_adhar_back_img : String
    mother_adhar_front_img : String
    mother_adhar_back_img : String
    father_pancard_img : String
    student_profile_img : String
    student_birth_certificate_img : String
    payment_id : String
    admission_fees : String
    payment_method : String
    payment_status : String
    payment_transaction_id : String
    payment_date : String
    total_fees : String
    paid_amount : String
    due_amount : String
    cdate : String
    ctime : String
    udate : String
    utime : String
    success_msg : String
    error_msg : String
  }

  # Query type for fetching users
  type Query {
    getNurseryAdmissionList: [nurseryAdmissionListTypes]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createNurseryAdmissionList(first_name : String, middle_name : String, last_name : String, adhar_num : String, father_name : String, mother_name : String, father_contact_num : String, father_email : String, father_occupation : String, dob : String, gender : String, permanent_address : String, current_address : String, city : String, state : String, pincode : String, nationality : String, religion : String, caste : String, admission_status : String, admission_fee : String, student_adhar_front_img : String, student_adhar_back_img : String, father_adhar_front_img : String, father_adhar_back_img : String, mother_adhar_front_img : String, mother_adhar_back_img : String, father_pancard_img : String, student_profile_img : String, student_birth_certificate_img : String, payment_id : String, admission_fees : String, payment_method : String, payment_status : String, payment_transaction_id : String, payment_date : String, total_fees : String, paid_amount : String, due_amount : String): nurseryAdmissionListTypes

    updateNurseryAdmissionList(z_id : String, first_name : String, middle_name : String, last_name : String, adhar_num : String, father_name : String, mother_name : String, father_contact_num : String, father_email : String, father_occupation : String, dob : String, gender : String, permanent_address : String, current_address : String, city : String, state : String, pincode : String, nationality : String, religion : String, caste : String, admission_status : String, admission_fee : String, student_adhar_front_img : String, student_adhar_back_img : String, father_adhar_front_img : String, father_adhar_back_img : String, mother_adhar_front_img : String, mother_adhar_back_img : String, father_pancard_img : String, student_profile_img : String, student_birth_certificate_img : String, payment_id : String, admission_fees : String, payment_method : String, payment_status : String, payment_transaction_id : String, payment_date : String, total_fees : String, paid_amount : String, due_amount : String): nurseryAdmissionListTypes

    deleteNurseryAdmissionList(z_id : String): nurseryAdmissionListTypes
  }
`;

export default nurseryAdmissionListType;

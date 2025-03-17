import { gql } from 'graphql-tag';

const studentRegistrationType = gql`
  # User type definition
  type studentRegistration {
    z_id : String
    first_name : String
    middle_name : String
    last_name : String
    student_id : String
    adhar_no : String
    gender : String
    email : String
    date_of_birth : String
    contact_no : String
    permanent_address : String
    previous_school : String
    highest_qualification : String
    percentage : String
    entrance_exam_score : String
    father_name : String
    father_contact_no : String
    father_email : String
    relationship : String
    profile_image : String
    desired_class : String
    previous_year_of_passing : String
    board : String
    father_whatsapp_no : String
    father_occupation : String
    mother_name : String
    mother_occupation : String
    guardian_name : String
    guardian_contact_no : String
    guardian_email : String
    guardian_occupation : String
    number_of_brothers : String
    brother_occupation : String
    blood_group : String
    religion : String
    annual_income : String
    category : String
    admission_status : String
    mother_tongue : String
    current_address : String
    permanent_address_nearest_police_station : String
    current_address_nearest_police_station : String
    permanent_address_nearest_landmark : String
    current_address_nearest_landmark : String
    permanent_address_state : String
    current_address_state : String
    permanent_address_district : String
    current_address_district : String
    permanent_address_tehsil : String
    current_address_tehsil : String
    permanent_address_post_office : String
    current_address_post_office : String
    permanent_address_pincode : String
    permanent_address_type : String
    current_address_type : String
    nationality : String
    country : String
    adhar_front_img : String
    adhar_back_img : String
    previous_year_marksheet : String
    income_certificate : String
    cdate : String
    ctime : String
    udate : String
    utime : String
    success_msg : String
    error_msg : String
  }

  # Query type for fetching users
  type Query {
    getStudentRegistration: [studentRegistration]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createStudentRegistration(first_name : String, middle_name : String, last_name : String, adhar_no : String, gender : String, email : String, date_of_birth : String, contact_no : String, permanent_address : String, previous_school : String, highest_qualification : String, percentage : String, entrance_exam_score : String, father_name : String, father_contact_no : String, father_email : String, relationship : String, profile_image : String, desired_class : String, previous_year_of_passing : String, board : String, father_whatsapp_no : String, father_occupation : String, mother_name : String, mother_occupation : String, guardian_name : String, guardian_contact_no : String, guardian_email : String, guardian_occupation : String, number_of_brothers : String, brother_occupation : String, blood_group : String, religion : String, annual_income : String, category : String, admission_status : String, mother_tongue : String, current_address : String, permanent_address_nearest_police_station : String, current_address_nearest_police_station : String, permanent_address_nearest_landmark : String, current_address_nearest_landmark : String, permanent_address_state : String, current_address_state : String, permanent_address_district : String, current_address_district : String, permanent_address_tehsil : String, current_address_tehsil : String, permanent_address_post_office : String, current_address_post_office : String, permanent_address_pincode : String, permanent_address_type : String, current_address_type : String, nationality : String, country : String, adhar_front_img : String, adhar_back_img : String, previous_year_marksheet : String, income_certificate : String): studentRegistration

    updateStudentRegistration(z_id : String, first_name : String, middle_name : String, last_name : String, adhar_no : String, gender : String, email : String, date_of_birth : String, contact_no : String, permanent_address : String, previous_school : String, highest_qualification : String, percentage : String, entrance_exam_score : String, father_name : String, father_contact_no : String, father_email : String, relationship : String, profile_image : String, desired_class : String, previous_year_of_passing : String, board : String, father_whatsapp_no : String, father_occupation : String, mother_name : String, mother_occupation : String, guardian_name : String, guardian_contact_no : String, guardian_email : String, guardian_occupation : String, number_of_brothers : String, brother_occupation : String, blood_group : String, religion : String, annual_income : String, category : String, admission_status : String, mother_tongue : String, current_address : String, permanent_address_nearest_police_station : String, current_address_nearest_police_station : String, permanent_address_nearest_landmark : String, current_address_nearest_landmark : String, permanent_address_state : String, current_address_state : String, permanent_address_district : String, current_address_district : String, permanent_address_tehsil : String, current_address_tehsil : String, permanent_address_post_office : String, current_address_post_office : String, permanent_address_pincode : String, permanent_address_type : String, current_address_type : String, nationality : String, country : String, adhar_front_img : String, adhar_back_img : String, previous_year_marksheet : String, income_certificate : String): studentRegistration

    deleteStudentRegistration(z_id : String): studentRegistration
  }
`;

export default studentRegistrationType;

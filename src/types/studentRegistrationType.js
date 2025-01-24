import { gql } from 'graphql-tag';

const studentRegistrationType = gql`
  # User type definition
  type studentRegistration {
    z_id : String
    first_name : String
    middle_name : String
    last_name : String
    adhar_no : String
    gender : String
    email : String
    date_of_birth : String
    contact_no : String
    address : String
    previous_school : String
    highest_qualification : String
    percentage : String
    entrance_exam_score : String
    parent_name : String
    parent_contact_no : String
    parent_email : String
    relationship : String
    profile_image : String
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
    createStudentRegistration(first_name : String, last_name : String, middle_name: String, adhar_no : String, email : String, date_of_birth : String, gender : String,contact_no : String, address : String, previous_school : String, highest_qualification : String, percentage : String, entrance_exam_score : String, parent_name : String, parent_contact_no : String, parent_email : String, relationship : String, profile_image : String): studentRegistration

    updateStudentRegistration(z_id : String, first_name : String, last_name : String, middle_name: String, adhar_no : String, email : String, date_of_birth : String, contact_no : String, address : String, previous_school : String, gender : String,highest_qualification : String, percentage : String, entrance_exam_score : String, parent_name : String, parent_contact_no : String, parent_email : String, relationship : String, profile_image : String): studentRegistration

    deleteStudentRegistration(z_id : String): studentRegistration
  }
`;

export default studentRegistrationType;

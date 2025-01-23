import { gql } from 'graphql-tag';

const userDataType = gql`
  # User type definition
  type userManagement {
    z_id: String
    userid: String
    first_name: String
    middle_name: String
    last_name: String
    gender : String
    email : String
    password : String
    contact_no : String
    role : String
    status : String
    subject_specialization : String
    class_assigned : String
    teacher_id : String
    admin_id : String
    joining_date : String
    qualification : String
    enrollment_no : String
    date_of_birth : String
    standard : String
    section : String
    parent_id : String
    admission_date : String
    children_id : String
    occupation : String
    address : String
    nationality : String
    cdate : String
    ctime : String
    udate : String
    utime : String
    success_msg : String,
    error_msg : String
  }

  # Query type for fetching users
  type Query {
    getUserManagementData: [userManagement]
    login(userid : String, password : String) : userManagement
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createUserManagementData(first_name: String, middle_name : String, last_name : String, gender: String, email : String, password : String, contact_no : String, role : String, status : String, subject_specialization : String,class_assigned: String, teacher_id : String, admin_id : String, joining_date : String,qualification : String, enrollment_no : String,date_of_birth : String,standard : String, section : String, parent_id : String, admission_date : String, children_id : String, occupation : String, address : String, nationality : String, cdate : String, ctime : String, udate : String, utime : String ): userManagement

    updateUserManagementData(z_id : String, first_name: String, middle_name : String, last_name : String, gender: String, email : String, password : String, contact_no : String, role : String, status : String, subject_specialization : String,class_assigned: String, teacher_id : String, admin_id : String, joining_date : String,qualification : String, enrollment_no : String,date_of_birth : String,standard : String, section : String, parent_id : String, admission_date : String, children_id : String, occupation : String, address : String, nationality : String, cdate : String, ctime : String, udate : String, utime : String): userManagement

    deleteUserManagementData(z_id: String): userManagement
  }
`;

export default userDataType;

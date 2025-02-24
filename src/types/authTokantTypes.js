import { gql } from 'graphql-tag';

const userDataType = gql`
  # User type definition
  type getUserDataFromTokentype {
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
  }

  # Query type for fetching users
  type Query {
    getUserDataFromToken : getUserDataFromTokentype
  }


`;

export default userDataType;

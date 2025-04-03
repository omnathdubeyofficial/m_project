import { gql } from 'graphql-tag';

const userDataType = gql`
  # User type definition
  type user_management {
    z_id: String
    userid: String
    first_name: String
    middle_name: String
    last_name: String
    gender: String
    email: String
    password: String
    contact_no: String
    role: String
    status: String
    subject_specialization: String
    class_assigned: String
    teacher_id: String
    admin_id: String
    joining_date: String
    qualification: String
    enrollment_no: String
    date_of_birth: String
    standard: String
    section: String
    parent_id: String
    admission_date: String
    children_id: String
    occupation: String
    address: String
    nationality: String
    adhar_card_front_img: String
    adhar_card_back_img: String
    pan_card_img: String
    cdate: String
    ctime: String
    udate: String
    utime: String
    profile_img: String
  }

  # Login response type
  type LoginResponse {
    success_msg: String
    error_msg: String
    token: String
    requiresOtp: Boolean
  }

  # Query type for fetching users
  type Query {
    getUserManagementData: [user_management]
    login(userid: String!, password: String!): LoginResponse!
  }

  # Mutation types for creating, updating, deleting users and verifying OTP
  type Mutation {
    createUserManagementData(
      first_name: String
      middle_name: String
      last_name: String
      gender: String
      email: String
      password: String
      contact_no: String
      role: String
      status: String
      subject_specialization: String
      class_assigned: String
      teacher_id: String
      admin_id: String
      joining_date: String
      qualification: String
      enrollment_no: String
      date_of_birth: String
      standard: String
      section: String
      parent_id: String
      admission_date: String
      children_id: String
      occupation: String
      address: String
      nationality: String
      profile_img: String
      adhar_card_front_img: String
      adhar_card_back_img: String
      pan_card_img: String
      cdate: String
      ctime: String
      udate: String
      utime: String
    ): user_management

    updateUserManagementData(
      z_id: String!
      first_name: String
      middle_name: String
      last_name: String
      gender: String
      email: String
      password: String
      contact_no: String
      role: String
      status: String
      subject_specialization: String
      class_assigned: String
      teacher_id: String
      admin_id: String
      joining_date: String
      qualification: String
      enrollment_no: String
      date_of_birth: String
      standard: String
      section: String
      parent_id: String
      admission_date: String
      children_id: String
      occupation: String
      address: String
      nationality: String
      profile_img: String
      adhar_card_front_img: String
      adhar_card_back_img: String
      pan_card_img: String
      cdate: String
      ctime: String
      udate: String
      utime: String
    ): user_management

    deleteUserManagementData(z_id: String!): user_management

    verifyOtp(userid: String!, otp: String!): LoginResponse!
  }
`;

export default userDataType;
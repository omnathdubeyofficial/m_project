import { gql } from 'graphql-tag';

const securityType = gql`
  # User type definition
  type securityTypes {
    z_id : String
    security_id : String
    first_name : String
    last_name : String
    address : String
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
    getSecurity: [securityTypes]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createSecurity(security_id : String, first_name : String, last_name : String, address : String, adhar_num : String, pan_num : String, gender : String, contact_num : String, email : String, date_of_birth : String, age : String,qualification : String, s_date : String, profile_img : String, adhar_img : String, pan_img : String): securityTypes

    updateSecurity(z_id : String, security_id : String, first_name : String, last_name : String, address : String, adhar_num : String, pan_num : String, gender : String, contact_num : String, email : String, date_of_birth : String, age : String,qualification : String,s_date : String, profile_img : String, adhar_img : String, pan_img : String): securityTypes

    deleteSecurity(z_id : String): securityTypes
  }
`;

export default securityType;

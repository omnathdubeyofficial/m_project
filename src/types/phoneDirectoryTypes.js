import { gql } from 'graphql-tag';

const phoneDirectoryType = gql`
  # User type definition
  type phoneDirectoryTypes {
    z_id : String
    full_name : String
    contact_no : String
    whatsapp_no : String
    email : String
    profession : String
    status : String
    cdate : String
    ctime : String
    udate : String
    utime : String
    success_msg : String
    error_msg : String
  }

  # Query type for fetching users
  type Query {
    getPhoneDirectory: [phoneDirectoryTypes]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createPhoneDirectory(full_name : String, contact_no : String, whatsapp_no : String, email : String, profession : String, status : String): phoneDirectoryTypes

    updatePhoneDirectory(z_id : String, full_name : String, contact_no : String, whatsapp_no : String, email : String, profession : String, status : String): phoneDirectoryTypes

    deletePhoneDirectory(z_id : String): phoneDirectoryTypes
  }
`;

export default phoneDirectoryType;

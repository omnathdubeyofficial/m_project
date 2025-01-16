import { gql } from 'graphql-tag';

const adminDataType = gql`
  # Admin type definition
  type Admin {
    z_id: String
    name: String
    email: String
    age: String
  }

  # Query type for fetching admin data
  type Query {
    getAdminData: [Admin]
  }

  # Mutation types for creating, updating, and deleting admin
  type Mutation {
    createAdminData(z_id: String, name: String, email: String, age: String): Admin
    updateAdminData(z_id: String, name: String, email: String, age: String): Admin
    deleteAdminData(z_id: String): Admin
  }
`;

export default adminDataType;

import { gql } from 'graphql-tag';

const userDataType = gql`
  # User type definition
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
  }

  # Query type for fetching users
  type Query {
    getUsersData: [User]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createUserData(name: String!, email: String!, age: Int!): User
    updateUserData(id: ID!, name: String!, email: String!, age: Int!): User
    deleteUserData(id: ID!): User
  }
`;

export default userDataType;

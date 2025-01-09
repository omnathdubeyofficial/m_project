import { gql } from 'graphql-tag';

const userType = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
  }

  type Query {
    getUsers: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int!): User
  }
`;

export default userType;  

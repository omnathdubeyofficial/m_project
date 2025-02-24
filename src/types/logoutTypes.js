import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Mutation {
    logout: LogoutResponse
  }

  type LogoutResponse {
    message: String
  }

`;

export default typeDefs;

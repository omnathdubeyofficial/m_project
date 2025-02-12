import { gql } from '@apollo/client';

export const GET_USERS_DATA = gql`
  query {
    getUsersData {
      id
      name
      email
      age
    }
  }
`;

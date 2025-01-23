import { gql } from '@apollo/client';

export const GET_LOGIN_DATA = gql`
  query($userid : String, $password : String) {
    login ( userid : $userid, password : $password){
      userid 
      password
    }
  }
`;

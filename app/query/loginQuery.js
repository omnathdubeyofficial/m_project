
export const GET_LOGIN_DATA = `
query Login($userid: String!, $password: String!) {
  login(userid: $userid, password: $password) {
    success_msg
    error_msg
  }
}
`;

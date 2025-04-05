import { gql } from 'graphql-tag';

const userDataType = gql`
type ForgetPasswordResponse {
  success_msg: String
  error_msg: String
}

type Mutation {
    sendOtpForPasswordReset(userid: String, email: String): ForgetPasswordResponse
  verifyOtpAndResetPassword(userid: String, otp: String, newPassword: String): ForgetPasswordResponse
}

`;

export default userDataType;

export const VERIFY_OTP_MUTATION = `
mutation VerifyOtp($userid: String!, $otp: String!) {
  verifyOtp(userid: $userid, otp: $otp) {
    success_msg
    error_msg
    token
  }
}
`;

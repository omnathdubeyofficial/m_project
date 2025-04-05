export const SEND_OTP_FOR_PASSWORD_RESET = `
mutation sendOtpForPasswordReset($userid: String!, $email: String!) {
  sendOtpForPasswordReset(userid: $userid, email: $email) {
    success_msg
    error_msg
  }
}

`;
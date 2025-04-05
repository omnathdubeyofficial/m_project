
export const VERIFY_OTP_AND_RESET_PASSWORD = `
mutation verifyOtpAndResetPassword($userid: String!, $otp: String!, $newPassword: String!) {
  verifyOtpAndResetPassword(userid: $userid, otp: $otp, newPassword: $newPassword) {
    success_msg
    error_msg
  }
}

`;
export const DELETE_PHONE_DIRECTORY_MUTATION = `
   mutation deletePhoneDirectory($z_id: String) {
    deletePhoneDirectory(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
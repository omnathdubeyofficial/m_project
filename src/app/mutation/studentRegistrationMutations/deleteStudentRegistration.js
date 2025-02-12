export const DELETE_USER_MANAGEMENT_DATA_MUTATION = `
   mutation deleteStudentRegistration($z_id: String) {
    deleteStudentRegistration(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
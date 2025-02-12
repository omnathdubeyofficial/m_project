export const DELETE_USER_MANAGEMENT_DATA_MUTATION = `
   mutation deleteUserManagementData($z_id: String) {
    deleteUserManagementData(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
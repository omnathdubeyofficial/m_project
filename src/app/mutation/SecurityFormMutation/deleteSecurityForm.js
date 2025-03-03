export const DELETE_SECURITY_FORM_MUTATION = `
   mutation deleteSecurityList($z_id: String) {
    deleteSecurityList(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
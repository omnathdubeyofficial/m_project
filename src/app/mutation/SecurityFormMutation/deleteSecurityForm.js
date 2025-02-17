export const DELETE_SECURITY_FORM_MUTATION = `
   mutation deleteSecurity($z_id: String) {
    deleteSecurity(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
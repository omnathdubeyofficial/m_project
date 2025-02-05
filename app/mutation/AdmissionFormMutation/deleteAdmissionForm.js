export const DELETE_ADMISSION_FORM_MUTATION = `
   mutation deleteAdmissionForm($z_id: String) {
    deleteAdmissionForm(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
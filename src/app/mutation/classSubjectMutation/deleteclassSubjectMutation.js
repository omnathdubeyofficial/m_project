export const DELETE_CLASS_SUBJECTS_MUTATION = `
   mutation deleteClassSubject($z_id: String) {
    deleteClassSubject(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
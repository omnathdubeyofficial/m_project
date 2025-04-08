export const DELETE_STUDENT_RATING_MUTATION = `
   mutation deleteStudentRating($z_id: String) {
    deleteStudentRating(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
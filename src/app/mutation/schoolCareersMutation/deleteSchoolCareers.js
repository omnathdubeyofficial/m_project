export const DELETE_SCHOOL_CAREER_MUTATION = `
  mutation deleteSchoolCareer($z_id: String!) {
    deleteSchoolCareer(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;

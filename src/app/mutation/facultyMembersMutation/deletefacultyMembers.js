export const DELETE_FACULTY_MUTATION = `
  mutation deleteFaculty($z_id: String!) {
    deleteFaculty(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;

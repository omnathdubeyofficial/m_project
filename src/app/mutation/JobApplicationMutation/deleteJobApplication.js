export const DELETE_JOB_APPLICATION_MUTATION = `
  mutation deleteApplication($z_id: String!) {
    deleteApplication(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;

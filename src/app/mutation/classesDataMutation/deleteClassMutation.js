export const DELETE_CLASS_DATA_MUTATION = `
   mutation deleteClassesData($z_id: String) {
    deleteClassesData(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
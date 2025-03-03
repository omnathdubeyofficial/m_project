export const DELETE_DRIVERS_LIST_MUTATION = `
   mutation deleteDriverList($z_id: String) {
    deleteDriverList(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
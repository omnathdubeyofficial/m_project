export const DELETE_DRIVERS_LIST_MUTATION = `
   mutation deleteDriverLists($z_id: String) {
    deleteDriverLists(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
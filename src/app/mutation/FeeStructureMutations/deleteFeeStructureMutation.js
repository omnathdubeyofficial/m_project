export const DELETE_FEE_STRUCTURE_LIST_MUTATION = `
   mutation deleteFeeStructureList($z_id: String) {
    deleteFeeStructureList(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
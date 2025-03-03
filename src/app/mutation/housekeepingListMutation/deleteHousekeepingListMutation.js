export const DELETE_HOUSEKEEPING_LIST_MUTATION = `
   mutation deleteHouseKeepingList($z_id: String) {
    deleteHouseKeepingList(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
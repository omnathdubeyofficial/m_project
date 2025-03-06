export const DELETE_EVENT_LIST_MUTATION = `
   mutation deleteEventList($z_id: String) {
    deleteEventList(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
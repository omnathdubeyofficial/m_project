export const DELETE_EVENT_REGISTRATION_LIST_MUTATION = `
   mutation deleteEventRegistrationList($z_id: String) {
    deleteEventRegistrationList(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
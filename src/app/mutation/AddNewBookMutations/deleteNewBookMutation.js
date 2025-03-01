export const DELETE_DRIVERS_LIST_MUTATION = `
   mutation deleteNewBook($z_id: String) {
    deleteNewBook(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
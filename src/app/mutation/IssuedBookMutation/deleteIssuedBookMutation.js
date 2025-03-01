export const DELETE_ISSUED_BOOK_MUTATION = `
   mutation deleteIssuedBook($z_id: String) {
    deleteIssuedBook(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
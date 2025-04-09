export const DELETE_Parent_RATING_MUTATION = `
   mutation deleteParentRating($z_id: String) {
    deleteParentRating(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
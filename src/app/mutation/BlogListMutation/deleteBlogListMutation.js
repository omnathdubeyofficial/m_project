export const DELETE_BLOG_LIST_MUTATION = `
   mutation deleteBlogList($z_id: String) {
    deleteBlogList(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
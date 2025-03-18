export const DELETE_NOTICE_BOARD_MUTATION = `
   mutation deleteNoticeBoardLists($z_id: String) {
    deleteNoticeBoardLists(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
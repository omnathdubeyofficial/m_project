
export const CREATE_NOTICE_BOARD_MUTATION = `
  mutation createNoticeBoardLists($title : String, $description : String, $notice_date : String, $expiry_date : String, $category : String, $issued_by : String, $audience : String, $attachments : String ) {
    createNoticeBoardLists(title : $title, description : $description, notice_date : $notice_date, expiry_date : $expiry_date, category : $category, issued_by : $issued_by, audience : $audience, attachments : $attachments) {
      z_id
    notice_id
    title
    description
    notice_date
    expiry_date
    category
    issued_by
    audience
    attachments
    status
      cdate
    ctime
    udate
    utime
      success_msg
      error_msg
    }
  }
`;

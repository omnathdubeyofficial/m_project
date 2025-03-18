export const GET_NOTICE_BOARD_LISTS = `
query {
    getNoticeBoardLists {
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
    }
  }
`;
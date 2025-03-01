export const GET_ISSUED_BOOKS_DATA = `
query {
    getIssuedBook {
      z_id
     book_id
    student_id
    teacher_id
    guest_id
    issued_by
    issue_date
    issue_time
    due_date
    return_date
    return_time
    status
    fine_amount
    remarks
    cdate
    ctime
    udate
    utime
    }
  }
`;
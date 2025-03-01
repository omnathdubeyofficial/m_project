export const UPDATE_ISSUED_BOOK_MUTATION = `
mutation  updateIssuedBook( $z_id: String, $book_id : String, $student_id : String,$teacher_id : String,$guest_id: String, $issued_by : String, $issue_date : String, $issue_time : String, $due_date : String, $return_date : String, $return_time : String, $status : String, $fine_amount : String, $remarks : String) {
     updateIssuedBook( z_id: $z_id, book_id : $book_id, student_id : $student_id, teacher_id : $teacher_id, guest_id : $guest_id,issued_by : $issued_by, issue_date : $issue_date, issue_time : $issue_time, due_date : $due_date, return_date : $return_date, return_time : $return_time, status : $status, fine_amount : $fine_amount, remarks : $remarks) {
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
    success_msg
    error_msg
    }
  }
    `;
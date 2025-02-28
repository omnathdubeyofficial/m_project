
export const CREATE_ACADEMIC_CALENDAR_MUTATION = `
  mutation createAcademicCalendar($program : String, $from_date : String, $to_date : String, $start_time : String, $end_time : String, $program_details : String, $pdf_file : String, $host : String ) {
    createAcademicCalendar(program : $program, from_date : $from_date, to_date : $to_date, start_time : $start_time, end_time : $end_time, program_details : $program_details, pdf_file : $pdf_file, host : $host) {
      z_id
    program
    from_date
    to_date
    start_time
    end_time
    program_details
    pdf_file
    host
      cdate
    ctime
    udate
    utime
      success_msg
      error_msg
    }
  }
`;

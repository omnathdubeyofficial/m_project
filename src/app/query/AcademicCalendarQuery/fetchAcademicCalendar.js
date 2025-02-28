export const GET_ACADEMIC_CALENDAR_DATA = `
query {
    getAcademicCalendar {
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
    }
  }
`;
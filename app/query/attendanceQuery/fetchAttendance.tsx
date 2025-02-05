export const GET_ATTENDANCE_DATA = `
query {
    getAttendanceData {
      z_id
    student_name
    roll_no
    date
    time_out
    time_in
    subject
    attendance_status
    attendance_marked_by
    cdate
    ctime
    udate
    utime
    }
  }
`;
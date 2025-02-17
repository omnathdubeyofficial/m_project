export const CREATE_ATTENDANCE_DATA_MUTATION = `
  mutation createAttendanceData(
    $student_name : String,$date : String, $roll_no : String, $standard : String, $division : String, $subject : String, $time_in : String, $time_out : String, $attendance_status : String, $attendance_marked_by : String, $attendance_marked_by_role : String) {
    createAttendanceData(
      student_name: $student_name, date: $date, roll_no: $roll_no, standard: $standard,division: $division, subject: $subject, time_in: $time_in, time_out: $time_out,attendance_status: $attendance_status, attendance_marked_by: $attendance_marked_by, attendance_marked_by_role : $attendance_marked_by_role
    ) {
      z_id
      student_name
      date
      roll_no
      standard
      division
      subject
      time_in
      time_out
      attendance_status
      attendance_marked_by
      attendance_marked_by_role
      success_msg
      error_msg
    }
  }
`;

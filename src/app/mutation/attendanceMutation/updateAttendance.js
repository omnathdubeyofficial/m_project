export const UPDATE_ATTENDANCE_DATA_MUTATION = `
  mutation updateAttendanceData($z_id : String,$student_name : String,$date : String, $roll_no : String, $standard : String, $division : String, $subject : String, $time_out : String, $attendance_status : String, $attendance_marked_by : String, $attendance_marked_by_role : String) {
    updateAttendanceData(
      z_id : $z_id, student_name: $student_name, date: $date, roll_no: $roll_no, standard: $standard,division: $division, subject: $subject,time_out: $time_out,attendance_status: $attendance_status, attendance_marked_by: $attendance_marked_by, attendance_marked_by_role : $attendance_marked_by_role
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

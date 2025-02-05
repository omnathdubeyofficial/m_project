export const UPDATE_ATTENDANCE_DATA_MUTATION = `
  mutation updateAttendanceData($z_id : String,$student_name : String,$date : String, $roll_no : String, $standard : String, $division : String, $subject : String, $time_in : String, $time_out : String, $attendance_status : String, $attendance_marked_by : String) {
    updateAttendanceData(
      z_id : $z_id, student_name: $student_name, date: $date, roll_no: $roll_no, standard: $standard,division: $division, subject: $subject, time_in: $time_in, time_out: $time_out,attendance_status: $attendance_status, attendance_marked_by: $attendance_marked_by
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
      success_msg
      error_msg
    }
  }
`;

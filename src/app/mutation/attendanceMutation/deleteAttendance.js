export const DELETE_ATTENDANCE_DATA_MUTATION = `
   mutation deleteAttendanceData($z_id: String) {
    deleteAttendanceData(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
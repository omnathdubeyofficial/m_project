export const DELETE_ACADEMIC_CALENDAR_MUTATION = `
   mutation deleteAcademicCalendar($z_id: String) {
    deleteAcademicCalendar(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
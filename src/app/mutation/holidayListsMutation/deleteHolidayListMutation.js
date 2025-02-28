export const DELETE_HOLIDAY_LIST_MUTATION = `
   mutation deleteHolidayLists($z_id: String) {
    deleteHolidayLists(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;
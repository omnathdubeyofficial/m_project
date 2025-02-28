export const UPDATE_HOLIDAY_LIST_MUTATION = `
mutation  updateHolidayLists( $z_id: String, $from_date : String, $to_date : String, $day : String, $holiday_name : String, $details : String) {
     updateHolidayLists( z_id: $z_id, from_date : $from_date, to_date : $to_date, day : $day, holiday_name : $holiday_name, details : $details) {
      z_id
    from_date
     to_date
     day
     holiday_name
     details
    cdate
    ctime
    udate
    utime
    success_msg
    error_msg
    }
  }
    `;
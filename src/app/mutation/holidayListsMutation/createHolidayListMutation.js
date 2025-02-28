
export const CREATE_HOLIDAY_LIST_MUTATION = `
  mutation createHolidayLists($from_date : String, $to_date : String, $day : String, $holiday_name : String, $details : String ) {
    createHolidayLists(from_date : $from_date, to_date : $to_date, day : $day, holiday_name : $holiday_name, details : $details) {
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

export const GET_HOLIDAY_LISTS_DATA = `
query {
    getHolidayLists {
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
    }
  }
`;
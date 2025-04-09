export const GET_PARENT_RATING_DATA = `
query {
    getParentRatings {
         z_id
       first_name
          middle_name
          last_name
          userid
          review
          rating
    cdate
    ctime
    udate
    utime
    success_msg
    error_msg
    }
  }
`;
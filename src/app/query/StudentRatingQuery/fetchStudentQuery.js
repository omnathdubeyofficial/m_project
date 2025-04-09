export const GET_STUDENT_RATING_DATA = `
query {
    getStudentRatings {
         z_id
       first_name
          middle_name
          last_name
          userid
          review
          rating
          class_assigned
    cdate
    ctime
    udate
    utime
    success_msg
    error_msg
    }
  }
`;
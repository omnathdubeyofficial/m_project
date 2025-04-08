
export const CREATE_STUDENT_RATING_MUTATION = `
  mutation createStudentRating($middle_name : String, $first_name : String ) {
    createStudentRating(middle_name : $middle_name,  first_name : $first_name, last_name : $last_name, userid : $userid, review: $review , rating: $rating ) {
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

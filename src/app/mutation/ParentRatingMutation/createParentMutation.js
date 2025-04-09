
export const CREATE_PARENT_RATING_MUTATION = `
  mutation createParentRating($middle_name : String, $first_name : String, $ last_name : String,  $userid : String,
          $review : String,
          $rating : String ) {
    createParentRating(middle_name : $middle_name,  first_name : $first_name, last_name : $last_name, userid : $userid, review: $review , rating: $rating ) {
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


export const CREATE_PARENT_RATING_MUTATION = `
  mutation createParentRating($class_assigned: String, $middle_name : String, $first_name : String, $ last_name : String,  $userid : String,
          $review : String,
          $rating : String ) {
    createParentRating(class_assigned : $class_assigned, middle_name : $middle_name,  first_name : $first_name, last_name : $last_name, userid : $userid, review: $review , rating: $rating ) {
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

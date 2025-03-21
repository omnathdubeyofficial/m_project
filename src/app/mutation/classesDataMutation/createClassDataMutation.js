
export const CREATE_CLASS_DATA_MUTATION = `
  mutation createClassesData($class_title : String, $description : String, $tags : String, $image : String, $student_rating : String, $student_reviews : String, $parents_rating : String, $parents_reviews : String, $discount : String, $is_admission : String, $total_seats : String, $filled_seats : String ) {
    createClassesData(class_title : $class_title, description : $description, tags : $tags, image : $image, student_rating : $student_rating, student_reviews : $student_reviews, parents_rating : $parents_rating, parents_reviews : $parents_reviews, discount : $discount, is_admission : $is_admission, total_seats : $total_seats, filled_seats : $filled_seats) {
      z_id
    classes_id
    class_title
    description
    tags
    image
    student_rating
    student_reviews
    parents_rating
    parents_reviews
    discount
    is_admission
    total_seats
    filled_seats
      cdate
    ctime
    udate
    utime
      success_msg
      error_msg
    }
  }
`;

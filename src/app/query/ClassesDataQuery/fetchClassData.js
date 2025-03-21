export const GET_CLASS_LIST_DATA = `
query {
    getClassesDataList {
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
    }
  }
`;
import { gql } from 'graphql-tag';

const studentRatingType = gql`
  # Student Rating Type Definition
  type studentRatingTypes {
    z_id: String
    first_name: String
    middle_name: String
    last_name: String
    userid: String
    review: String
    class_assigned: String
    rating: String
    cdate: String
    ctime: String
    udate: String
    utime: String
    success_msg: String
    error_msg: String
  }

  # Query to fetch student ratings
  type Query {
    getStudentRatings: [studentRatingTypes]
  }

  # Mutations for create, update, and delete operations
  type Mutation {
    createStudentRating(
      first_name: String
      middle_name: String
      class_assigned: String
      last_name: String
      userid: String
      review: String
      rating: String
    ): studentRatingTypes

    updateStudentRating(
      z_id: String
      first_name: String
      middle_name: String
      class_assigned: String
      last_name: String
      userid: String
      review: String
      rating: String
    ): studentRatingTypes

    deleteStudentRating(z_id: String): studentRatingTypes
  }
`;

export default studentRatingType;

import { gql } from 'graphql-tag';

const ParentRatingType = gql`
  # Parent Rating Type Definition
  type ParentRatingTypes {
    z_id: String
    first_name: String
    middle_name: String
    last_name: String
    userid: String
    class_assigned: String
    review: String
    rating: String
    cdate: String
    ctime: String
    udate: String
    utime: String
    success_msg: String
    error_msg: String
  }

  # Query to fetch Parent ratings
  type Query {
    getParentRatings: [ParentRatingTypes]
  }

  # Mutations for create, update, and delete operations
  type Mutation {
    createParentRating(
      first_name: String
      middle_name: String
      last_name: String
      class_assigned: String
      userid: String
      review: String
      rating: String
    ): ParentRatingTypes

    updateParentRating(
      z_id: String
      first_name: String
      middle_name: String
      last_name: String
      class_assigned: String
      userid: String
      review: String
      rating: String
    ): ParentRatingTypes

    deleteParentRating(z_id: String): ParentRatingTypes
  }
`;

export default ParentRatingType;

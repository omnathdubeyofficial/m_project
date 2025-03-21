import { gql } from 'graphql-tag';

const classesDataType = gql`
  # User type definition
  type classesDataTypes {
    z_id : String
    classes_id : String
    class_title : String
    description : String
    tags : String
    image : String
    student_rating : String
    student_reviews : String
    parents_rating : String
    parents_reviews : String
    discount : String
    is_admission : String
    total_seats : String
    filled_seats : String
    cdate : String
    ctime : String
    udate : String
    utime : String
    success_msg : String
    error_msg : String
  }

  # Query type for fetching users
  type Query {
    getClassesDataList: [classesDataTypes]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createClassesData(class_title : String, description : String, tags : String, image : String, student_rating : String, student_reviews : String, parents_rating : String, parents_reviews : String, discount : String, is_admission : String, total_seats : String, filled_seats : String): classesDataTypes

    updateClassesData(z_id : String, class_title : String, description : String, tags : String, image : String, student_rating : String, student_reviews : String, parents_rating : String, parents_reviews : String, discount : String, is_admission : String, total_seats : String, filled_seats : String): classesDataTypes

    deleteClassesData(z_id : String): classesDataTypes
  }
`;

export default classesDataType;

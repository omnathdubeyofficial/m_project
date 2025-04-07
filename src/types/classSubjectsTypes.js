import { gql } from 'graphql-tag';

const classSubjectsType = gql`
  # Class Subject Type Definition
  type classSubjectsTypes {
    z_id: String
    class_name: String
    subject_name: String
    cdate: String
    ctime: String
    udate: String
    utime: String
    success_msg: String
    error_msg: String
  }

  # Query for fetching all class subjects
  type Query {
    getClassSubjects: [classSubjectsTypes]
  }

  # Mutation types for creating, updating, and deleting class subjects
  type Mutation {
    createClassSubject(class_name: String, subject_name: String): classSubjectsTypes

    updateClassSubject(z_id: String, class_name: String, subject_name: String): classSubjectsTypes

    deleteClassSubject(z_id: String): classSubjectsTypes
  }
`;

export default classSubjectsType;

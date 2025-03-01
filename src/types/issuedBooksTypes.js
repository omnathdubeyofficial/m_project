import { gql } from 'graphql-tag';

const issuedBookType = gql`
  # User type definition
  type issuedBookTypes {
    z_id : String
    book_id : String
    student_id : String
    teacher_id : String
  guest_id: String,
    issued_by : String
    issue_date : String
    issue_time : String
    due_date : String
    return_date : String
    return_time : String
    status : String
    fine_amount : String
    remarks : String
    cdate : String
    ctime : String
    udate : String
    utime : String
    success_msg : String
    error_msg : String
  }

  # Query type for fetching users
  type Query {
    getIssuedBook: [issuedBookTypes]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createIssuedBook(book_id : String, student_id : String,teacher_id : String,
  guest_id: String, issued_by : String, issue_date : String, issue_time : String, due_date : String, return_date : String, return_time : String, status : String, fine_amount : String, remarks : String): issuedBookTypes

    updateIssuedBook(z_id : String, book_id : String,student_id : String,teacher_id : String,guest_id: String, issued_by : String, issue_date : String, issue_time : String, due_date : String, return_date : String, return_time : String, status : String, fine_amount : String, remarks : String): issuedBookTypes

    deleteIssuedBook(z_id : String): issuedBookTypes
  }
`;

export default issuedBookType;

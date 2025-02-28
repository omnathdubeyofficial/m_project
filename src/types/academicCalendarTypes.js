import { gql } from 'graphql-tag';

const academicCalendarType = gql`
  # User type definition
  type academicCalendarTypes {
    z_id : String
    program : String
    from_date : String
    to_date : String
    start_time : String
    end_time : String
    program_details : String
    pdf_file : String
    host : String
    cdate : String
    ctime : String
    udate : String
    utime : String
    success_msg : String
    error_msg : String
  }

  # Query type for fetching users
  type Query {
    getAcademicCalendar: [academicCalendarTypes]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createAcademicCalendar(program : String, from_date : String, to_date : String, start_time : String, end_time : String, program_details : String, pdf_file : String, host : String): academicCalendarTypes

    updateAcademicCalendar(z_id : String, program : String, from_date : String, to_date : String, start_time : String, end_time : String, program_details : String, pdf_file : String, host : String): academicCalendarTypes

    deleteAcademicCalendar(z_id : String): academicCalendarTypes
  }
`;

export default academicCalendarType;

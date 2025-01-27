import { gql } from 'graphql-tag';

const attendanceType = gql`
  # User type definition
  type attendancesType {
    z_id: String
    student_name: String
    date: String
    roll_no: String
    standard: String
    division : String
    subject : String
    time_in : String
    time_out : String
    attendance_status : String
    attendance_marked_by : String
    cdate : String
    ctime : String
    udate : String
    utime : String
    success_msg : String,
    error_msg : String
  }

  # Query type for fetching users
  type Query {
    getAttendanceData: [attendancesType]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createAttendanceData(student_name: String, date : String, roll_no : String, standard: String, division : String, subject : String, time_in : String, time_out : String, attendance_status : String, attendance_marked_by : String,cdate : String, ctime : String): attendancesType

    updateAttendanceData(z_id : String, student_name: String, date : String, roll_no : String, standard: String, division : String, subject : String, time_in : String, time_out : String, attendance_status : String, attendance_marked_by : String,cdate : String, ctime : String, udate : String, utime : String): attendancesType

    deleteAttendanceData(z_id: String): attendancesType
  }
`;

export default attendanceType;

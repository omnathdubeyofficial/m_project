import { gql } from 'graphql-tag';

const attendanceType = gql`
  # Attendance type definition
  type Attendance {
    z_id: String
    student_name: String
    date: String
    roll_no: String
    standard: String
    division: String
    subject: String
    time_in: String
    time_out: String
    attendance_status: String
    attendance_marked_by: String
    cdate: String
    ctime: String
    udate: String
    utime: String
    success_msg: String
    error_msg: String
  }

  # Query type for fetching attendance data
  type Query {
    getAttendanceData: [Attendance]
  }

  # Mutation types for creating, updating, and deleting attendance data
  type Mutation {
    createAttendanceData(
      student_name: String,date: String,roll_no: String,standard: String,division: String,subject: String, time_in: String, time_out: String, attendance_status: String, attendance_marked_by: String, cdate: String, ctime: String
    ): Attendance

    updateAttendanceData(
      z_id: String, student_name: String, date: String, roll_no: String,standard: String, division: String, subject: String, time_in: String, time_out: String, attendance_status: String, attendance_marked_by: String, udate: String, utime: String): Attendance

    deleteAttendanceData(z_id: String): Attendance
  }
`;

export default attendanceType;

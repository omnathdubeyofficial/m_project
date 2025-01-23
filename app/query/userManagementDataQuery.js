import { gql } from '@apollo/client';

export const GET_USER_MANAGEMENT_DATA = gql`
  query {
    getUserManagementData {
      z_id
      first_name
      middle_name
      last_name
      gender
      email
      password
      contact_no
      role
      status
      subject_specialization
      class_assigned
      teacher_id
      admin_id
      joining_date
      qualification
      enrollment_no
      date_of_birth
      standard
      section
      parent_id
      admission_date
      children_id
      occupation
      address
      nationality
      cdate
      ctime
      udate
      utime
    }
  }
`;

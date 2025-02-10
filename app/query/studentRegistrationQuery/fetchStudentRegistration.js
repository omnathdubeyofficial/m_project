export const GET_STUDENT_REGISTRATION_DATA = `
query {
    getStudentRegistration {
      z_id
    first_name
    middle_name
    last_name
    student_id
    adhar_no
    gender
    email
    date_of_birth
    contact_no
    address
    previous_school
    highest_qualification
    percentage
    entrance_exam_score
    parent_name
    parent_contact_no
    parent_email
    relationship
    profile_image
    cdate
    ctime
    udate
    utime
    }
  }
`;
export const GET_CLASS_SUBJECTS_DATA = `
query {
    getClassSubjects {
    z_id
    class_name
    subject_name
    cdate
    ctime
    udate
    utime
    success_msg
    error_msg
    }
  }
`;
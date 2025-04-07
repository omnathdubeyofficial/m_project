
export const CREATE_CLASS_SUBJECTS_MUTATION = `
  mutation createClassSubject($class_name : String, $subject_name : String ) {
    createClassSubject(class_name : $class_name,  subject_name : $subject_name) {
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

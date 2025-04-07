
export const UPDATE_CLASS_SUBJECTS_MUTATION = `
  mutation updateClassSubject($class_name : String, $subject_name : String ) {
    updateClassSubject(class_name : $class_name,  subject_name : $subject_name) {
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
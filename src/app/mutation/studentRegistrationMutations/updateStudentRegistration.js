export const UPDATE_STUDENT_REGISTRATION_MUTATION = `
mutation  updateStudentRegistration( $z_id: String, $first_name: String, $middle_name: String, $last_name: String, $gender : String, $student_id : String, $email : String, $contact_no : String, $date_of_birth : String, $adhar_no : String, $address : String, $previous_school : String, $highest_qualification : String, $percentage : String, $entrance_exam_score : String, $parent_name : String , $parent_contact_no : String, $parent_email : String, $relationship : String, $profile_image : String) {
     updateStudentRegistration( z_id: $z_id, first_name: $first_name, middle_name: $middle_name, last_name: $last_name, gender : $gender, student_id : $student_id, email : $email, contact_no : $contact_no, date_of_birth : $date_of_birth, adhar_no : $adhar_no, address : $address, previous_school : $previous_school, highest_qualification : $highest_qualification, percentage : $percentage, entrance_exam_score : $entrance_exam_score, parent_name : $parent_name , parent_contact_no : $parent_contact_no, parent_email : $parent_email, relationship : $relationship, profile_image : $profile_image) {
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
    success_msg
    error_msg
    }
  }
    `;
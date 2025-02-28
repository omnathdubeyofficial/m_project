export const UPDATE_USER_MANAGEMENT_DATA_MUTATION = `
mutation  updateUserManagementData( $z_id: String, $first_name: String, $middle_name: String, $last_name: String, $gender : String, $email : String, $password : String, $contact_no : String, $role : String, $status : String, $subject_specialization : String, $class_assigned : String, $teacher_id : String, $admin_id : String, $joining_date : String, $qualification : String, $enrollment_no : String, $date_of_birth : String $standard : String, $section : String, $parent_id : String, $admission_date : String, $children_id : String, $occupation : String, $address : String, $nationality : String, $profile_img : String) {
     updateUserManagementData( z_id: $z_id, first_name: $first_name, middle_name: $middle_name, last_name: $last_name, gender : $gender, email : $email, password : $password, contact_no : $contact_no, role : $role, status : $status, subject_specialization : $subject_specialization, class_assigned : $class_assigned, teacher_id : $teacher_id, admin_id : $admin_id, joining_date : $joining_date, qualification : $qualification, enrollment_no : $enrollment_no, date_of_birth : $date_of_birth, standard : $standard, section : $section, parent_id : $parent_id, admission_date : $admission_date, children_id : $children_id, occupation: $occupation, address : $address, nationality : $nationality, profile_img : $profile_img) {
      z_id
      first_name
      middle_name
      last_name
      gender
      email
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
      success_msg
      error_msg
      profile_img
    }
  }
    `;
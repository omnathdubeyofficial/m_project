export const UPDATE_PHONE_DIRECTORY_MUTATION = `
mutation  updatePhoneDirectory( $z_id: String, $full_name : String, $contact_no : String, $whatsapp_no : String, $email : String, $profession : String, $status : String) {
     updatePhoneDirectory( z_id: $z_id, full_name : $full_name, contact_no : $contact_no, whatsapp_no : $whatsapp_no, email : $email, profession : $profession, status : $status) {
      z_id
    full_name
    contact_no
    whatsapp_no
    email
    profession
    status
    cdate
    ctime
    udate
    utime
    success_msg
    error_msg
    }
  }
    `;
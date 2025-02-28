
export const CREATE_PHONE_DIRECTORY_MUTATION = `
  mutation createPhoneDirectory($full_name : String, $contact_no : String, $whatsapp_no : String, $email : String, $profession : String, $status : String ) {
    createPhoneDirectory(full_name : $full_name, contact_no : $contact_no, whatsapp_no : $whatsapp_no, email : $email, profession : $profession, status : $status) {
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

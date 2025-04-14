export const UPDATE_JOB_APPLICATION_MUTATION = `
  mutation updateApplication(
    $z_id: String!
    $full_name: String
    $email: String
    $phone_number: String
    $whatsapp_number: String
    $position_applied_for: String
    $cover_letter: String
    $resume_pdf: String
  ) {
    updateApplication(
      z_id: $z_id
      full_name: $full_name
      email: $email
      phone_number: $phone_number
      whatsapp_number: $whatsapp_number
      position_applied_for: $position_applied_for
      cover_letter: $cover_letter
      resume_pdf: $resume_pdf
    ) {
      z_id
      full_name
      email
      phone_number
      whatsapp_number
      position_applied_for
      cover_letter
      resume_pdf
      cdate
      ctime
      udate
      utime
      success_msg
      error_msg
    }
  }
`;

export const GET_JOB_APPLICATIONS_DATA = `
  query {
    getAllApplications {
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
    }
  }
`;

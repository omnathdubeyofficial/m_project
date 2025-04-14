export const GET_ALL_FACULTY_QUERY = `
  query {
    getAllFaculty {
      z_id
      full_name
      profession
      qualification
      experience
      department
      facebook_link
      instagram_link
      youtube_link
      linkedin_link
      x_link
      profile_image
      cdate
      ctime
      udate
      utime
    }
  }
`;

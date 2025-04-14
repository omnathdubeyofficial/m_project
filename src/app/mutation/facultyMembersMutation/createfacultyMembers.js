export const CREATE_FACULTY_MUTATION = `
  mutation createFaculty(
    $full_name: String,
    $profession: String,
    $qualification: String,
    $experience: String,
    $department: String,
    $facebook_link: String,
    $instagram_link: String,
    $youtube_link: String,
    $linkedin_link: String,
    $x_link: String,
    $profile_image: String
  ) {
    createFaculty(
      full_name: $full_name,
      profession: $profession,
      qualification: $qualification,
      experience: $experience,
      department: $department,
      facebook_link: $facebook_link,
      instagram_link: $instagram_link,
      youtube_link: $youtube_link,
      linkedin_link: $linkedin_link,
      x_link: $x_link,
      profile_image: $profile_image
    ) {
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
      success_msg
      error_msg
    }
  }
`;

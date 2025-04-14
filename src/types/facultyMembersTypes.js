import { gql } from 'graphql-tag';

const facultyType = gql`
  type FacultyType {
    z_id: String
    full_name: String
    profession: String
    qualification: String
    experience: String
    department: String
    facebook_link: String
    instagram_link: String
    youtube_link: String
    linkedin_link: String
    x_link: String
    profile_image: String
    cdate: String
    ctime: String
    udate: String
    utime: String
    success_msg: String
    error_msg: String
  }

  type Query {
    getAllFaculty: [FacultyType]
  }

  type Mutation {
    createFaculty(
      full_name: String,
      profession: String,
      qualification: String,
      experience: String,
      department: String,
      facebook_link: String,
      instagram_link: String,
      youtube_link: String,
      linkedin_link: String,
      x_link: String,
      profile_image: String
    ): FacultyType

    updateFaculty(
      z_id: String!,
      full_name: String,
      profession: String,
      qualification: String,
      experience: String,
      department: String,
      facebook_link: String,
      instagram_link: String,
      youtube_link: String,
      linkedin_link: String,
      x_link: String,
      profile_image: String
    ): FacultyType

    deleteFaculty(z_id: String!): FacultyType
  }
`;

export default facultyType;

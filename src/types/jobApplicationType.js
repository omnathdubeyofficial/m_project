import { gql } from 'graphql-tag';

const jobApplicationType = gql`
  type JobApplicationType {
    z_id: String
    full_name: String
    email: String
    phone_number: String
    whatsapp_number: String
    position_applied_for: String
    cover_letter: String
    resume_pdf: String
    cdate: String
    ctime: String
    udate: String
    utime: String
    success_msg: String
    error_msg: String
  }

  type Query {
    getAllApplications: [JobApplicationType]
  }

  type Mutation {
    applyForJob(
      full_name: String,
      email: String,
      phone_number: String,
      whatsapp_number: String,
      position_applied_for: String,
      cover_letter: String,
      resume_pdf: String
    ): JobApplicationType

    updateApplication(
      z_id: String!,
      full_name: String,
      email: String,
      phone_number: String,
      whatsapp_number: String,
      position_applied_for: String,
      cover_letter: String,
      resume_pdf: String
    ): JobApplicationType

    deleteApplication(z_id: String!): JobApplicationType
  }
`;

export default jobApplicationType;

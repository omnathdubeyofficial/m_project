import { gql } from 'graphql-tag';

const schoolCareerType = gql`
  type SchoolCareerType {
    z_id: String
    job_id: String
    position_title: String
    av_salary: String
    department: String
    required_qualification: String
    required_language: String
    required_experience: String
    employment_type: String
    number_of_vacancies: String
    required_work_time: String
    location: String
    job_description: String
    application_start: String
    application_deadline: String
    cdate: String
    ctime: String
    udate: String
    utime: String
    is_active: String
    success_msg: String
    error_msg: String
  }

  type Query {
    getSchoolCareers: [SchoolCareerType]
  }

  type Mutation {
    createSchoolCareer(
      position_title: String,
      av_salary: String,
      department: String,
      required_qualification: String,
      required_language: String,
      required_experience: String,
      employment_type: String,
      number_of_vacancies: String,
      required_work_time: String,
      location: String,
      job_description: String,
      application_start: String,
      application_deadline: String,
      is_active: String
    ): SchoolCareerType

    updateSchoolCareer(
      z_id: String!,
      position_title: String,
      av_salary: String,
      department: String,
      required_qualification: String,
      required_language: String,
      required_experience: String,
      employment_type: String,
      number_of_vacancies: String,
      required_work_time: String,
      location: String,
      job_description: String,
      application_start: String,
      application_deadline: String,
      is_active: String
    ): SchoolCareerType

    deleteSchoolCareer(z_id: String!): SchoolCareerType
  }
`;

export default schoolCareerType;

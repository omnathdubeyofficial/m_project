export const GET_SCHOOL_CAREER_DATA = `
  query {
    getSchoolCareers {
      z_id
      job_id
      position_title
      av_salary
      department
      required_qualification
      required_language
      required_experience
      employment_type
      number_of_vacancies
      required_work_time
      location
      job_description
      application_start
      application_deadline
      cdate
      ctime
      udate
      utime
      is_active
    }
  }
`;

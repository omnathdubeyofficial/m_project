export const CREATE_SCHOOL_CAREER_MUTATION = `
  mutation createSchoolCareer(
    $position_title: String,
    $av_salary: String,
    $department: String,
    $required_qualification: String,
    $required_language: String,
    $required_experience: String,
    $employment_type: String,
    $number_of_vacancies: String,
    $required_work_time: String,
    $location: String,
    $job_description: String,
    $application_start: String,
    $application_deadline: String
  ) {
    createSchoolCareer(
      position_title: $position_title,
      av_salary: $av_salary,
      department: $department,
      required_qualification: $required_qualification,
      required_language: $required_language,
      required_experience: $required_experience,
      employment_type: $employment_type,
      number_of_vacancies: $number_of_vacancies,
      required_work_time: $required_work_time,
      location: $location,
      job_description: $job_description,
      application_start: $application_start,
      application_deadline: $application_deadline
    ) {
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
      success_msg
      error_msg
    }
  }
`;

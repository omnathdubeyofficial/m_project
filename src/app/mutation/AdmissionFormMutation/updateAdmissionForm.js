export const UPDATE_ADMISSION_FORM_MUTATION = `
  mutation updateAdmissionForm($z_id : String,$student_name : String, $adhar_number : String, $pan_number : String, $email : String, $profile_img : String, $contact_number : String, $date_of_birth : String, $gender : String, $address : String, $city : String, $state : String, $pincode : String, $nationality : String, $course_applied : String, $education_qualification : String, $percentage : String, $bank_name : String, $bank_account_holder_name : String, $bank_branch : String, $account_number : String, $ifsc_code : String, $adhar_card_img : String, $pan_card_img : String, $prev_marksheet : String, $passbook : String, $guardian_name : String, $guardian_contact : String, $admission_status : String, $submission_date : String, $admission_fee : String) {
    updateAdmissionForm(
      z_id : $z_id, student_name : $student_name, adhar_number : $adhar_number, pan_number : $pan_number, email : $email, profile_img : $profile_img, contact_number : $contact_number, date_of_birth : $date_of_birth, gender : $gender, address : $address, city : $city, state : $state, pincode : $pincode, nationality : $nationality, course_applied : $course_applied, education_qualification : $education_qualification, percentage : $percentage, bank_name : $bank_name, bank_account_holder_name : $bank_account_holder_name, bank_branch : $bank_branch, account_number : $account_number, ifsc_code : $ifsc_code, adhar_card_img : $adhar_card_img, pan_card_img : $pan_card_img, prev_marksheet : $prev_marksheet, passbook : $passbook, guardian_name : $guardian_name, guardian_contact : $guardian_contact, admission_status : $admission_status, submission_date : $submission_date, admission_fee : $admission_fee
    ) {
      z_id
      student_name
      adhar_number
      pan_number
      email 
      profile_img 
      contact_number 
      date_of_birth 
      gender
      address 
      city
      state 
      pincode 
      nationality
      course_applied 
      education_qualification 
      percentage
      bank_name
      bank_account_holder_name
      bank_branch
      account_number 
      ifsc_code 
      adhar_card_img 
      pan_card_img
      prev_marksheet 
      passbook
      guardian_name
      guardian_contact 
      admission_status 
      submission_date
      admission_fee
      success_msg
      error_msg
    }
  }
`;

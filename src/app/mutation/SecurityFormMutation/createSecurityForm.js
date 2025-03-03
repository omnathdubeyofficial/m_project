
export const CREATE_SECURITY_FORM_MUTATION = `
  mutation createSecurityForm($first_name : String, $last_name : String, $adhar_num : String, $pan_num : String, $gender : String, $contact_num : String, $email : String, $date_of_birth : String, $age : String, $qualification : String, $profile_img : String, $adhar_img : String, $pan_img : String, $permanent_address : String, $current_address : String, $state : String, $pincode : String,$country : String, $city : String, $whatsapp_num : String, $bank_account_num : String, $bank_name : String, $account_holder_name : String, $bank_branch_name : String, $ifsc_code : String, $bank_passbook_img : String, $joining_date : String, $joining_salary : String, $current_salary : String, $previous_work_description : String ) {
    createSecurityForm(first_name : $first_name, last_name : $last_name, adhar_num : $adhar_num, pan_num : $pan_num,gender : $gender, contact_num : $contact_num, email : $email, date_of_birth : $date_of_birth, age : $age, qualification : $qualification,profile_img : $profile_img, adhar_img : $adhar_img, pan_img : $pan_img, permanent_address : $permanent_address, current_address : $current_address, state : $state, pincode : $pincode,country : $country, city : $city, whatsapp_num : $whatsapp_num, bank_account_num : $bank_account_num, bank_name : $bank_name, account_holder_name : $account_holder_name, bank_branch_name : $bank_branch_name, ifsc_code : $ifsc_code, bank_passbook_img : $bank_passbook_img, joining_date : $joining_date, joining_salary : $joining_salary, current_salary : $current_salary, previous_work_description : $previous_work_description) {
      z_id
    security_id
    first_name
    last_name
    permanent_address
    current_address
    state
    pincode
    country
    city
    whatsapp_num
    bank_account_num
    bank_name
    account_holder_name
    bank_branch_name
    ifsc_code
    bank_passbook_img
    joining_date
    joining_salary
    current_salary
    previous_work_description
    adhar_num
    pan_num
    gender
    contact_num
    email
    date_of_birth
    age
    qualification
    profile_img
    adhar_img
    pan_img
      success_msg
      error_msg
      cdate 
      ctime
      udate
      utime
    }
  }
`;

export const CREATE_NURSERY_ADMISSION_LIST_MUTATION = `
  mutation createNurseryAdmissionList(
    $first_name: String
    $middle_name: String
    $last_name: String
    $gender: String
    $date_of_birth: String
    $blood_group: String
    $adhar_no: String
    $category: String
    $class_title: String
    $mother_tangue: String
    $father_full_name: String
    $mother_full_name: String
    $father_work: String
    $mother_work: String
    $guardian_whatsapp_number: String
    $guardian_mobile_number: String
    $guardian_email_id: String
    $guardian_religion: String
    $guardian_annual_income: String
    $permanent_address: String
    $permanent_address_nearest_policestation: String
    $permanent_address_nearest_landmark: String
    $permanent_address_state: String
    $permanent_address_district: String
    $permanent_address_tehsil: String
    $permanent_address_post_office: String
    $permanent_address_pincode: String
    $permanent_address_type: String
    $nationality: String
    $current_address: String
    $current_address_nearest_policestation: String
    $current_address_nearest_landmark: String
    $current_address_state: String
    $current_address_district: String
    $current_address_tehsil: String
    $current_address_post_office: String
    $current_address_pincode: String
    $current_address_type: String
    $country: String
    $student_profile_image: String
    $student_aadhar_front: String
    $student_aadhar_back: String
    $father_aadhar_front: String
    $father_aadhar_back: String
    $mother_aadhar_front: String
    $mother_aadhar_back: String
    $student_birth_certificate: String
    $payment_id: String
    $payment_status: String
    $payment_transaction_id: String
    $payment_date: String
    $total_fees: String
    $paid_amount: String
    $payment_method: String
  ) {
    createNurseryAdmissionList(
      first_name: $first_name
      middle_name: $middle_name
      last_name: $last_name
      gender: $gender
      date_of_birth: $date_of_birth
      blood_group: $blood_group
      adhar_no: $adhar_no
      category: $category
       class_title: $class_title
      mother_tangue: $mother_tangue
      father_full_name: $father_full_name
      mother_full_name: $mother_full_name
      father_work: $father_work
      mother_work: $mother_work
      guardian_whatsapp_number: $guardian_whatsapp_number
      guardian_mobile_number: $guardian_mobile_number
      guardian_email_id: $guardian_email_id
      guardian_religion: $guardian_religion
      guardian_annual_income: $guardian_annual_income
      permanent_address: $permanent_address
      permanent_address_nearest_policestation: $permanent_address_nearest_policestation
      permanent_address_nearest_landmark: $permanent_address_nearest_landmark
      permanent_address_state: $permanent_address_state
      permanent_address_district: $permanent_address_district
      permanent_address_tehsil: $permanent_address_tehsil
      permanent_address_post_office: $permanent_address_post_office
      permanent_address_pincode: $permanent_address_pincode
      permanent_address_type: $permanent_address_type
      nationality: $nationality
      current_address: $current_address
      current_address_nearest_policestation: $current_address_nearest_policestation
      current_address_nearest_landmark: $current_address_nearest_landmark
      current_address_state: $current_address_state
      current_address_district: $current_address_district
      current_address_tehsil: $current_address_tehsil
      current_address_post_office: $current_address_post_office
      current_address_pincode: $current_address_pincode
      current_address_type: $current_address_type
      country: $country
      student_profile_image: $student_profile_image
      student_aadhar_front: $student_aadhar_front
      student_aadhar_back: $student_aadhar_back
      father_aadhar_front: $father_aadhar_front
      father_aadhar_back: $father_aadhar_back
      mother_aadhar_front: $mother_aadhar_front
      mother_aadhar_back: $mother_aadhar_back
      student_birth_certificate: $student_birth_certificate
      payment_id: $payment_id
      payment_status: $payment_status
      payment_transaction_id: $payment_transaction_id
      payment_date: $payment_date
      total_fees: $total_fees
      paid_amount: $paid_amount
      payment_method: $payment_method
    ) {
      z_id
      student_id
      first_name
      middle_name
      class_title
      last_name
      gender
      date_of_birth
      blood_group
      adhar_no
      category
      mother_tangue
      father_full_name
      mother_full_name
      father_work
      mother_work
      guardian_whatsapp_number
      guardian_mobile_number
      guardian_email_id
      guardian_religion
      guardian_annual_income
      permanent_address
      permanent_address_nearest_policestation
      permanent_address_nearest_landmark
      permanent_address_state
      permanent_address_district
      permanent_address_tehsil
      permanent_address_post_office
      permanent_address_pincode
      permanent_address_type
      nationality
      current_address
      current_address_nearest_policestation
      current_address_nearest_landmark
      current_address_state
      current_address_district
      current_address_tehsil
      current_address_post_office
      current_address_pincode
      current_address_type
      country
      student_profile_image
      student_aadhar_front
      student_aadhar_back
      father_aadhar_front
      father_aadhar_back
      mother_aadhar_front
      mother_aadhar_back
      student_birth_certificate
      payment_id
      payment_status
      payment_transaction_id
      payment_date
      total_fees
      paid_amount
      payment_method
      cdate
      ctime
      udate
      utime
      success_msg
      error_msg
    }
  }
`;
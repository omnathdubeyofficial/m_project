
export const CREATE_EVENT_REGISTRATION_FORM_MUTATION = `
  mutation createEventRegistrationForm($event_id : String, $participant_name : String, $sptetc_id : String, $participant_type : String, $email : String, $whatsapp_number : String, $contact_number : String, $address : String, $age : String, $gender : String, $institution_name : String, $class_or_grade : String, $registration_date : String, $payment_id : String, $payment_status : String, $payment_method : String, $registration_status : String ) {
    createEventRegistrationForm(event_id : $event_id, participant_name : $participant_name, sptetc_id : $sptetc_id, participant_type : $participant_type, email : $email, whatsapp_number : $whatsapp_number, contact_number : $contact_number, address : $address, age : $age, gender : $gender, institution_name : $institution_name, class_or_grade : $class_or_grade, registration_date : $registration_date, payment_id : $payment_id, payment_status : $payment_status, payment_method : $payment_method, registration_status : $registration_status) {
      z_id
    registration_id
    event_id
    participant_name
    sptetc_id
    participant_type
    email
    whatsapp_number
    contact_number
    address
    age
    gender
    institution_name
    class_or_grade
    registration_date
    payment_id
    payment_status
    payment_method
    registration_status
    cdate
    ctime
    udate
    utime
      success_msg
      error_msg
    }
  }
`;

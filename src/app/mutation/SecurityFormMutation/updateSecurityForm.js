
export const UPDATE_SECURITY_FORM_MUTATION = `
  mutation updateSecurity($z_id: String, $security_id : String, $first_name : String, $last_name : String, $address : String, $adhar_num : String, $pan_num : String, $gender : String, $contact_num : String, $email : String, $date_of_birth : String, $age : String, $qualification : String, $profile_img : String, $adhar_img : String, $pan_img : String ) {
    updateSecurity(z_id : $z_id, security_id : $security_id, first_name : $first_name, last_name : $last_name, address : $address, adhar_num : $adhar_num, pan_num : $pan_num,gender : $gender, contact_num : $contact_num, email : $email, date_of_birth : $date_of_birth, age : $age, qualification : $qualification,profile_img : $profile_img, adhar_img : $adhar_img, pan_img : $pan_img) {
      z_id
    security_id
    first_name
    last_name
    address
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
    }
  }
`;

import { gql } from 'graphql-tag';

const nurseryAdmissionListType = gql`
  # Nursery admission type definition
  type nurseryAdmissionListTypes {
    z_id: String
    student_id: String
    first_name: String
    middle_name: String
    last_name: String
    gender: String
    date_of_birth: String
    blood_group: String
    adhar_no: String
    category: String
    mother_tangue: String
    father_full_name: String
    mother_full_name: String
    father_work: String
    mother_work: String
    guardian_whatsapp_number: String
    guardian_mobile_number: String
    guardian_email_id: String
    guardian_religion: String
    guardian_annual_income: String
    permanent_address: String
    permanent_address_nearest_policestation: String
    permanent_address_nearest_landmark: String
    permanent_address_state: String
    permanent_address_district: String
    permanent_address_tehsil: String
    permanent_address_post_office: String
    permanent_address_pincode: String
    permanent_address_type: String
    nationality: String
    current_address: String
    current_address_nearest_policestation: String
    current_address_nearest_landmark: String
    current_address_state: String
    current_address_district: String
    current_address_tehsil: String
    current_address_post_office: String
    current_address_pincode: String
    current_address_type: String
    country: String
    student_profile_image: String
    student_aadhar_front: String
    student_aadhar_back: String
    father_aadhar_front: String
    father_aadhar_back: String
    mother_aadhar_front: String
    mother_aadhar_back: String
    student_birth_certificate: String
    payment_id: String
    payment_status: String
    payment_transaction_id: String
    payment_date: String
    total_fees: String
    paid_amount: String
    payment_method: String
    cdate: String
    ctime: String
    udate: String
    utime: String
    success_msg: String
    error_msg: String
  }

  # Query type for fetching nursery admissions
  type Query {
    getNurseryAdmissionList: [nurseryAdmissionListTypes]
  }

  # Mutation types for creating, updating, and deleting nursery admissions
  type Mutation {
    createNurseryAdmissionList(
      first_name: String
      middle_name: String
      last_name: String
      gender: String
      date_of_birth: String
      blood_group: String
      adhar_no: String
      category: String
      mother_tangue: String
      father_full_name: String
      mother_full_name: String
      father_work: String
      mother_work: String
      guardian_whatsapp_number: String
      guardian_mobile_number: String
      guardian_email_id: String
      guardian_religion: String
      guardian_annual_income: String
      permanent_address: String
      permanent_address_nearest_policestation: String
      permanent_address_nearest_landmark: String
      permanent_address_state: String
      permanent_address_district: String
      permanent_address_tehsil: String
      permanent_address_post_office: String
      permanent_address_pincode: String
      permanent_address_type: String
      nationality: String
      current_address: String
      current_address_nearest_policestation: String
      current_address_nearest_landmark: String
      current_address_state: String
      current_address_district: String
      current_address_tehsil: String
      current_address_post_office: String
      current_address_pincode: String
      current_address_type: String
      country: String
      student_profile_image: String
      student_aadhar_front: String
      student_aadhar_back: String
      father_aadhar_front: String
      father_aadhar_back: String
      mother_aadhar_front: String
      mother_aadhar_back: String
      student_birth_certificate: String
      payment_id: String
      payment_status: String
      payment_transaction_id: String
      payment_date: String
      total_fees: String
      paid_amount: String
      payment_method: String
    ): nurseryAdmissionListTypes

    updateNurseryAdmissionList(
      z_id: String
      first_name: String
      middle_name: String
      last_name: String
      gender: String
      date_of_birth: String
      blood_group: String
      adhar_no: String
      category: String
      mother_tangue: String
      father_full_name: String
      mother_full_name: String
      father_work: String
      mother_work: String
      guardian_whatsapp_number: String
      guardian_mobile_number: String
      guardian_email_id: String
      guardian_religion: String
      guardian_annual_income: String
      permanent_address: String
      permanent_address_nearest_policestation: String
      permanent_address_nearest_landmark: String
      permanent_address_state: String
      permanent_address_district: String
      permanent_address_tehsil: String
      permanent_address_post_office: String
      permanent_address_pincode: String
      permanent_address_type: String
      nationality: String
      current_address: String
      current_address_nearest_policestation: String
      current_address_nearest_landmark: String
      current_address_state: String
      current_address_district: String
      current_address_tehsil: String
      current_address_post_office: String
      current_address_pincode: String
      current_address_type: String
      country: String
      student_profile_image: String
      student_aadhar_front: String
      student_aadhar_back: String
      father_aadhar_front: String
      father_aadhar_back: String
      mother_aadhar_front: String
      mother_aadhar_back: String
      student_birth_certificate: String
      payment_id: String
      payment_status: String
      payment_transaction_id: String
      payment_date: String
      total_fees: String
      paid_amount: String
      payment_method: String
    ): nurseryAdmissionListTypes

    deleteNurseryAdmissionList(z_id: String): nurseryAdmissionListTypes
  }
`;

export default nurseryAdmissionListType;
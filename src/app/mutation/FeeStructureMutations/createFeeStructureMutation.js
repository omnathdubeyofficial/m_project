
export const CREATE_FEE_STRUCTURE_MUTATION = `
  mutation createFeeStructureList($class_name : String, $class_section : String, $academic_year : String, $admission_fee : String, $library_fee : String, $uniform_fee : String, $lab_fee : String, $computer_class_fee : String, $annual_fee : String, $sports_fee : String, $activity_fee : String, $examination_fee : String, $hostel_fee : String, $transport_fee_per_km : String, $sibling_discount : String, $early_payment_discount : String, $scholarship_amount : String, $id_card_fee : String, $medical_fee : String, $exam_admit_card : String, $platform_fee : String, $other_fee : String ) {
    createFeeStructureList(class_name : $class_name, class_section : $class_section, academic_year : $academic_year, admission_fee : $admission_fee, library_fee : $library_fee, uniform_fee : $uniform_fee, lab_fee : $lab_fee, computer_class_fee : $computer_class_fee, annual_fee : $annual_fee, sports_fee : $sports_fee, activity_fee : $activity_fee, examination_fee : $examination_fee, hostel_fee : $hostel_fee, transport_fee_per_km : $transport_fee_per_km, sibling_discount : $sibling_discount, early_payment_discount : $early_payment_discount, scholarship_amount : $scholarship_amount, id_card_fee : $id_card_fee, medical_fee : $medical_fee, exam_admit_card : $exam_admit_card, platform_fee : $platform_fee, other_fee : $other_fee) {
      z_id
    class_name
    class_section
    academic_year
    admission_fee
    library_fee
    uniform_fee
    lab_fee
    computer_class_fee
    annual_fee
    sports_fee
    activity_fee
    examination_fee
    hostel_fee
    transport_fee_per_km
    sibling_discount
    early_payment_discount
    scholarship_amount
    id_card_fee
    medical_fee
    exam_admit_card
    platform_fee
    other_fee
    cdate
    ctime
    udate
    utime
      success_msg
      error_msg
    }
  }
`;

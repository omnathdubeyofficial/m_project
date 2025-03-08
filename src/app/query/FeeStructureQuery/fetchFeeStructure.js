export const GET_FEE_STRUCTURE_LISTS_DATA = `
query {
    getFeeStructureLists {
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
    }
  }
`;
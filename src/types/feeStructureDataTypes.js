import { gql } from 'graphql-tag';

const feeStructureDataType = gql`
  # User type definition
  type feeStructureDataTypes {
    z_id : String
    class_name : String
    class_section : String
    academic_year : String
    admission_fee : String
    library_fee : String
    uniform_fee : String
    lab_fee : String
    computer_class_fee : String
    annual_fee : String
    sports_fee : String
    activity_fee : String
    examination_fee : String
    hostel_fee : String
    transport_fee_per_km : String
    sibling_discount : String
    early_payment_discount : String
    scholarship_amount : String
    id_card_fee : String
    medical_fee : String
    exam_admit_card : String
    platform_fee : String
    other_fee : String
    cdate : String
    ctime : String
    udate : String
    utime : String
    success_msg : String
    error_msg : String
  }

  # Query type for fetching users
  type Query {
    getFeeStructureLists: [feeStructureDataTypes]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createFeeStructureList(class_name : String, class_section : String, academic_year : String, admission_fee : String, library_fee : String, uniform_fee : String, lab_fee : String, computer_class_fee : String, annual_fee : String, sports_fee : String, activity_fee : String, examination_fee : String, hostel_fee : String, transport_fee_per_km : String, sibling_discount : String, early_payment_discount : String, scholarship_amount : String, id_card_fee : String, medical_fee : String, exam_admit_card : String, platform_fee : String, other_fee : String): feeStructureDataTypes

    updateFeeStructureList(z_id : String, class_name : String, class_section : String, academic_year : String, admission_fee : String, library_fee : String, uniform_fee : String, lab_fee : String, computer_class_fee : String, annual_fee : String, sports_fee : String, activity_fee : String, examination_fee : String, hostel_fee : String, transport_fee_per_km : String, sibling_discount : String, early_payment_discount : String, scholarship_amount : String, id_card_fee : String, medical_fee : String, exam_admit_card : String, platform_fee : String, other_fee : String): feeStructureDataTypes

    deleteFeeStructureList(z_id : String): feeStructureDataTypes
  }
`;

export default feeStructureDataType;

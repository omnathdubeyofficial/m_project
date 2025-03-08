import { gql } from 'graphql-tag';

const eventRegistrationFormType = gql`
  # User type definition
  type eventRegistrationFormTypes {
    z_id : String
    registration_id : String
    event_id : String
    participant_name : String
    sptetc_id : String
    participant_type : String
    email : String
    whatsapp_number : String
    contact_number : String
    address : String
    age : String
    gender : String
    institution_name : String
    class_or_grade : String
    registration_date : String
    payment_id : String
    payment_status : String
    payment_method : String
    registration_status : String
    cdate : String
    ctime : String
    udate : String
    utime : String
    success_msg : String
    error_msg : String
  }

  # Query type for fetching users
  type Query {
    getEventRegistrationList: [eventRegistrationFormTypes]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createEventRegistrationForm(event_id : String, participant_name : String, sptetc_id : String, participant_type : String, email : String, whatsapp_number : String, contact_number : String, address : String, age : String, gender : String, institution_name : String, class_or_grade : String, registration_date : String, payment_id : String, payment_status : String, payment_method : String, registration_status : String): eventRegistrationFormTypes

    updateEventRegistrationList(z_id : String, event_id : String, participant_name : String, sptetc_id : String, participant_type : String, email : String, whatsapp_number : String, contact_number : String, address : String, age : String, gender : String, institution_name : String, class_or_grade : String, registration_date : String, payment_id : String, payment_status : String, payment_method : String, registration_status : String): eventRegistrationFormTypes

    deleteEventRegistrationList(z_id : String): eventRegistrationFormTypes
  }
`;

export default eventRegistrationFormType;

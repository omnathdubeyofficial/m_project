import { gql } from 'graphql-tag';

const eventCreationType = gql`
  # User type definition
  type eventCreationTypes {
    z_id : String
    event_id : String
    event_name : String
    event_type : String
    event_date : String
    start_time : String
    end_time : String
    venue : String
    organizer_name : String
    organizer_contact_no : String
    organizer_whatsapp_no : String
    organizer_email_id : String
    description : String
    target_audience : String
    max_participants : String
    registration_deadline : String
    event_status : String
    resources_required : String
    cdate : String
    ctime : String
    udate : String
    utime : String
    success_msg : String
    error_msg : String
  }

  # Query type for fetching users
  type Query {
    getEventCreationList: [eventCreationTypes]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createEventForm(event_name : String, event_type : String, event_date : String, start_time : String, end_time : String, venue : String, organizer_name : String, organizer_contact_no : String, organizer_whatsapp_no : String, organizer_email_id : String, description : String, target_audience : String, max_participants : String, registration_deadline : String, event_status : String, resources_required : String): eventCreationTypes

    updateEventList(z_id : String, event_id : String, event_name : String, event_type : String, event_date : String, start_time : String, end_time : String, venue : String, organizer_name : String, organizer_contact_no : String, organizer_whatsapp_no : String, organizer_email_id : String, description : String, target_audience : String, max_participants : String, registration_deadline : String, event_status : String, resources_required : String): eventCreationTypes

    deleteEventList(z_id : String): eventCreationTypes
  }
`;

export default eventCreationType;

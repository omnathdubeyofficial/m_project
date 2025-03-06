
export const CREATE_EVENT_FORM_MUTATION = `
  mutation createEventForm($event_name : String, $event_type : String, $event_date : String, $start_time : String, $end_time : String, $venue : String, $organizer_name : String, $organizer_contact_no : String, $organizer_whatsapp_no : String, $organizer_email_id : String, $description : String, $target_audience : String, $max_participants : String, $registration_deadline : String, $event_status : String, $resources_required : String ) {
    createEventForm(event_name : $event_name, event_type : $event_type, event_date : $event_date, start_time : $start_time, end_time : $end_time, venue : $venue, organizer_name : $organizer_name, organizer_contact_no : $organizer_contact_no, organizer_whatsapp_no : $organizer_whatsapp_no, organizer_email_id : $organizer_email_id, description : $description, target_audience : $target_audience, max_participants : $max_participants, registration_deadline : $registration_deadline, event_status : $event_status, resources_required : $resources_required) {
      z_id
    event_id
    event_name
    event_type
    event_date
    start_time
    end_time
    venue
    organizer_name
    organizer_contact_no
    organizer_whatsapp_no
    organizer_email_id
    description
    target_audience
    max_participants
    registration_deadline
    event_status
    resources_required
    cdate
    ctime
    udate
    utime
      success_msg
      error_msg
    }
  }
`;

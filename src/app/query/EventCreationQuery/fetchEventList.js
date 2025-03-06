export const GET_EVENT_LISTS_DATA = `
query {
    getEventCreationList {
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
    }
  }
`;
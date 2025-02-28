import { gql } from 'graphql-tag';

const holidayListType = gql`
  # User type definition
  type holidayListTypes {
    z_id : String
    from_date : String
    to_date : String
    day : String
    holiday_name : String
    details : String
    cdate : String
    ctime : String
    udate : String
    utime : String
    success_msg : String
    error_msg : String
  }

  # Query type for fetching users
  type Query {
    getHolidayLists: [holidayListTypes]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createHolidayLists(from_date : String, to_date : String, day : String, holiday_name : String, details : String): holidayListTypes

    updateHolidayLists(z_id : String, from_date : String, to_date : String, day : String, holiday_name : String, details : String): holidayListTypes

    deleteHolidayLists(z_id : String): holidayListTypes
  }
`;

export default holidayListType;

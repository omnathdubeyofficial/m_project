import { gql } from 'graphql-tag';

const noticeBoardType = gql`
  # User type definition
  type noticeBoardTypes {
    z_id : String
    notice_id : String
    title : String
    description : String
    notice_date : String
    expiry_date : String
    category : String
    issued_by : String
    audience : String
    attachments : String
    status : String
    cdate : String
    ctime : String
    udate : String
    utime : String
    success_msg : String
    error_msg : String
  }

  # Query type for fetching users
  type Query {
    getNoticeBoardLists: [noticeBoardTypes]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createNoticeBoardLists(title : String, description : String, notice_date : String, expiry_date : String, category : String, issued_by : String, audience : String, attachments : String): noticeBoardTypes

    updateNoticeBoardLists(z_id : String, title : String, description : String, notice_date : String, expiry_date : String, category : String, issued_by : String, audience : String, attachments : String): noticeBoardTypes

    deleteNoticeBoardLists(z_id : String): noticeBoardTypes
  }
`;

export default noticeBoardType;

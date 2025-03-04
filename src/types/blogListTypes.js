import { gql } from 'graphql-tag';

const blogListType = gql`
  # User type definition
  type blogListTypes {
    z_id : String
    title : String
    slug : String
    date_time_zone : String
    author_name : String
    content : String
    tags : String
    category : String
    featured_image : String
    views : String
    likes : String
    comments : String
    meta_title : String
    meta_description : String
    meta_keywords : String
    isLike : String
    isView : String
    cdate : String
    ctime : String
    udate : String
    utime : String
    success_msg : String
    error_msg : String
  }

  # Query type for fetching users
  type Query {
    getBlogList: [blogListTypes]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createBlogList(title : String, slug : String, date_time_zone : String, author_name : String, content : String, tags : String, category : String, featured_image : String, comments : String, meta_title : String, meta_description : String, meta_keywords : String): blogListTypes

    updateBlogList(z_id : String, title : String, slug : String, date_time_zone : String, author_name : String, content : String, tags : String, category : String, featured_image : String, isView : String, isLike : String, comments : String, meta_title : String, meta_description : String, meta_keywords : String): blogListTypes

    deleteBlogList(z_id : String): blogListTypes
  }
`;

export default blogListType;

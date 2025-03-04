export const GET_BLOGR_LISTS_DATA = `
query {
    getBlogList {
      z_id
    title
    slug
    date_time_zone
    author_name
    content
    tags
    category
    featured_image
    comments
    meta_title
    meta_description
    meta_keywords
    cdate
    ctime
    udate
    utime
    }
  }
`;

export const CREATE_BLOG_LIST_MUTATION = `
  mutation createBlogList($title : String, $slug : String, $date_time_zone : String, $author_name : String, $content : String, $tags : String, $category : String, $featured_image : String, $comments : String, $meta_title : String, $meta_description : String, $meta_keywords : String ) {
    createBlogList(title : $title, slug : $slug, date_time_zone : $date_time_zone, author_name : $author_name, content : $content, tags : $tags, category : $category, featured_image : $featured_image, comments : $comments, meta_title : $meta_title, meta_description : $meta_description, meta_keywords : $meta_keywords) {
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
      success_msg
      error_msg
      cdate 
      ctime
      udate
      utime
    }
  }
`;

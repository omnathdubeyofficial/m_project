export const UPDATE_BLOG_LIST_MUTATION = `
mutation  updateBlogList( $z_id: String, $title : String, $slug : String, $date_time_zone : String, $author_name : String, $content : String, $tags : String, $category : String, $featured_image : String, $comments : String, $meta_title : String, $meta_description : String, $meta_keywords : String, $isLike : String, $isView : String) {
     updateBlogList( z_id: $z_id, title : $title, slug : $slug, date_time_zone : $date_time_zone, author_name : $author_name, content : $content, tags : $tags, category : $category, featured_image : $featured_image, comments : $comments, meta_title : $meta_title, meta_description : $meta_description, meta_keywords : $meta_keywords, isLike : $isLike, isView : $isView) {
      z_id
    title
    slug
    date_time_zone
    author_name
    content
    tags
    category
    featured_image
    views
    likes
    comments
    meta_title
    meta_description
    meta_keywords
    cdate
    ctime
    udate
    utime
    success_msg
    error_msg
    }
  }
    `;
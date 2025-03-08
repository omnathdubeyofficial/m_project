
export const CREATE_NEW_BOOK_MUTATION = `
  mutation createNewBook($title : String, $author : String, $isbn : String, $publisher : String, $publication_year : String, $category : String, $language : String, $pages : String, $price : String, $stock : String, $cover_image : String, $back_image : String, $description : String, $added_date : String, $edition : String, $format : String, $genre : String, $availability_status : String, $rating : String, $reviews_count : String, $supplier : String, $discount : String, $keywords : String, $barcode : String, $shelf_location : String, $digital_copy_url : String, $license_type : String, $borrowed_status : String, $borrowed_by : String ) {
    createNewBook(title : $title, author : $author, isbn : $isbn, publisher : $publisher, publication_year : $publication_year, category : $category, language : $language, pages : $pages, price : $price, stock : $stock, cover_image : $cover_image, back_image : $back_image, description : $description, added_date : $added_date, edition : $edition, format : $format, genre : $genre, availability_status : $availability_status, rating : $rating, reviews_count : $reviews_count, supplier : $supplier, discount : $discount, keywords : $keywords, barcode : $barcode, shelf_location : $shelf_location, digital_copy_url : $digital_copy_url, license_type : $license_type, borrowed_status : $borrowed_status, borrowed_by : $borrowed_by) {
      z_id
    title
    author
    bookid
    isbn
    publisher
    publication_year
    category
    language
    pages
    price
    stock
    cover_image
    back_image
    description
    added_date
    edition
    format
    genre
    availability_status
    rating
    reviews_count
    supplier
    discount
    keywords
    barcode
    shelf_location
    digital_copy_url
    license_type
    borrowed_status
    borrowed_by
      cdate
    ctime
    udate
    utime
      success_msg
      error_msg
    }
  }
`;

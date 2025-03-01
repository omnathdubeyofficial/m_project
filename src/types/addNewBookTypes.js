import { gql } from 'graphql-tag';

const addNewBookType = gql`
  # User type definition
  type addNewBookTypes {
    z_id : String
    title : String
    author : String
    bookid : String
    isbn : String
    publisher : String
    publication_year : String
    category : String
    language : String
    pages : String
    price : String
    stock : String
    cover_image : String
    back_image : String
    description : String
    added_date : String
    edition : String
    format : String
    genre : String
    availability_status : String
    rating : String
    reviews_count : String
    supplier : String
    discount : String
    keywords : String
    barcode : String
    shelf_location : String
    digital_copy_url : String
    license_type : String
    borrowed_status : String
    borrowed_by : String
    cdate : String
    ctime : String
    udate : String
    utime : String
    success_msg : String
    error_msg : String
  }

  # Query type for fetching users
  type Query {
    getNewBook: [addNewBookTypes]
  }

  # Mutation types for creating, updating, and deleting users
  type Mutation {
    createNewBook(title : String, author : String, bookid : String, isbn : String, publisher : String, publication_year : String, category : String, language : String, pages : String, price : String, stock : String, cover_image : String, back_image : String, description : String, added_date : String, edition : String, format : String, genre : String, availability_status : String, rating : String, reviews_count : String, supplier : String, discount : String, keywords : String, barcode : String, shelf_location : String, digital_copy_url : String, license_type : String, borrowed_status : String, borrowed_by : String): addNewBookTypes

    updateNewBook(z_id : String, title : String, author : String, isbn : String, publisher : String, publication_year : String, category : String, language : String, pages : String, price : String, stock : String, cover_image : String, back_image : String, description : String, added_date : String, edition : String, format : String, genre : String, availability_status : String, rating : String, reviews_count : String, supplier : String, discount : String, keywords : String, barcode : String, shelf_location : String, digital_copy_url : String, license_type : String, borrowed_status : String, borrowed_by : String): addNewBookTypes

    deleteNewBook(z_id : String): addNewBookTypes
  }
`;

export default addNewBookType;

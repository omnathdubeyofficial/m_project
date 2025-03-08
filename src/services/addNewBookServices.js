import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { setUserDate, setUserTime, unique_id, setDateFormat } from './dateTimeService.js';
import { v4 as uuidv4 } from 'uuid';

// Get all users
const getNewBook = async () => {
  return await prisma.add_new_book.findMany();
};

// Create a new user
const createNewBook = async ({ title, author, isbn, publisher, publication_year, category, language, pages, price, stock, cover_image, back_image, description, added_date, edition, format, genre, availability_status, rating, reviews_count, supplier, discount, keywords, barcode, shelf_location, digital_copy_url, license_type, borrowed_status, borrowed_by }) => {
  try {
    // const unique_book_id = `BOO${Math.floor(Math.random() * 100000)}K`
    const createdData = await prisma.add_new_book.create({
      data: { z_id: uuidv4(), title, author, bookid: unique_id('book'), isbn, publisher, publication_year, category, language, pages, price, stock, cover_image, back_image, description, added_date: setDateFormat(added_date), edition, format, genre, availability_status, rating, reviews_count, supplier, discount, keywords, barcode, shelf_location, digital_copy_url, license_type, borrowed_status, borrowed_by, cdate: setUserDate(), ctime: setUserTime() },
    });
    const success_msg = "New book added successfully."
    return { ...createdData, success_msg }
  } catch (e) {
    const error_msg = `${e}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }

};

// Update an existing user by ID
const updateNewBook = async ({ z_id, title, author, isbn, publisher, publication_year, category, language, pages, price, stock, cover_image, back_image, description, added_date, edition, format, genre, availability_status, rating, reviews_count, supplier, discount, keywords, barcode, shelf_location, digital_copy_url, license_type, borrowed_status, borrowed_by }) => {
  try {

    const updatedData = await prisma.add_new_book.update({
      where: { z_id },
      data: { title, author, isbn, publisher, publication_year, category, language, pages, price, stock, cover_image, back_image, description, added_date: setDateFormat(added_date), edition, format, genre, availability_status, rating, reviews_count, supplier, discount, keywords, barcode, shelf_location, digital_copy_url, license_type, borrowed_status, borrowed_by, udate: setUserDate(), utime: setUserTime() },
    });
    const success_msg = "New book updated successfully."
    return { ...updatedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};


// Delete a user by ID
const deleteNewBook = async ({ z_id }) => {
  try {
    console.log("z_id :", z_id)
    const deletedData = await prisma.add_new_book.delete({
      where: { z_id },
    });
    const success_msg = "New book deleted successfully."
    return { ...deletedData, success_msg }
  } catch (err) {
    const error_msg = `${err}`
    console.error(error_msg)
    return { error_msg }
  } finally {
    prisma.$disconnect()
  }
};

export { getNewBook, createNewBook, updateNewBook, deleteNewBook };

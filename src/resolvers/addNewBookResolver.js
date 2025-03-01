// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getNewBook, createNewBook, updateNewBook, deleteNewBook } from '../services/addNewBookServices.js';  // Import the service functions

const userResolver = {
  Query: {
    getNewBook: createResolver(getNewBook),
  },
  Mutation: {
    createNewBook: createResolver(createNewBook),
    updateNewBook: createResolver(updateNewBook),
    deleteNewBook: createResolver(deleteNewBook),
  },
};

export default userResolver;

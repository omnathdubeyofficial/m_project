// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getIssuedBook, createIssuedBook, updateIssuedBook, deleteIssuedBook } from '../services/issuedBookServices.js';  // Import the service functions

const userResolver = {
  Query: {
    getIssuedBook: createResolver(getIssuedBook),
  },
  Mutation: {
    createIssuedBook: createResolver(createIssuedBook),
    updateIssuedBook: createResolver(updateIssuedBook),
    deleteIssuedBook: createResolver(deleteIssuedBook),
  },
};

export default userResolver;

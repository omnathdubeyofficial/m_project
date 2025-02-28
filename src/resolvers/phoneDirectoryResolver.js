// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getPhoneDirectory, createPhoneDirectory, updatePhoneDirectory, deletePhoneDirectory } from '../services/phoneDirectoryService.js';  // Import the service functions

const userResolver = {
  Query: {
    getPhoneDirectory: createResolver(getPhoneDirectory),
  },
  Mutation: {
    createPhoneDirectory: createResolver(createPhoneDirectory),
    updatePhoneDirectory: createResolver(updatePhoneDirectory),
    deletePhoneDirectory: createResolver(deletePhoneDirectory),
  },
};

export default userResolver;

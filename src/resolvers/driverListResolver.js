// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getDriverLists, createDriverLists, updateDriverLists, deleteDriverLists } from '../services/driversListServices.js';  // Import the service functions

const userResolver = {
  Query: {
    getDriverLists: createResolver(getDriverLists),
  },
  Mutation: {
    createDriverLists: createResolver(createDriverLists),
    updateDriverLists: createResolver(updateDriverLists),
    deleteDriverLists: createResolver(deleteDriverLists),
  },
};

export default userResolver;

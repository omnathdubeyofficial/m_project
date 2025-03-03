// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getDriverList, createDriverForm, updateDriverList, deleteDriverList } from '../services/driversListServices.js';  // Import the service functions

const userResolver = {
  Query: {
    getDriverList: createResolver(getDriverList),
  },
  Mutation: {
    createDriverForm: createResolver(createDriverForm),
    updateDriverList: createResolver(updateDriverList),
    deleteDriverList: createResolver(deleteDriverList),
  },
};

export default userResolver;

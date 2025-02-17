// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getSecurity, createSecurity, updateSecurity, deleteSecurity } from '../services/securityService.js';  // Import the service functions

const userResolver = {
  Query: {
    getSecurity: createResolver(getSecurity),
  },
  Mutation: {
    createSecurity: createResolver(createSecurity),
    updateSecurity: createResolver(updateSecurity),
    deleteSecurity: createResolver(deleteSecurity),
  },
};

export default userResolver;

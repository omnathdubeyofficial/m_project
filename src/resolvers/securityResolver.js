// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getSecurityList, createSecurityForm, updateSecurityList, deleteSecurityList } from '../services/securityService.js';  // Import the service functions

const userResolver = {
  Query: {
    getSecurityList: createResolver(getSecurityList),
  },
  Mutation: {
    createSecurityForm: createResolver(createSecurityForm),
    updateSecurityList: createResolver(updateSecurityList),
    deleteSecurityList: createResolver(deleteSecurityList),
  },
};

export default userResolver;

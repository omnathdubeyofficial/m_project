// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getUserDataFromToken } from '../services/authTokanService.js';  // Import the service functions

const authTokenResolver = {
  Query: {
    getUserDataFromToken: createResolver(getUserDataFromToken),
  }
};

export default authTokenResolver;

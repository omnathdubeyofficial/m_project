// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getUsers, createUser } from '../services/userService.js';  // Import the service functions

const userResolver = {
  Query: {
    getUsers: createResolver(getUsers),  
  },
  Mutation: {
    createUser: createResolver(createUser),  
  },
};

export default userResolver;

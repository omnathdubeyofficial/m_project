// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getUserManagementData, createUserManagementData, updateUserManagementData, deleteUserManagementData, login } from '../services/userManagementService.js';  // Import the service functions

const userResolver = {
  Query: {
    getUserManagementData: createResolver(getUserManagementData),
    login: createResolver(login),
  },
  Mutation: {
    createUserManagementData: createResolver(createUserManagementData),
    updateUserManagementData: createResolver(updateUserManagementData),
    deleteUserManagementData: createResolver(deleteUserManagementData),
  },
};

export default userResolver;

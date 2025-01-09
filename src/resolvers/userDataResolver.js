import { createResolver } from './resolverUtil.js';
import { getUsersData, createUserData, updateUserData, deleteUserData } from '../services/userDataService.js'; 

const userResolver = {

  Query: {
    // Fetch all users
    getUsersData: createResolver(getUsersData),  
  },
  Mutation: {
    // Create a new user
    createUserData: createResolver(createUserData),  
    
    // Update an existing user
    updateUserData: createResolver(updateUserData),
    
    // Delete a user
    deleteUserData: createResolver(deleteUserData),
  },
};

export default userResolver;

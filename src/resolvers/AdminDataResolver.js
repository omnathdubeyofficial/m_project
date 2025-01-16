import { createResolver } from './resolverUtil.js';
import { getAdminData, createAdminData, updateAdminData, deleteAdminData } from '../services/adminService.js'; 

const userResolver = {

  Query: {
    // Fetch all Admin
    getAdminData: createResolver(getAdminData),  
  },
  Mutation: {
    // Create a new Admin
    createAdminData: createResolver(createAdminData),  
    
    // Update an existing Admin
    updateAdminData: createResolver(updateAdminData),
    
    // Delete a Admin
    deleteAdminData: createResolver(deleteAdminData),
  },
};

export default userResolver;

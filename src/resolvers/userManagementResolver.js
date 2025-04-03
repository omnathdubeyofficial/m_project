// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getUserManagementData, createUserManagementData, updateUserManagementData, deleteUserManagementData, login,verifyOtp } from '../services/userManagementService.js';  // Import the service functions

const userResolver = {
  Query: {
    getUserManagementData: createResolver(getUserManagementData),
    login: async (_, args, context) => {
      console.log("📌 [Resolver] Login Attempt with args:", args);
    
      if (!context || !context.res) {
        console.error("❌ [Resolver] Context or Response object is missing!");
        throw new Error("Internal Server Error: Missing response object");
      }
    
      // ✅ Ensure args are correctly passed
      const { userid, password } = args;
      console.log(`🔍 Extracted userid: ${userid}, password: ${password ? '******' : 'MISSING'}`);
    
      if (!userid || !password) {
        return { error_msg: "Userid or Password missing!" };
      }
    
      return await login(_, { userid, password }, context);
    },
  },
  Mutation: {
    createUserManagementData: createResolver(createUserManagementData),
    updateUserManagementData: createResolver(updateUserManagementData),
    deleteUserManagementData: createResolver(deleteUserManagementData),
    verifyOtp: async (_, args, context) => {
      console.log("📌 [Resolver] OTP Verification Attempt with args:", args);
    
      if (!context || !context.res) {
        console.error("❌ [Resolver] Context or Response object is missing!");
        throw new Error("Internal Server Error: Missing response object");
      }
    
      // ✅ Ensure args are correctly passed
      const { userid, otp } = args;
      console.log(`🔍 Extracted userid: ${userid}, otp: ${otp ? '******' : 'MISSING'}`);
    
      if (!userid || !otp) {
        return { error_msg: "Userid or OTP missing!" };
      }
    
      return await verifyOtp(_, { userid, otp }, context);
    },
  },
};

export default userResolver;

// userResolver.js
import { getUserDataFromToken } from '../services/authTokanService.js';

const authTokenResolver = {
  Query: {
    getUserDataFromToken: async (parent, args, context) => {
      const { authToken } = context; // Ensure context is defined
      if (!authToken) {
        // throw new Error("No authToken provided");
      }

      // Call your function to get user data
      const userData = await getUserDataFromToken(context.req);
      return userData;
    },
  },
};


export default authTokenResolver;

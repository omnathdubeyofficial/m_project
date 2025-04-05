// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { verifyOtpAndResetPassword,sendOtpForPasswordReset } from '../services/forgetpasswordService.js';  // Import the service functions

const userResolver = {
  Mutation: {
    sendOtpForPasswordReset: createResolver(sendOtpForPasswordReset),
    verifyOtpAndResetPassword: createResolver(verifyOtpAndResetPassword),
  },
};

export default userResolver;



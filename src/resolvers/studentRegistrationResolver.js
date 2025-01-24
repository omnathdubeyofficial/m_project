// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getStudentRegistration, createStudentRegistration, updateStudentRegistration, deleteStudentRegistration } from '../services/studentRegistrationService.js';  // Import the service functions

const userResolver = {
  Query: {
    getStudentRegistration: createResolver(getStudentRegistration),
  },
  Mutation: {
    createStudentRegistration: createResolver(createStudentRegistration),
    updateStudentRegistration: createResolver(updateStudentRegistration),
    deleteStudentRegistration: createResolver(deleteStudentRegistration),
  },
};

export default userResolver;

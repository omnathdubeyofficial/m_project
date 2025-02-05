// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getAdmissionForm, createAdmissionForm, updateAdmissionForm, deleteAdmissionForm } from '../services/admissionFormService.js';  // Import the service functions

const userResolver = {
  Query: {
    getAdmissionForm: createResolver(getAdmissionForm),
  },
  Mutation: {
    createAdmissionForm: createResolver(createAdmissionForm),
    updateAdmissionForm: createResolver(updateAdmissionForm),
    deleteAdmissionForm: createResolver(deleteAdmissionForm),
  },
};

export default userResolver;

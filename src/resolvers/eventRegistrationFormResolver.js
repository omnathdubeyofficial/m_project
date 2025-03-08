// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getEventRegistrationList, createEventRegistrationForm, updateEventRegistrationList, deleteEventRegistrationList } from '../services/eventRegistrationFormServices.js';  // Import the service functions

const userResolver = {
  Query: {
    getEventRegistrationList: createResolver(getEventRegistrationList),
  },
  Mutation: {
    createEventRegistrationForm: createResolver(createEventRegistrationForm),
    updateEventRegistrationList: createResolver(updateEventRegistrationList),
    deleteEventRegistrationList: createResolver(deleteEventRegistrationList),
  },
};

export default userResolver;

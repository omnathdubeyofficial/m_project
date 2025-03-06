// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getEventCreationList, createEventForm, updateEventList, deleteEventList } from '../services/eventCreationServices.js';  // Import the service functions

const userResolver = {
  Query: {
    getEventCreationList: createResolver(getEventCreationList),
  },
  Mutation: {
    createEventForm: createResolver(createEventForm),
    updateEventList: createResolver(updateEventList),
    deleteEventList: createResolver(deleteEventList),
  },
};

export default userResolver;

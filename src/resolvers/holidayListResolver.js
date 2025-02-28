// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getHolidayLists, createHolidayLists, updateHolidayLists, deleteHolidayLists } from '../services/holidayListService.js';  // Import the service functions

const userResolver = {
  Query: {
    getHolidayLists: createResolver(getHolidayLists),
  },
  Mutation: {
    createHolidayLists: createResolver(createHolidayLists),
    updateHolidayLists: createResolver(updateHolidayLists),
    deleteHolidayLists: createResolver(deleteHolidayLists),
  },
};

export default userResolver;

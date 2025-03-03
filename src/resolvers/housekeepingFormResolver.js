// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getHouseKeepingList, createHouseKeepingForm, updateHouseKeepingList, deleteHouseKeepingList } from '../services/housekeepingFormService.js';  // Import the service functions

const userResolver = {
  Query: {
    getHouseKeepingList: createResolver(getHouseKeepingList),
  },
  Mutation: {
    createHouseKeepingForm: createResolver(createHouseKeepingForm),
    updateHouseKeepingList: createResolver(updateHouseKeepingList),
    deleteHouseKeepingList: createResolver(deleteHouseKeepingList),
  },
};

export default userResolver;

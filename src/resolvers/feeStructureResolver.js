// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getFeeStructureLists, createFeeStructureList, updateFeeStructureList, deleteFeeStructureList } from '../services/feeStructureListService.js';  // Import the service functions

const userResolver = {
  Query: {
    getFeeStructureLists: createResolver(getFeeStructureLists),
  },
  Mutation: {
    createFeeStructureList: createResolver(createFeeStructureList),
    updateFeeStructureList: createResolver(updateFeeStructureList),
    deleteFeeStructureList: createResolver(deleteFeeStructureList),
  },
};

export default userResolver;

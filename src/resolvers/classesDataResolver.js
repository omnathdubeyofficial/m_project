// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getClassesDataList, createClassesData, updateClassesData, deleteClassesData } from '../services/classesDataServices.js';  // Import the service functions

const userResolver = {
  Query: {
    getClassesDataList: createResolver(getClassesDataList),
  },
  Mutation: {
    createClassesData: createResolver(createClassesData),
    updateClassesData: createResolver(updateClassesData),
    deleteClassesData: createResolver(deleteClassesData),
  },
};

export default userResolver;

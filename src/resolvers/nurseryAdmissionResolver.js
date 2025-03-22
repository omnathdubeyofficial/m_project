// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getNurseryAdmissionList, createNurseryAdmissionList, updateNurseryAdmissionList, deleteNurseryAdmissionList } from '../services/nurseryAdmissionServices.js';  // Import the service functions

const userResolver = {
  Query: {
    getNurseryAdmissionList: createResolver(getNurseryAdmissionList),
  },
  Mutation: {
    createNurseryAdmissionList: createResolver(createNurseryAdmissionList),
    updateNurseryAdmissionList: createResolver(updateNurseryAdmissionList),
    deleteNurseryAdmissionList: createResolver(deleteNurseryAdmissionList),
  },
};

export default userResolver;

// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getTransportVehicleRegistration, createTransportVehicleRegistration, updateTransportVehicleRegistration, deleteTransportVehicleRegistration } from '../services/transportVehicleServices.js';  // Import the service functions

const userResolver = {
  Query: {
    getTransportVehicleRegistration: createResolver(getTransportVehicleRegistration),
  },
  Mutation: {
    createTransportVehicleRegistration: createResolver(createTransportVehicleRegistration),
    updateTransportVehicleRegistration: createResolver(updateTransportVehicleRegistration),
    deleteTransportVehicleRegistration: createResolver(deleteTransportVehicleRegistration),
  },
};

export default userResolver;

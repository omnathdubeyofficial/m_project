// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getAttendanceData, createAttendanceData, updateAttendanceData, deleteAttendanceData } from '../services/attendanceService.js';  // Import the service functions

const userResolver = {
  Query: {
    getAttendanceData: createResolver(getAttendanceData),
  },
  Mutation: {
    createAttendanceData: createResolver(createAttendanceData),
    updateAttendanceData: createResolver(updateAttendanceData),
    deleteAttendanceData: createResolver(deleteAttendanceData),
  },
};

export default userResolver;

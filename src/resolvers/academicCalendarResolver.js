// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getAcademicCalendar, createAcademicCalendar, updateAcademicCalendar, deleteAcademicCalendar } from '../services/academicCalendarService.js';  // Import the service functions

const userResolver = {
  Query: {
    getAcademicCalendar: createResolver(getAcademicCalendar),
  },
  Mutation: {
    createAcademicCalendar: createResolver(createAcademicCalendar),
    updateAcademicCalendar: createResolver(updateAcademicCalendar),
    deleteAcademicCalendar: createResolver(deleteAcademicCalendar),
  },
};

export default userResolver;

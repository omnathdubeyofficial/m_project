// schoolCareerResolver.js
import { createResolver } from './resolverUtil.js'; // Import your custom resolver wrapper
import {
  getSchoolCareers,
  createSchoolCareer,
  updateSchoolCareer,
  deleteSchoolCareer
} from '../services/schoolCareersService.js'; // Import the service functions

const schoolCareerResolver = {
  Query: {
    getSchoolCareers: createResolver(getSchoolCareers),
  },
  Mutation: {
    createSchoolCareer: createResolver(createSchoolCareer),
    updateSchoolCareer: createResolver(updateSchoolCareer),
    deleteSchoolCareer: createResolver(deleteSchoolCareer),
  },
};

export default schoolCareerResolver;

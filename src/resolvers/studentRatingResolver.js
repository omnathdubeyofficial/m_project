// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import {   getStudentRatings,
    createStudentRating,
    updateStudentRating,
    deleteStudentRating, } from '../services/studentRatingService.js';  // Import the service functions

const userResolver = {
  Query: {
    getStudentRatings: createResolver(getStudentRatings),
  },
  Mutation: {
    createStudentRating: createResolver(createStudentRating),
    updateStudentRating: createResolver(updateStudentRating),
    deleteStudentRating: createResolver(deleteStudentRating),
  },
};

export default userResolver;
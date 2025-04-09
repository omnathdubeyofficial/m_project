// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import {   getParentRatings,
    createParentRating,
    updateParentRating,
    deleteParentRating, } from '../services/parentRatingService.js';  // Import the service functions

const userResolver = {
  Query: {
    getParentRatings: createResolver(getParentRatings),
  },
  Mutation: {
    createParentRating: createResolver(createParentRating),
    updateParentRating: createResolver(updateParentRating),
    deleteParentRating: createResolver(deleteParentRating),
  },
};

export default userResolver;
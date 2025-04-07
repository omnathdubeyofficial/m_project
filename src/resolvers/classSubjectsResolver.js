// userResolver.js
import { createResolver } from './resolverUtil.js';  // Utility function

import {
    getClassSubjects,
    createClassSubject,
    updateClassSubject,
    deleteClassSubject
} from '../services/classsubjectsService.js';

const userResolver = {
  Query: {
    getClassSubjects: createResolver(getClassSubjects), 
  },
  Mutation: {
    createClassSubject: createResolver(createClassSubject),
    updateClassSubject: createResolver(updateClassSubject),
    deleteClassSubject: createResolver(deleteClassSubject),     
  },
};

export default userResolver;

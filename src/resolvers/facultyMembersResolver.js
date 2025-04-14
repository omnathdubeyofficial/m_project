// facultyResolver.js
import { createResolver } from './resolverUtil.js';
import {
  createFaculty,
  getAllFaculty,
  updateFaculty,
  deleteFaculty,
} from '../services/facultyMembersService.js';

const facultyResolver = {
  Query: {
    getAllFaculty: createResolver(getAllFaculty),
  },
  Mutation: {
    createFaculty: createResolver(createFaculty),
    updateFaculty: createResolver(updateFaculty),
    deleteFaculty: createResolver(deleteFaculty),
  },
};

export default facultyResolver;

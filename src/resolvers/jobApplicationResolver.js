// jobApplicationResolver.js
import { createResolver } from './resolverUtil.js';
import {
  getAllApplications,
  applyForJob,
  updateApplication,
  deleteApplication
} from '../services/jobApplicationService.js';

const jobApplicationResolver = {
  Query: {
    getAllApplications: createResolver(getAllApplications),
  },
  Mutation: {
    applyForJob: createResolver(applyForJob),
    updateApplication: createResolver(updateApplication),
    deleteApplication: createResolver(deleteApplication),
  },
};

export default jobApplicationResolver;

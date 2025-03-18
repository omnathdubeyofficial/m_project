// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getNoticeBoardLists, createNoticeBoardLists, updateNoticeBoardLists, deleteNoticeBoardLists } from '../services/noticeBoardService.js';  // Import the service functions

const userResolver = {
  Query: {
    getNoticeBoardLists: createResolver(getNoticeBoardLists),
  },
  Mutation: {
    createNoticeBoardLists: createResolver(createNoticeBoardLists),
    updateNoticeBoardLists: createResolver(updateNoticeBoardLists),
    deleteNoticeBoardLists: createResolver(deleteNoticeBoardLists),
  },
};

export default userResolver;

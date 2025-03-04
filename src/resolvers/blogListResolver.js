// userResolver.js
import { createResolver } from './resolverUtil.js';  // Import the utility function
import { getBlogList, createBlogList, updateBlogList, deleteBlogList } from '../services/blogListServices.js';  // Import the service functions

const userResolver = {
  Query: {
    getBlogList: createResolver(getBlogList),
  },
  Mutation: {
    createBlogList: createResolver(createBlogList),
    updateBlogList: createResolver(updateBlogList),
    deleteBlogList: createResolver(deleteBlogList),
  },
};

export default userResolver;

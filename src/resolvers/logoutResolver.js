const logoutResolver = {
  Mutation: {
    logout: async (_, __, { res }) => { // Make sure 'res' is in context
      // Clear the auth token cookie
      res.clearCookie('authToken'); // Clear the auth token cookie
      return { message: "Successfully logged out" };
    }
  }
};

export default logoutResolver;

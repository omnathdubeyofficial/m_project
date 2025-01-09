// resolverUtil.js
export const createResolver = (serviceFunction) => async (_, args) => {
    return await serviceFunction(...Object.values(args));
  };
  
import IUserService from '@/app/services/user/interface.user.service';

interface Context {
  userService: IUserService;
}

export const userResolvers = {
  Query: {
    getUser: async (
      _: any,
      { userId }: { userId: string },
      context: Context
    ) => {
      return await context.userService.getById(userId);
    },

    getUsers: async (
      _: any,
      {
        skip,
        take,
        filter,
        sort,
      }: { skip?: number; take?: number; filter?: any; sort?: any },
      context: Context
    ) => {
      return await context.userService.getAll({
        skip,
        take,
        filter,
        sort,
      });
    },
  },

  Mutation: {
    createUser: async (_: any, { input }: { input: any }, context: Context) => {
      return await context.userService.create(input);
    },

    updateUser: async (
      _: any,
      { userId, input }: { userId: string; input: any },
      context: Context
    ) => {
      return await context.userService.update(userId, input);
    },

    deleteUser: async (
      _: any,
      { userId }: { userId: string },
      context: Context
    ) => {
      return await context.userService.delete(userId);
    },
  },
};

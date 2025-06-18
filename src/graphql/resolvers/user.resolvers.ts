import IUserService from '@/app/services/user/interface.user.service';

interface Context {
  userService: IUserService;
}

export const userResolvers = {
  Query: {
    // Get a single user by ID
    getUser: async (_: any, { userId }: { userId: string }, context: Context) => {
      try {
        return await context.userService.getById(userId);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user');
      }
    },

    // Get all users with pagination
    getUsers: async (
      _: any,
      { skip, take, filter, sort }: { skip?: number; take?: number; filter?: any; sort?: any },
      context: Context
    ) => {
      try {
        return await context.userService.getAll({
          skip,
          take,
          filter,
          sort,
        });
      } catch (error) {
        console.error('Failed to fetch users:', error);
        throw new Error('Failed to fetch users');
      }
    },
  },

  Mutation: {
    // Create a new user
    createUser: async (
      _: any,
      { input }: { input: any },
      context: Context
    ) => {
      try {
        return await context.userService.create(input);
      } catch (error) {
        console.error('Failed to create user:', error);
        throw new Error('Failed to create user');
      }
    },

    // Update an existing user
    updateUser: async (
      _: any,
      { userId, input }: { userId: string; input: any },
      context: Context
    ) => {
      try {
        return await context.userService.update(userId, input);
      } catch (error) {
        console.error('Failed to update user:', error);
        throw new Error('Failed to update user');
      }
    },

    // Delete a user
    deleteUser: async (
      _: any,
      { userId }: { userId: string },
      context: Context
    ) => {
      try {
        return await context.userService.delete(userId);
      } catch (error) {
        console.error('Failed to delete user:', error);
        throw new Error('Failed to delete user');
      }
    },
  },
};

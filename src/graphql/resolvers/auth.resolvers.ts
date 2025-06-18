import { IAuthService, LoginInput, RegisterInput } from '@/app/services/auth/interface.auth.service';

interface Context {
  authService: IAuthService;
}

export const authResolvers = {
  // Union type resolver for AuthResult
  AuthResult: {
    __resolveType(obj: any) {
      if (obj.user && obj.token) {
        return 'AuthResponse';
      }
      if (obj.message) {
        return 'Error';
      }
      return null;
    },
  },

  Mutation: {
    login: async (
      _: unknown,
      { input }: { input: LoginInput },
      context: Context
    ) => {
      try {
        const result = await context.authService.login(input);
        return result;
      } catch (error) {
        console.error('Login error:', error);
        return {
          __typename: 'Error',
          message: error instanceof Error ? error.message : 'Login failed',
          code: 'AUTH_ERROR'
        };
      }
    },

    register: async (
      _: unknown,
      { input }: { input: RegisterInput },
      context: Context
    ) => {
      try {
        const result = await context.authService.register(input);
        return result;
      } catch (error) {
        console.error('Registration error:', error);
        return {
          __typename: 'Error',
          message: error instanceof Error ? error.message : 'Registration failed',
          code: 'REGISTRATION_ERROR'
        };
      }
    },
  },
};

import IAuthService from '@/app/services/auth/interface.auth.service';
import { LoginInput, RegisterInput } from '@/app/services/auth/interface.auth.service';

interface Context {
  authService: IAuthService;
}

export const authResolvers = {
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

import IAuthService from '@/app/services/auth/interface.auth.service';
import {
  LoginInput,
  RegisterInput,
} from '@/app/services/auth/interface.auth.service';

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
      const result = await context.authService.login(input);
      return result;
    },

    register: async (
      _: unknown,
      { input }: { input: RegisterInput },
      context: Context
    ) => {
      const result = await context.authService.register(input);
      return result;
    },
  },
};

import IUserService from '@/app/services/user/interface.user.service';
import UserService from '@/app/services/user/user.service';
import UserRepository from '@/app/repositories/user/user.repository';
import AuthService from '@/app/services/auth/auth.service';
import IAuthService from '@/app/services/auth/interface.auth.service';

export interface GraphQLContext {
  userService: IUserService;
  authService: IAuthService;
}

export function createContext() {
  // Initialize services
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const authService = new AuthService(userRepository);
  return {
    userService,
    authService,
  };
}

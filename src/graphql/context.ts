import IUserService from '@/app/services/user/interface.user.service';
import UserService from '@/app/services/user/user.service';
import UserRepository from '@/app/repositories/user/user.repository';

export interface GraphQLContext {
  userService: IUserService;
}

export function createContext() {
  // Initialize services
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);

  return {
    userService,
  };
}

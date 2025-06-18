import { User } from '@prisma/client';

export type CreateUserInput = Omit<User, 'userId' | 'createdAt' | 'updatedAt'>;

export type UpdateUserInput = Partial<Omit<User, 'userId' | 'createdAt' | 'updatedAt'>>;

export type UserResponse = Omit<User, 'password'>;

export type UserLoginInput = {
  email: string;
  password: string;
};

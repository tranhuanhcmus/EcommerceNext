import { UserResponse, UserResponseWithPassword } from '@/types/user';

/**
 * Input type for login mutation
 */
export interface LoginInput {
  email: string;
  password: string;
}

/**
 * Input type for registration
 */
export interface RegisterInput {
  name?: string;
  email: string;
  password: string;
}

/**
 * Authentication response containing user data and JWT token
 */
export interface AuthResponse {
  user: UserResponse;
  token: string;
}

/**
 * Interface for authentication service
 */
export default interface IAuthService {
  /**
   * Hash a password using bcrypt
   */
  hashPassword(password: string): Promise<string>;

  /**
   * Verify a password against a hash
   */
  verifyPassword(password: string, hash: string): Promise<boolean>;

  /**
   * Generate a JWT token for a user
   */
  generateToken(user: UserResponse): Promise<string>;

  /**
   * Verify a JWT token and return the decoded payload
   */
  verifyToken(token: string): Promise<{ userId: string; email: string }>;

  /**
   * Authenticate a user with email and password
   */
  login(input: LoginInput): Promise<AuthResponse>;

  /**
   * Register a new user
   */
  register(input: RegisterInput): Promise<AuthResponse>;
}

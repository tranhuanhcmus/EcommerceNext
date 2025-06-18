import IUserRepository from '@/app/repositories/user/interface.user.repository';
import IAuthService from './interface.auth.service';
import { AuthResponse, LoginInput, RegisterInput } from './interface.auth.service';
import { UserResponse } from '@/types/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT } from '@/types/config';

// JWT payload interface
export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

class AuthService implements IAuthService {
  private readonly JWT_EXPIRES_IN = '7d';
  private readonly JWT_SECRET = JWT.SECRET;

  constructor(private userRepository: IUserRepository) {
  }

  /**
   * Hash a password using bcrypt
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  /**
   * Verify a password against a hash
   */
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  /**
   * Generate a JWT token for a user
   */
  async generateToken(user: UserResponse): Promise<string> {
    try {
      const payload: JwtPayload = {
        userId: user.userId,
        email: user.email,
      };

      if (!this.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
      }

      return jwt.sign(payload, this.JWT_SECRET, {
        expiresIn: this.JWT_EXPIRES_IN,
      });
    } catch (error) {
      console.error('Error generating JWT token:', error);
      throw new Error('Failed to generate authentication token');
    }
  }

  /**
   * Verify a JWT token and return the decoded payload
   */
  async verifyToken(token: string): Promise<{ userId: string; email: string }> {
    try {
      if (!this.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
      }

      const decoded = jwt.verify(token, this.JWT_SECRET) as JwtPayload;
      
      return {
        userId: decoded.userId,
        email: decoded.email,
      };
    } catch (error) {
      console.error('Error verifying JWT token:', error);
      throw new Error('Invalid or expired token');
    }
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    try {
      const { email, password } = input;

      // Find user by email
      const user = await this.userRepository.getByEmail(email);

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Verify password
      const isPasswordValid = await this.verifyPassword(
        password,
        user.password
      );

      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }

      // Generate JWT token
      const token = await this.generateToken(user);

      // Return user data and token
      return {
        user: user,
        token,
      };
    } catch (error) {
      console.error('Login error:', error);
      throw error instanceof Error ? error : new Error('Login failed');
    }
  }
  async register(input: RegisterInput): Promise<AuthResponse> {
    try {
      const { email, password, name } = input;

      // Check if user already exists
      const existUser = await this.userRepository.getByEmail(email);

      if (existUser) {
        throw new Error('User already exists');
      }

      // Hash the password before creating the user
      const hashedPassword = await this.hashPassword(password);

      // Create the user with the hashed password
      const newUser = await this.userRepository.create({
        email,
        password: hashedPassword,
        name: name || null, // Ensure name is either string or null, not undefined
      });

      // Generate token for the new user
      const token = await this.generateToken(newUser);

      // Return the user data and token
      return {
        user: newUser,
        token,
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw error instanceof Error ? error : new Error('Registration failed');
    }
  }
}

export default AuthService;

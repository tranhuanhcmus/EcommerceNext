import { gql } from 'graphql-tag';

export const authTypeDefs = gql`
  """
  Authentication response containing user data and access token
  """
  type AuthResponse {
    """The authenticated user"""
    user: User!
    
    """JWT access token for authenticated requests"""
    token: String!
  }

  """
  User authentication result
  """
  union AuthResult = AuthResponse | Error

  """
  Standard error type for authentication failures
  """
  type Error {
    """Error message"""
    message: String!
    
    """Error code"""
    code: String
  }

  """Input type for login mutation"""
  input LoginInput {
    """User's email address"""
    email: String!
    
    """User's password"""
    password: String!
  }

  """Input type for registration"""
  input RegisterInput {
    """User's full name"""
    name: String
    
    """User's email address (must be unique)"""
    email: String!
    
    """User's password (will be hashed before storage)"""
    password: String!
  }

  type Mutation {
    """
    Authenticate a user with email and password
    Returns a JWT token for subsequent authenticated requests
    """
    login(input: LoginInput!): AuthResult!
    
    """
    Register a new user account
    Returns the created user and authentication token
    """
    register(input: RegisterInput!): AuthResult!
  }
`;

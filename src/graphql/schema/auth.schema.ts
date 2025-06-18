import { gql } from 'graphql-tag';

export const authTypeDefs = gql`
  """
  Authentication response containing user data and access token
  """
  type AuthResponse {
    """
    The authenticated user
    """
    user: User!

    """
    JWT access token for authenticated requests
    """
    token: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    name: String
    email: String!
    password: String!
  }

  type Mutation {
    login(input: LoginInput!): AuthResponse!
    register(input: RegisterInput!): AuthResponse!
  }
`;

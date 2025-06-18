import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  type User {
    userId: ID!
    name: String
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  input CreateUserInput {
    name: String
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
  }

  input UserFilterInput {
    name: String
    email: String
    # Add more filter fields as needed
  }

  enum SortOrder {
    ASC
    DESC
  }

  input SortInput {
    field: String!
    order: SortOrder = ASC
  }

  type Query {
    "Get user by ID"
    getUser(userId: ID!): User
    
    "Get all users with optional pagination"
    getUsers(
      skip: Int
      take: Int
      filter: UserFilterInput
      sort: SortInput
    ): [User!]!
  }

  type Mutation {
    "Create a new user"
    createUser(input: CreateUserInput!): User!
    
    "Update an existing user"
    updateUser(userId: ID!, input: UpdateUserInput!): User!
    
    "Delete a user"
    deleteUser(userId: ID!): User
  }
`;

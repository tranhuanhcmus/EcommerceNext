import { mergeResolvers } from '@graphql-tools/merge';
import { userResolvers } from './user.resolvers';
import { authResolvers } from './auth.resolvers';

export const resolvers = mergeResolvers([userResolvers, authResolvers]);

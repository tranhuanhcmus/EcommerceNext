import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { createContext, GraphQLContext } from './context';

const server = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
  formatError: formattedError => {
    console.error('GraphQL Error:', {
      message: formattedError.message,
      path: formattedError.path,
      locations: formattedError.locations,
      // extensions: formattedError.extensions,
    });

    return {
      message: formattedError.message,
      path: formattedError.path,
      locations: formattedError.locations,
    };
  },
});

export default startServerAndCreateNextHandler(server, {
  context: async () => {
    return createContext();
  },
});

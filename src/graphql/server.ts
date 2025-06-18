import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { createContext, GraphQLContext } from './context';

// Create the Apollo Server
const server = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
  formatError: (formattedError) => {
    // Log the error for debugging
    console.error('GraphQL Error:', {
      message: formattedError.message,
      path: formattedError.path,
      locations: formattedError.locations,
      extensions: formattedError.extensions,
    });

    // Return a sanitized error message
    return {
      message: formattedError.message,
      path: formattedError.path,
      locations: formattedError.locations,
    };
  },
});

// Create the request handler
export default startServerAndCreateNextHandler(server, {
  context: async () => {
    return createContext();
  },
});

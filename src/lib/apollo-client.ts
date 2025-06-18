import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GRAPHQL } from '@/types/config';

const httpLink = createHttpLink({
  uri: GRAPHQL.ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

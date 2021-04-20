import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';

export const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:5000/',
    fetch,
  }),
  cache: new InMemoryCache(),
});

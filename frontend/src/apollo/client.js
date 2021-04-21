import fetch from "cross-fetch";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";

export const client = new ApolloClient({
  link: new HttpLink({
    // uri:
    // "https://9viyq1hzc5.execute-api.ap-southeast-2.amazonaws.com/prod/graphql/",
    uri: "http://localhost:5000/",
    fetch,
  }),
  cache: new InMemoryCache(),
});

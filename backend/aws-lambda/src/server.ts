import { ApolloServer } from "apollo-server";
import { connect } from "./mongodb/database";
import typeDefs from "./graphql/type-defs";
import resolvers from "./graphql/resolvers";

connect();

const server = new ApolloServer({
  resolvers,
  typeDefs,
  playground: true,
  introspection: true,
});

// export const graphqlHandler = apolloServer.createHandler();
server.listen({ port: 5000 }).then(() =>
  console.log(`
  🚀  Server is running!
  🔉  Listening on port 5000`)
);

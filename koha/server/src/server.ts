import { ApolloServer } from "apollo-server";
import { getConnection } from "../database";
import typeDefs from "../database/schema/koha";
import resolvers from "../database/resolvers/kohaclub";

getConnection();

// Local server to test connection

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: async () => {
    const dbConn = await getConnection();
    return { dbConn };
  },
  // context: { models },
  playground: true,
  introspection: true,
});

// export const graphqlHandler = apolloServer.createHandler();
server.listen({ port: 4000 }).then(() => console.log(`server ready at `));

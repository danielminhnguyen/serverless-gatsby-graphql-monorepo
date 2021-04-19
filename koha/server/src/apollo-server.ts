import { ApolloServer } from "apollo-server-lambda";
import { getConnection } from "../database";
import typeDefs from "../database/schema/koha";
import resolvers from "../database/resolvers/kohaclub";

// serverless server on aws lambda - ap-southeast-2
// as defined in serverless.yml
// need to install aws-cli
// run aws configure first
// https://ap-southeast-2.console.aws.amazon.com/lambda/home?region=ap-southeast-2#/discover
// for local development, please run npm start

const apolloServer = new ApolloServer({
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

export const graphqlHandler = apolloServer.createHandler();

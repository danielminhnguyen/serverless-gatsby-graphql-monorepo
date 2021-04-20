import { ApolloServer } from "apollo-server-lambda";
import { connect } from "./mongodb/database";
import typeDefs from "./graphql/type-defs";
import resolvers from "./graphql/resolvers";

// serverless server on aws lambda - ap-southeast-2
// as defined in serverless.yml
// need to install aws-cli
// run aws configure first
// https://ap-southeast-2.console.aws.amazon.com/lambda/home?region=ap-southeast-2#/discover
// for local development, please run npm start

// connect to mongdoDB
connect();

const server = new ApolloServer({
  resolvers,
  typeDefs,
  playground: true,
  introspection: true,
});


export const graphqlHandler = server.createHandler();

// import { ApolloServer } from "apollo-server";
// import { getConnection } from "../database";
// import typeDefs from "../database/schema/koha";
// import resolvers from "../database/resolvers/kohaclub";
// import mongoose from "mongoose";
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://gatsby:hBNWt650IxGpSDJI@cluster0.cqcjd.mongodb.net/gatsby?retryWrites=true&w=majority",
  {
    bufferCommands: false,
    bufferMaxEntries: 0,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  }
);

const Club = mongoose.model(
  "kohaclub",
  new mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    name: mongoose.SchemaTypes.String,
    Amount: mongoose.SchemaTypes.Number,
  })
);

const list = async () => {
  const result = await Club.find().exec();
  console.log(result);
  return result;
};

// const server = new ApolloServer({
//   resolvers,
//   typeDefs,
//   context: async () => {
//     const dbConn = await getConnection();
//     return { dbConn };
//   },
//   // context: { models },
//   playground: true,
//   introspection: true,
// });

// // export const graphqlHandler = apolloServer.createHandler();
// server.listen({ port: 4000 }).then(() => console.log(`server ready at `));

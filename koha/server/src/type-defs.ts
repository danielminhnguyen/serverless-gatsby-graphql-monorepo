import { gql } from "apollo-server-lambda";

export const typeDefs = gql`
  type Query {
    getClubsInfo: [kohaclub]
  }

  type kohaclub {
    _id: ID!
    name: String!
    Amount: Int
  }
`;

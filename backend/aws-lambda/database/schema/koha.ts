import { gql } from "apollo-server-lambda";

export default gql`
  type kohaclub {
    _id: ID!
    name: String!
    Amount: Int
  }
  type Query {
    kohaclub: [kohaclub]
  }
`;

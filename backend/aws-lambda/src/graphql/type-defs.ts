import { gql } from "apollo-server-lambda";

export default gql`
  type Kohaclub {
    _id: ID!
    name: String!
    Amount: Int
  }
  type Query {
    kohaclub: [Kohaclub]
  }
  type Mutation {
    payToClub(_id:ID!, Amount: Int!): Kohaclub
    addClub(name: String!) : Kohaclub
  }
`;

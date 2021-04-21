import { gql } from "apollo-server-lambda";

export default gql`
  type Kohaclub {
    _id: ID
    name: String
    Amount: Int
  }
  type Query {
    kohaclub: [Kohaclub]
    listTransactionByClubId(clubId: String): [Transactions]
    listAllTransactions: [Transactions]
  }
  type Mutation {
    payToClubById(_id: ID!, Amount: Int!): Kohaclub
    payToClubById10(_id: ID!): Kohaclub
    addClub(name: String!): Kohaclub
    deleteTrnx(_id: ID): Transactions
  }

  scalar DateTime

  type Transactions {
    _id: ID
    clubId: String
    date: DateTime
    amount: Int
  }
`;

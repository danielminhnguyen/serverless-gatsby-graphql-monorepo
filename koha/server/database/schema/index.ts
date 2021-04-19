import { gql } from "apollo-server-lambda";

import kohaclubSchema from "./koha";

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, kohaclubSchema];

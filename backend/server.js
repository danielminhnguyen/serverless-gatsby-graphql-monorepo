// NodeJS server to handle GraphQl request

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql");

const app = express();

// Simulate database from server
const customers = [
  {
    id: 1,
    firstname: "Daniel",
    lastname: "Nguyen",
    email: "danielm@missionreadyhq.com",
    mobile: 272796868,
    marketing: true,
    address: "1 ABC Street",
  },
  {
    id: 2,
    firstname: "Holger",
    lastname: "Goertz",
    email: "holger@ketekai.com",
    mobile: 212456487,
    marketing: true,
    address: "1 ABC Street",
  },
  {
    id: 3,
    firstname: "Cameron",
    lastname: "Nepe",
    email: "cam@ketekai.com",
    mobile: 212456487,
    marketing: true,
    address: "1 ABC Street",
  },
  {
    id: 4,
    firstname: "Chad",
    lastname: "Miller",
    email: "chat@ketaikai.com",
    mobile: 212456487,
    marketing: false,
    address: "1 ABC Street",
  },
];

// define customerType of the above customer database and matches with their correct GraphQLType
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  description: "This is a customer of keta kai",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    firstname: { type: GraphQLNonNull(GraphQLString) },
    lastname: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    mobile: { type: GraphQLInt },
    marketing: { type: GraphQLBoolean },
    address: { type: GraphQLString },
  }),
});

// All the query will be under one root
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    //   query all customers
    customers: {
      type: new GraphQLList(CustomerType),
      description: "List of Customers",
      resolve: () => customers,
    },
    // query customer by id
    customer: {
      type: CustomerType,
      description: "A single customer",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) =>
        customers.find((customer) => customer.id === args.id),
    },
  }),
});

// Update to query
const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    //   Customer Registration Handling
    addCustomer: {
      type: CustomerType,
      description: "Add a new customer",
      args: {
        firstname: { type: GraphQLNonNull(GraphQLString) },
        lastname: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const customer = {
          id: customers.length + 1,
          firstname: args.firstname,
          lastname: args.lastname,
          email: args.email,
        };
        customers.push(customer);
        return customer;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

// define endpoint of graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(5000, () => console.log("server running"));

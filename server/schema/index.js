const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const { GetAllCommodities } = require('./queries/commodity');
const { AddCommodity, DeleteCommodity, EditCommodity } = require('./mutations/commodity');
const { GetAllLoan } = require('./queries/loan');
const { AddLoan, RepayLoanPerStock } = require('./mutations/loan');

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    GetAllCommodities,
    GetAllLoan,
  }),
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    AddCommodity,
    DeleteCommodity,
    EditCommodity,
    AddLoan,
    RepayLoanPerStock,
  }),
});

module.exports = new GraphQLSchema({
  query, mutation,
});

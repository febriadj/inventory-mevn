const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const { GetAllCommodities } = require('./queries/commodity');
const { AddCommodity, DeleteCommodity, EditCommodity } = require('./mutations/commodity');

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    GetAllCommodities,
  }),
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    AddCommodity, DeleteCommodity, EditCommodity,
  }),
});

module.exports = new GraphQLSchema({
  query, mutation,
});

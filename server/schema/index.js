const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const { GetAllCommodities } = require('./queries/commodity');
const { AddCommodity } = require('./mutations/commodity');

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    GetAllCommodities,
  }),
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    AddCommodity,
  }),
});

module.exports = new GraphQLSchema({
  query, mutation,
});

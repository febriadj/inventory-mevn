const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const { GetAllCommodities } = require('./queries/commodity');
const { AddCommodity, DeleteCommodity, EditCommodity } = require('./mutations/commodity');
const { GetAllLoan } = require('./queries/loan');
const { AddLoan, RepayLoanPerStock } = require('./mutations/loan');
const { UserRegister, UserLogin, UserVerify } = require('./mutations/user');

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
    // user authentication
    UserRegister,
    UserLogin,
    UserVerify,
    // commodity
    AddCommodity,
    DeleteCommodity,
    EditCommodity,
    // loan
    AddLoan,
    RepayLoanPerStock,
  }),
});

module.exports = new GraphQLSchema({
  query, mutation,
});

const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const { GetAllItems } = require('./queries/item');
const { AddItem, DeleteItem, UpdateItem } = require('./mutations/item');
const { GetAllLoans } = require('./queries/loan');
const { AddLoan, RepayLoanPerStock } = require('./mutations/loan');
const { UserVerify } = require('./queries/user');
const { UserRegister, UserLogin } = require('./mutations/user');

const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    GetAllItems,
    GetAllLoans,
    UserVerify,
  }),
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // user authentication
    UserRegister,
    UserLogin,
    // item
    AddItem,
    DeleteItem,
    UpdateItem,
    // loan
    AddLoan,
    RepayLoanPerStock,
  }),
});

module.exports = new GraphQLSchema({
  query, mutation,
});

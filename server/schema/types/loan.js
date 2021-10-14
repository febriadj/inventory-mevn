const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'LoanType',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    commodityId: { type: new GraphQLNonNull(GraphQLID) },
    commodityName: {
      type: GraphQLString,
      description: 'The name of the Commodity to be borrowed',
    },
    customerName: {
      type: GraphQLString,
      description: 'The name of the customer who will make the Loan Transaction',
    },
    nik: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Population Identification Number(NIK) as valid proof of the customer when borrowing',
    },
    quantity: {
      type: GraphQLInt,
      description: 'The number of items to be borrowed will affect the price to be paid',
    },
    warehouse: { type: GraphQLString },
    price: { type: GraphQLInt },
  }),
});

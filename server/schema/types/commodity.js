const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const { GraphQLDateTime } = require('graphql-iso-date');

const commodity = new GraphQLObjectType({
  name: 'CommodityType',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Name of Commodity',
    },
    description: { type: GraphQLString },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    stock: {
      type: GraphQLInt,
      description: 'Amount of stock remaining',
    },
    warehouse: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Warehouse name for this Commodity',
    },
    category: { type: new GraphQLList(GraphQLString) },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
  }),
});

module.exports = commodity;

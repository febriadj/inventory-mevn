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
  name: 'ItemType',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    userId: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'UserId acts as a foreign key to connect with the users collection',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Name of Item',
    },
    description: {
      type: GraphQLString,
    },
    price: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    stock: {
      type: GraphQLInt,
      description: 'Amount of stock remaining',
    },
    warehouse: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Warehouse name for this Item',
    },
    category: {
      type: new GraphQLList(GraphQLString),
    },
    createdAt: {
      type: GraphQLDateTime,
    },
    updatedAt: {
      type: GraphQLDateTime,
    },
  }),
});

module.exports = commodity;

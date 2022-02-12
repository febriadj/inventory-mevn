const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');

const warehouse = new GraphQLObjectType({
  name: 'WarehouseType',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    code: {
      type: GraphQLString,
      description: 'This warehouse code has a unique value that is used to identify each warehouse',
    },
    description: { type: GraphQLString },
    location: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
  }),
});

module.exports = warehouse;

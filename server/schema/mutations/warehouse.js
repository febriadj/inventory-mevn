const { GraphQLNonNull, GraphQLString } = require('graphql');

const WarehouseType = require('../types/warehouse');
const WarehouseModel = require('../../database/models/warehouse');

exports.AddWarehouse = {
  type: WarehouseType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    code: { type: GraphQLString },
    description: { type: GraphQLString },
    location: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent, args) {
    try {
      const request = await new WarehouseModel({
        name: args.name,
        code: args.code,
        description: args.description,
        location: args.location,
      }).save();

      return request._doc;
    }
    catch (error0) {
      return new Error(error0);
    }
  },
}

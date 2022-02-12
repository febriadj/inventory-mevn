const { GraphQLNonNull, GraphQLString } = require('graphql');
const WarehouseType = require('../types/warehouse');
const WarehouseModel = require('../../database/models/warehouse');

exports.GetAllWarehouse = {
  type: WarehouseType,
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    orderBy: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      const request = await WarehouseModel.find({
        userId: args.userId,
      }).sort({ updatedAt: -args.orderBy });

      return request;
    }
    catch (error0) {
      return new Error(error0);
    }
  },
}

exports.GetWarehouseById = {
  type: WarehouseType,
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    _id: { type: new GraphQLNonNull(GraphQLString) },
    orderBy: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      const request = await WarehouseModel.findOne({
        $and: [{ userId: args.userId }, { _id: args._id }],
      });

      return request;
    }
    catch (error0) {
      return new Error(error0);
    }
  },
}

const {
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
} = require('graphql');

const CommodityType = require('../types/commodity');
const CommodityModel = require('../../database/models/commodity');

exports.GetAllCommodities = {
  type: new GraphQLList(CommodityType),
  args: {
    userId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    orderBy: {
      type: GraphQLString,
    },
  },
  resolve: async (parent, args) => {
    // by default sort all commodities data in descending
    const { orderBy = 'desc' } = args;

    const response = await CommodityModel.find({
      userId: args.userId,
    }).sort({
      updatedAt: orderBy === 'desc' ? -1 : 1,
    });

    return response;
  },
}

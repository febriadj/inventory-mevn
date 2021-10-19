const {
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
} = require('graphql');

const ItemType = require('../types/item');
const ItemModel = require('../../database/models/item');

exports.GetAllItems = {
  type: new GraphQLList(ItemType),
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

    const response = await ItemModel.find({
      userId: args.userId,
    }).sort({
      updatedAt: orderBy === 'desc' ? -1 : 1,
    });

    return response;
  },
}

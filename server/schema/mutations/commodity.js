const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const CommodityModel = require('../../database/models/commodity');
const CommodityType = require('../types/commodity');

exports.AddCommodity = {
  type: CommodityType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
    stock: { type: GraphQLInt },
    warehouse: { type: new GraphQLNonNull(GraphQLString) },
    category: { type: new GraphQLList(GraphQLString) },
  },
  resolve: async (parent, args) => {
    const commodity = await new CommodityModel(args).save();
    return commodity._doc;
  },
}

const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const CommodityModel = require('../../database/models/commodity');
const CommodityType = require('../types/commodity');

exports.AddCommodity = {
  type: CommodityType,
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
    stock: { type: GraphQLInt },
    warehouse: { type: new GraphQLNonNull(GraphQLString) },
    category: { type: new GraphQLList(GraphQLString) },
  },
  resolve: async (parent, args) => {
    try {
      const commodity = await new CommodityModel(args).save();
      return commodity._doc;
    }
    catch (error0) {
      return new Error(error0);
    }
  },
}

exports.DeleteCommodity = {
  type: CommodityType,
  args: {
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    userId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (parent, args) => {
    try {
      const response = await CommodityModel.findOneAndDelete({
        $and: [{ _id: args._id }, { userId: args.userId }],
      });
      return response;
    }
    catch (error0) {
      return new Error(error0);
    }
  },
}

exports.EditCommodity = {
  type: CommodityType,
  args: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
    stock: { type: GraphQLInt },
    warehouse: { type: GraphQLString },
    category: { type: new GraphQLList(GraphQLString) },
  },
  resolve: async (parent, args) => {
    try {
      const request = await CommodityModel.findOneAndUpdate(
        { $and: [{ _id: args._id }, { userId: args.userId }] },
        {
          $set: {
            name: args.name,
            description: args.description,
            price: args.price,
            stock: args.stock,
            warehouse: args.warehouse,
            category: args.category,
          },
        },
      );
      return request;
    }
    catch (error0) {
      return new Error(error0);
    }
  },
}

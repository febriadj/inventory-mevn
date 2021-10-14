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
      return error0.message;
    }
  },
}

exports.DeleteCommodity = {
  type: CommodityType,
  args: {
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (parent, args) => {
    try {
      const response = await CommodityModel.findOneAndDelete({ _id: args._id });
      return response;
    }
    catch (error0) {
      return error0.message;
    }
  },
}

exports.EditCommodity = {
  type: CommodityType,
  args: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
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
        { _id: args._id },
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
      return error0.message;
    }
  },
}

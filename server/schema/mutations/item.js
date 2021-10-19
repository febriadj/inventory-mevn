const {
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const ItemModel = require('../../database/models/item');
const ItemType = require('../types/item');

exports.AddItem = {
  type: ItemType,
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
      const response = await new ItemModel(args).save();
      return response._doc;
    }
    catch (error0) {
      return new Error(error0);
    }
  },
}

exports.DeleteItem = {
  type: ItemType,
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
      const response = await ItemModel.findOneAndDelete({
        $and: [{ _id: args._id }, { userId: args.userId }],
      });
      return response;
    }
    catch (error0) {
      return new Error(error0);
    }
  },
}

exports.UpdateItem = {
  type: ItemType,
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
      const request = await ItemModel.findOneAndUpdate(
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

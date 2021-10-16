const {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const LoanModel = require('../../database/models/loan');
const CommodityModel = require('../../database/models/commodity');
const LoanType = require('../types/loan');

exports.AddLoan = {
  type: LoanType,
  args: {
    commodityId: { type: new GraphQLNonNull(GraphQLID) },
    commodityName: { type: GraphQLString },
    customerName: { type: GraphQLString },
    nik: { type: new GraphQLNonNull(GraphQLString) },
    quantity: { type: GraphQLInt },
    warehouse: { type: GraphQLString },
    price: { type: GraphQLInt },
  },
  resolve: async (parent, args) => {
    try {
      // find data by id or commodity name and stock quantity above 0
      const prev = await CommodityModel.findOne(
        {
          $or: [{ _id: args.commodityId }, { name: args.commodityName }],
        },
      );
      // if the previous stock quantity is less than
      // the stock quantity requested by the customer, return an error message
      if (prev.stock - args.quantity < 0) {
        const newErr = `There are currently ${prev.stock} stocks of commodities left, the loan request that you submitted cannot be accepted by us`;
        throw new Error(newErr);
      }

      // reduction in the number of commodity stocks
      await CommodityModel.findOneAndUpdate(
        { _id: args.commodityId },
        {
          $inc: { stock: -args.quantity },
        },
      );

      const request = await new LoanModel(args).save();
      return request._doc;
    }
    catch (error0) {
      return error0;
    }
  },
}

exports.RepayLoanPerStock = {
  type: LoanType,
  args: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args) => {
    try {
      const prev = await LoanModel.findOne({ _id: args._id });

      // if the previous stock quantity is less than
      // the stock quantity requested by the customer, return an error message
      if (prev.quantity - args.quantity < 0) {
        const newErr = `Currently there are ${prev.quantity} loan amounts remaining, the loan request that you submitted cannot be accepted by us`;
        throw new Error(newErr);
      }

      const request = await LoanModel.findOneAndUpdate(
        { _id: args._id },
        {
          // reduce the amount of the price to be paid
          $set: { price: Math.round(prev.price / args.quantity) },
          // reduction in the number of loan quantity
          $inc: { quantity: -args.quantity },
        },
      );

      const check = await LoanModel.findOne({ _id: args._id });
      // if the quantity is 0, delete the loan data
      if (check.quantity === 0) {
        await LoanModel.findOneAndDelete({ _id: args._id });
      }

      // add the number of commodity stocks with the amount of
      // the loan quantity want to return
      await CommodityModel.findOneAndUpdate(
        { _id: request.commodityId },
        { $inc: { stock: args.quantity } },
      );

      return request;
    }
    catch (error0) {
      return error0;
    }
  },
}

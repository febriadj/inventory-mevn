const {
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const LoanModel = require('../../database/models/loan');
const ItemModel = require('../../database/models/item');
const LoanType = require('../types/loan');

exports.AddLoan = {
  type: LoanType,
  args: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    itemId: { type: new GraphQLNonNull(GraphQLID) },
    itemName: { type: GraphQLString },
    customerName: { type: GraphQLString },
    nik: { type: new GraphQLNonNull(GraphQLString) },
    quantity: { type: GraphQLInt },
    warehouse: { type: GraphQLString },
    price: { type: GraphQLInt },
  },
  resolve: async (parent, args) => {
    try {
      // find data by id or item name and stock quantity above 0
      const prev = await ItemModel.findOne({
        $and: [{
          $or: [{ _id: args.itemId }, { name: args.itemName }],
          userId: args.userId,
        }],
      });

      if (!prev) {
        const newErr = 'Loan requests are not allowed';
        throw newErr;
      }

      // if the previous stock quantity is less than
      // the stock quantity requested by the customer, return an error message
      if (prev.stock - args.quantity < 0) {
        const newErr = `There are currently ${prev.stock} stocks of commodities left, the loan request that you submitted cannot be accepted by us`;
        throw newErr;
      }

      // reduction in the number of item stocks
      await ItemModel.findOneAndUpdate(
        { $and: [{ _id: args.itemId }, { userId: args.userId }] },
        { $inc: { stock: -args.quantity } },
      );

      const request = await new LoanModel(args).save();
      return request._doc;
    }
    catch (error0) {
      return new Error(error0);
    }
  },
}

exports.RepayLoanPerStock = {
  type: LoanType,
  args: {
    _id: { type: new GraphQLNonNull(GraphQLID) },
    userId: { type: new GraphQLNonNull(GraphQLString) },
    quantity: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args) => {
    try {
      const prev = await LoanModel.findOne({
        $and: [{ _id: args._id }, { userId: args.userId }],
      });

      if (!prev) {
        const newErr = 'Request for loan repayment is not allowed';
        throw newErr;
      }

      // if the previous stock quantity is less than
      // the stock quantity requested by the customer, return an error message
      if (prev.quantity - args.quantity < 0) {
        const newErr = `Currently there are ${prev.quantity} loan amounts remaining, the loan request that you submitted cannot be accepted by us`;
        throw newErr;
      }

      const request = await LoanModel.findOneAndUpdate(
        { $and: [{ _id: args._id }, { userId: args.userId }] },
        {
          // reduce the amount of the price to be paid
          $set: { price: Math.round(prev.price / args.quantity) },
          // reduction in the number of loan quantity
          $inc: { quantity: -args.quantity },
        },
      );

      const check = await LoanModel.findOne({
        $and: [{ _id: args._id }, { userId: args.userId }],
      });

      // if the quantity is 0, delete the loan data
      if (check.quantity === 0) {
        await LoanModel.findOneAndDelete({ _id: args._id });
      }

      // add the number of item stocks with the amount of
      // the loan quantity want to return
      await ItemModel.findOneAndUpdate(
        { $and: [{ _id: request.itemId }, { userId: args.userId }] },
        { $inc: { stock: args.quantity } },
      );

      return request;
    }
    catch (error0) {
      return new Error(error0);
    }
  },
}

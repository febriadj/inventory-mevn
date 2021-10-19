const {
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
} = require('graphql');

const LoanModel = require('../../database/models/loan');
const LoanType = require('../types/loan');

exports.GetAllLoans = {
  type: new GraphQLList(LoanType),
  args: {
    userId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    orderBy: {
      type: GraphQLString,
    },
  },
  resolve: async (parent, args) => {
    try {
      // by default sort all commodities data in descending
      const { orderBy = 'desc' } = args;

      const response = await LoanModel.find({
        userId: args.userId,
      }).sort({
        updatedAt: orderBy === 'desc' ? -1 : 1,
      });

      return response;
    }
    catch (error0) {
      return error0;
    }
  },
}

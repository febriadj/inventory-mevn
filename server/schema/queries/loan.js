const {
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
} = require('graphql');

const LoanModel = require('../../database/models/loan');
const LoanType = require('../types/loan');

exports.GetAllLoan = {
  type: new GraphQLList(LoanType),
  args: {
    orderBy: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (parent, args) => {
    try {
      // by default sort all commodities data in descending
      const { orderBy = 'desc' } = args;

      const response = await LoanModel.find().sort({
        updatedAt: orderBy === 'desc' ? -1 : 1,
      });

      return response;
    }
    catch (error0) {
      return error0;
    }
  },
}

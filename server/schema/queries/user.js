const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} = require('graphql');

const jwt = require('jsonwebtoken');

const UserModel = require('../../database/models/user');
const UserType = require('../types/user');

exports.UserVerify = {
  type: UserType,
  args: {
    tokenExists: { type: new GraphQLNonNull(GraphQLBoolean) },
    token: { type: GraphQLString },
  },
  resolve: async (parent, args) => {
    try {
      if (!args.tokenExists) {
        const newErr = 'Authentication token not found';
        throw newErr;
      }

      const user = await jwt.verify(args.token, process.env.SECRET_TOKEN);
      // output example: { _id: ..., iat: ... }
      const request = await UserModel.findOne({ _id: user._id });
      return request;
    }
    catch (error0) {
      return new Error(error0);
    }
  },
}

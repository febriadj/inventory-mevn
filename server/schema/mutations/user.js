const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
} = require('graphql');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserModel = require('../../database/models/user');
const UserType = require('../types/user');

exports.UserRegister = {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    profileName: { type: GraphQLString },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args) => {
    try {
      // hash password with salt
      const hashPassword = await bcrypt.hash(
        args.password,
        await bcrypt.genSalt(10),
      );

      const request = await new UserModel({
        email: args.email,
        profileName: args.profileName,
        password: hashPassword,
      }).save();

      return request._doc;
    }
    catch (error0) {
      return new Error(error0);
    }
  },
}

exports.UserLogin = {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args) => {
    try {
      // search user data by email
      const request = await UserModel.findOne({ email: args.email });
      // if no user matches this email, return an error message
      if (!request) {
        const newErr = 'The User with this Email was not found';
        throw newErr;
      }

      // compare password
      const comparePass = await bcrypt.compare(args.password, request.password);
      // if the password does not match, return an error message
      if (!comparePass) {
        const newErr = 'Password does not match this account';
        throw newErr;
      }

      // generate jwt tokens
      const createToken = await jwt.sign({ _id: request._id }, process.env.SECRET_TOKEN);

      return { token: createToken };
    }
    catch (error0) {
      return new Error(error0);
    }
  },
}

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

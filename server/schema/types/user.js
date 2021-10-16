const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    _id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    profileName: { type: GraphQLString },
    photo: { type: GraphQLString },
    password: { type: new GraphQLNonNull(GraphQLString) },
    token: { type: GraphQLString },
  }),
});

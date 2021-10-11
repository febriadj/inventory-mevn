require('dotenv').config();

const express = require('express');
const cors = require('cors');
// graphql http services
const { graphqlHTTP } = require('express-graphql');

const database = require('./database/connect');
const schema = require('./schema/index');
// connect database mongodb
database();

const app = express();
app.use(cors());
// build graphql playground
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

module.exports = app;

/* @flow */

import schema from './graphql/schema';

import express from 'express';
import graphqlHTTP from 'express-graphql';

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(3000);

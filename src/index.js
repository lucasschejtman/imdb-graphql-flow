/* @flow */

import schema from './graphql/schema';

import express from 'express';
import graphqlHTTP from 'express-graphql';
import { when, equals } from 'ramda';

//Very simple and early version that works fine
//TODO: Store more data locally
//TODO: Dynamically load data into cache
//TODO: Move to another file ?? 
const hydrateCache = (): bool => {
  const cache = require('./utils/cache');
  const title = require('./mocks/title');
  cache.set(title.id)(title);
  return true;
};

when(equals('true'), hydrateCache)(process.env.offline);

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(3000);

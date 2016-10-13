/* @flow */

import schema from './graphql/schema';

import cors from 'cors';
import express from 'express';
import graphqlHTTP from 'express-graphql';

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(process.env.PORT || 3000);

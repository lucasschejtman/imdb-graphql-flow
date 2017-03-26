import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import * as graphql from 'graphql';

// tslint:disable-next-line:no-suspicious-comment
//TODO: Make compiled code work with absolute resolution
import schema from './schema';

// tslint:disable-next-line:no-multiline-string
const builtSchema = graphql.buildSchema(schema);

/**
 * Test Fn
 *
 * @returns {string} Returns 'world'
 */
const greet = (): string => 'world';

const root: object = {
    hello: greet
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: builtSchema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000);

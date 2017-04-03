import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import * as graphql from 'graphql';

// tslint:disable-next-line:no-suspicious-comment
//TODO: Make compiled code work with absolute resolution
import schema from './schema';

const builtSchema = graphql.buildSchema(schema);

const cache = {
    greet: 'world'
};

/**
 * Test query
 *
 * @returns {string} Returns 'world'
 */
const greet = (): string => cache.greet;

/**
 * Test mutation
 * 
 * @returns {string} Returns 'saved'
 */
const saveGreeting = (): string => {
    cache.greet = 'another greeting';
    return cache.greet;
};

const root: object = {
    hello: greet,
    saveGreeting: saveGreeting
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: builtSchema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000);

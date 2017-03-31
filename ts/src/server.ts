import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import * as graphql from 'graphql';

// tslint:disable-next-line:no-multiline-string
const schema = graphql.buildSchema(`
    type Query {
        hello: String
    }

    type Mutation {
        saveGreeting: Fn
    }
`);

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
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000);

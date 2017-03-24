import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import * as graphql from 'graphql';

// tslint:disable-next-line:no-multiline-string
const schema = graphql.buildSchema(`
    type Query {
        hello: String
    }
`);

/**
 * Test Fn
 *
 * @returns {string} Returns 'world'
 */
function greet(): string {
    return 'world';
}

const root = {
    hello: greet
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000);

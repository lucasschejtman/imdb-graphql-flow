const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
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

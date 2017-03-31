/**
 * Main schema file
 */

// tslint:disable-next-line:no-multiline-string
const schema = `
    type Query {
        hello: String
    }
    type Mutation {
        saveGreeting: Fn
    }
`;

export default schema;

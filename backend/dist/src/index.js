"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const resolvers_1 = require("../graphql/resolvers");
const server = new graphql_yoga_1.GraphQLServer({
    typeDefs: "graphql/schema.graphql",
    resolvers: resolvers_1.default,
});
server.start(() => console.log("Graphql Server Running"));
//# sourceMappingURL=index.js.map
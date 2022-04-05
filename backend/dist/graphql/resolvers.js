"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./../db/db");
const resolvers = {
    Query: {
        movies: (_, { ratring, limit }) => (0, db_1.getMovies)(ratring, limit),
        movie: (_, { id }) => (0, db_1.getMovie)(id),
        suggestions: (_, { id }) => (0, db_1.getSuggestions)(id),
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map
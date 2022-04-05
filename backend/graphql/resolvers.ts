import { getMovie, getMovies, getSuggestions } from "./../db/db";

const resolvers = {
  Query: {
    movies: (_, { ratring, limit }) => getMovies(ratring, limit),
    movie: (_, { id }) => getMovie(id),
    suggestions: (_, { id }) => getSuggestions(id),
  },
};

export default resolvers;

'use strict';

/**
 * Dependencies
 */

const path = require('path');
const { GraphQLServer } = require('graphql-yoga');

/**
 * Constants
 */

const port = process.env.PORT || 18888;

/**
 * Define resolvers
 */

const resolvers = {
  Query: require('./resolvers/Query'),
};

/**
 * Define server
 */

const server = new GraphQLServer({
  typeDefs: path.resolve(path.join(__dirname, 'schema.graphql')),
  resolvers,
});

/**
 * Start server
 */

if (module === require.main) {
  server.start({ port }, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

/**
 * Export server
 */

module.exports = server;

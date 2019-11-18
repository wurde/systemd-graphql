#!/usr/bin/env node

'use strict';

/**
 * Dependencies
 */

const path = require('path');
const { GraphQLServer } = require('graphql-yoga');
const pidof = require('./helpers/pidof');

/**
 * Constants
 */

const port = process.env.PORT || 18888;

/**
 * Require root privileges.
 */

if (process.getuid() !== 0) {
  throw new Error('This server requires root privileges.');
}

/**
 * Require systemd is the init process.
 */

if (!pidof('/sbin/init').includes(pidof('systemd').pop())) {
  throw new Error('The init process must be systemd.');
}

/**
 * Define resolvers
 */

const resolvers = {
  Query: require('./resolvers/Query'),
  Mutation: require('./resolvers/Mutation'),
  Unit: require('./resolvers/Unit'),
  UnitStatus: require('./resolvers/UnitStatus'),
  Date: require('./resolvers/Date'),
  JSON: require('./resolvers/JSON'),
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

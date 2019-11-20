#!/usr/bin/env node

/**
 * Dependencies
 */

const server = require('../index');

/**
 * Constants
 */

const port = process.env.SYSTEMD_GRAPHQL_PORT || 18888;

/**
 * Start server
 */

server.start({ port }, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

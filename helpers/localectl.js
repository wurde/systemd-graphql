/**
 * Dependencies
 */

const child_process = require('child_process');

/**
 * Define helper
 */

function localectl(args) {
  return child_process.spawnSync('localectl', args, {
    encoding: 'utf8'
  });
}

/**
 * Export helper
 */

module.exports = localectl;

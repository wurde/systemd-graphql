/**
 * Dependencies
 */

const child_process = require('child_process');

/**
 * Define helper
 */

function loginctl(args) {
  return child_process.spawnSync('loginctl', args, {
    encoding: 'utf8'
  });
}

/**
 * Export helper
 */

module.exports = loginctl;

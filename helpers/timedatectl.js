/**
 * Dependencies
 */

const child_process = require('child_process');

/**
 * Define helper
 */

function timedatectl(args) {
  return child_process.spawnSync('timedatectl', args, {
    encoding: 'utf8'
  });
}

/**
 * Export helper
 */

module.exports = systemctl;

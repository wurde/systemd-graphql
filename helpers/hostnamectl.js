/**
 * Dependencies
 */

const child_process = require('child_process');

/**
 * Define helper
 */

function hostnamectl(args) {
  return child_process.spawnSync('hostnamectl', args, {
    encoding: 'utf8'
  });
}

/**
 * Export helper
 */

module.exports = systemctl;

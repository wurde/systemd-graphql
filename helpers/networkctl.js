/**
 * Dependencies
 */

const child_process = require('child_process');

/**
 * Define helper
 */

function networkctl(args) {
  return child_process.spawnSync('networkctl', args, {
    encoding: 'utf8'
  });
}

/**
 * Export helper
 */

module.exports = networkctl;

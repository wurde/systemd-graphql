/**
 * Dependencies
 */

const child_process = require('child_process');

/**
 * Define helper
 */

function journalctl(args) {
  return child_process.spawnSync('journalctl', args, {
    encoding: 'utf8'
  });
}

/**
 * Export helper
 */

module.exports = journalctl;

/**
 * Dependencies
 */

const path = require('path');

/**
 * Define helper
 */

function unitListParser(stdout) {
  return stdout.trim().split('\n').map(line => {
    const cols = line.split(/\s+/);
    const type = path
      .extname(cols[0])
      .toUpperCase()
      .replace('.', '');

    return {
      name: cols[0],
      type: type
    };
  });
}

/**
 * Export helper
 */

module.exports = unitListParser;

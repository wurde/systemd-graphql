/**
 * Dependencies
 */

const camelcase = require('camelcase');

/**
 * Define helper
 */

function audioPropertyParser(inputStr) {
  const obj = inputStr.split('\n').reduce((obj, line, i) => {
    if (i === 0) {
      obj['id'] = parseInt(line.match(/\d+/)[0]);
    } else {
      line = line.trim();
      let cols = line.split(/: (.+)/);

      if (cols.length < 2) {
        cols = line.split('=').map(col => col.replace(/"/g, ''));
      }
      if (cols.length > 1) {
        obj[camelcase(cols[0].trim())] = cols[1].trim().replace(/"/g, "'");
      }
    }
    return obj;
  }, {});

  return JSON.stringify(obj);
}

/**
 * Export helper
 */

module.exports = audioPropertyParser;

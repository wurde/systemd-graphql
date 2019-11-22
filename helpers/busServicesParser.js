/**
 * Dependencies
 */

const camelcase = require('camelcase');

/**
 * Define helper
 */

function busServicesParser(line) {
  const obj = {};
  const cols = line.trim().split(/\s+/);

  obj["name"] = cols[0];
  obj["pid"] = cols[1];
  obj["process"] = cols[2];
  obj["user"] = cols[3];
  obj["connection"] = cols[4];
  obj["unit"] = cols[5];
  obj["session"] = cols[6];
  obj["description"] = cols[7];

  return JSON.stringify(obj);
}

/**
 * Export helper
 */

module.exports = busServicesParser;

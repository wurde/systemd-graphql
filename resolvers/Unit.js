/**
 * Dependencies
 */

const systemctl = require('../helpers/systemctl');

/**
 * Define and export resolvers
 */

exports.status = (parent, args) => {
  try {
    const result = systemctl(['status', parent.name]);

    const res = {};
    res['statusCode'] = result.status;

    const lines = result.stdout.split('\n');
    lines.forEach(line => {
      if (line.match(/Loaded/)) {
        res['loadState'] = line.trim().split(' ')[1];
      }
      if (line.match(/Active/)) {
        res['activeState'] = line.trim().split(' ')[1];
      }
      if (line.match(/Main PID/)) {
        res['mainPid'] = line.match(/\b\d+\b/)[0];
      }
    });

    return res;
  } catch (e) {
    console.error('e', e);
  }
};

exports.dependencies = () => {
  return [];
};

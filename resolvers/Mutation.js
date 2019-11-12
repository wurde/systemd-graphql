/**
 * Dependencies
 */

const child_process = require('child_process');

/**
 * Define and export resolvers
 */

exports.start = (parent, args) => {
  try {
    console.log('args.pattern', args.pattern);
    const result = child_process.spawnSync(
      'systemctl',
      ['start', args.pattern],
      { encoding: 'utf8' }
    );
    console.log('result', result);
    return true

    // const res = {};
    // res['statusCode'] = result.status;

    // const lines = result.stdout.split('\n');
    // lines.forEach(line => {
    //   if (line.match(/Loaded/)) {
    //     res['loadState'] = line.trim().split(' ')[1];
    //   }
    //   if (line.match(/Active/)) {
    //     res['activeState'] = line.trim().split(' ')[1];
    //   }
    //   if (line.match(/Main PID/)) {
    //     res['mainPid'] = line.match(/\b\d+\b/)[0];
    //   }
    // })

    // return res;
  } catch (e) {
    console.error('e', e);
    return false
  }
};

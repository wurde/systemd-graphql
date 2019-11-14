/**
 * Dependencies
 */

const path = require('path');
const child_process = require('child_process');
const systemctl = require('../helpers/systemctl');
const unitListParser = require('../helpers/unitListParser');
const systemdAnalyze = require('../helpers/systemdAnalyze');

/**
 * Define and export resolvers
 */

exports.info = () => {
  return 'This is a GraphQL API for systemd.';
};

exports.version = () => {
  const result = systemctl(['daemon-reload', '--version']);
  return result.match(/\b\d+\b/)[0];
};

exports.isSystemRunning = () => {
  const result = systemctl(['is-system-running']);
  return result.stdout.trim();
};

exports.status = (parent, args) => {
  try {
    const result = systemctl(['status', args.pattern]);

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
    })

    return res;
  } catch (e) {
    console.error('e', e);
  }
};

exports.getDefault = () => {
  return systemctl(['get-default']).stdout.trim();
};

exports.isActive = (parent, args) => {
  return systemctl(['is-active', args.pattern]).status;
};

exports.isFailed = (parent, args) => {
  return systemctl(['is-failed', args.pattern]).status;
};

exports.isEnabled = (parent, args) => {
  return systemctl(['is-enabled', args.pattern]).status;
};

exports.units = () => {
  const result = child_process.spawnSync(
    'systemctl',
    ['list-units', '--full', '--plain', '--no-legend', '--no-pager'],
    { encoding: 'utf8' }
  );

  const unitList = result.stdout.trim().split('\n').map(unitLine => {
    const cols = unitLine.split(/\s+/);
    const type = path.extname(cols[0]).toUpperCase().replace('.', '');

    return {
      name: cols[0],
      type: type,
    }
  });

  return unitList;
};

exports.services = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=service'
  ]);

  return unitListParser(result.stdout);
};

exports.sockets = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=socket'
  ]);

  return unitListParser(result.stdout);
};

exports.devices = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=device'
  ]);
  
  return unitListParser(result.stdout);
};

exports.mounts = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=mount'
  ]);

  return unitListParser(result.stdout);
};

exports.automounts = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=automount'
  ]);

  return unitListParser(result.stdout);
};

exports.swaps = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=swap'
  ]);

  return unitListParser(result.stdout);
};

exports.targets = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=target'
  ]);

  return unitListParser(result.stdout);
};

exports.paths = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=path'
  ]);

  return unitListParser(result.stdout);
};

exports.timers = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=timer'
  ]);

  return unitListParser(result.stdout);
};

exports.slices = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=slice'
  ]);

  return unitListParser(result.stdout);
};

exports.scopes = () => {
  const result = systemctl([
    'list-units',
    '--full',
    '--plain',
    '--no-legend',
    '--no-pager',
    '--type=scope'
  ]);
  
  return unitListParser(result.stdout);
};

exports.blame = () => {
  const result = systemdAnalyze(['blame']);
  const units = result.stdout.trim().split('\n').map(line => {
    const cols = line.trim().split(/\s+/);
    const timeStr = cols[0];
    const prefix = timeStr.match(/\D+$/)[0];

    /**
     * Convert time to milliseconds.
     */

    let time
    if (prefix === 'ms') {
      time = parseInt(timeStr.replace(/\D/g, ''));
    } else if (prefix === 's') {
      time = parseInt(parseFloat(timeStr.replace(/\D+$/, '')) * 1000);
    }

    return {
      timeToInitialize: time,
      name: cols[1]
    };
  })

  return units;
};

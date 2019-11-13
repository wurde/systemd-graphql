/**
 * Define and export resolvers
 */

exports.statusCode = () => {
  return 0;
};

exports.loadState = () => {
  return 'loaded';
};

exports.activeState = () => {
  return 'active';
};

exports.mainPid = () => {
  return 0;
};

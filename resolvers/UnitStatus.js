/**
 * Define and export resolvers
 */

exports.statusCode = (parent) => {
  return parent.statusCode;
};

exports.loadState = (parent) => {
  return parent.loadState;
};

exports.activeState = (parent) => {
  return parent.activeState;
};

exports.mainPid = (parent) => {
  return parent.mainPid;
};

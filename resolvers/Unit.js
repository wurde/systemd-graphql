/**
 * Define and export resolvers
 */

exports.type = (parent) => {
  return parent.type;
};

exports.dependencies = () => {
  return [];
};

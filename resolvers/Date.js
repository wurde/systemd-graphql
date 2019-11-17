/**
 * Define and export resolvers
 */

exports.parseValue = (value) => {
  return new Date(value);
}

exports.serialize = (value) => {
  return new Date(value).toISOString().slice(0, 10);
}

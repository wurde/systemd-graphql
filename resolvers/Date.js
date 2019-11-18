/**
 * Define and export resolvers
 */

exports.parseValue = (value) => {
  return new Date(value).toISOString().slice(0, 10);
}

exports.serialize = (value) => {
  return new Date(value).toISOString().slice(0, 10);
}

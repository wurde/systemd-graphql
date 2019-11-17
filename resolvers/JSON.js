/**
 * Define and export resolvers
 */

exports.parseValue = (value) => {
  return new Date(value); // value from the client
}

exports.serialize = (value) => {
  return value.getTime(); // value sent to the client
}

exports.parseLiteral = (ast) => {
  if (ast.kind === Kind.INT) {
    return parseInt(ast.value, 10); // ast value is always in string format
  }
  return null;
}

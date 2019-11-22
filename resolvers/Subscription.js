/**
 * Dependencies
 */

const busctl = require('../helpers/busctl');

/**
 * Define and export resolvers
 */

exports.log = {
  subscribe: (parent, args, context) => {
    return context.pubsub.asyncIterator([...Object.values(context.events)]);
  },
};

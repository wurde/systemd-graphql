/**
 * Dependencies
 */

const busctl = require('../helpers/busctl');

/**
 * Constants
 */

const SOMETHING_CHANGED_TOPIC = 'something_changed';

/**
 * Define and export resolvers
 */

exports.somethingChanged = {
  subscribe: (parent, args, context) => context.pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC),
};

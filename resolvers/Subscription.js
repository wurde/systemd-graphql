/**
 * Dependencies
 */

const busctl = require('../helpers/busctl');

/**
 * Define and export resolvers
 */

exports.somethingChanged = {
  subscribe: (parent, args, context) => {
    console.log('Subscription.somethingChanged')
    return context.pubsub.asyncIterator(context.events.SOMETHING_CHANGED_TOPIC);
  },
};

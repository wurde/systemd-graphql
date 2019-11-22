/**
 * Define helper
 */

function log(context, event, args, status) {
  context.pubsub.publish(context.events[event], {
    log: JSON.stringify({
      createdAt: new Date(),
      event: event,
      args: args,
      status: status
    })
  });
}

/**
 * Export helper
 */

module.exports = log;

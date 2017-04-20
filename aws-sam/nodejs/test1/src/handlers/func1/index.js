'use strict';

exports.handler = function(event, context) {
    if((event.name === 'Richard') || (event.name === 'rhyatt')) {
      return context.succeed( { valid: true } );
    }
    context.fail(new Error('unknown name'));
};

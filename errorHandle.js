'use strict';

module.exports.errHandle = (ctx, next) => {
    return next().catch(err => {
        ctx.status = 400;
        ctx.body = `${err.message}`;
        console.log('Error handler:', err.message);
    })
};

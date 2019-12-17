'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  return async function auth(ctx, next) {
    const { config } = app;
    const user = ctx.session.user;
    if (user._id === ctx.params.userId) {
      return next()
    }
    ctx.status = config.statusCode.UNAUTHORIZED;
    ctx.body = { login: true, message: '用户未登录' };
    return;
  };
};

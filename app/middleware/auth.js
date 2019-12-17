'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  return async function auth(ctx, next) {
    const { config } = app;
    if (ctx.session.user) {
      return next()
    }
    ctx.status = config.statusCode.UNAUTHORIZED;
    ctx.body = { login: true, message: '用户未登录' };
    return;
  };
};

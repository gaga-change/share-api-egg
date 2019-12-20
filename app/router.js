'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const auth = app.middleware.auth(app);

  router.get('/', controller.home.index);

  // ## auth
  router.post('/api/auth/login', controller.auth.login); // 登录
  router.post('/api/auth/register', controller.auth.register); // 注册
  router.get('/api/auth/current', controller.auth.current); // 当前用户
  router.get('/api/auth/logout', controller.auth.logout); // 退出登录
  router.post('/api/auth/updatePwd', controller.auth.updatePwd); // 修改密码

  // ## user
  router.get('/api/users', controller.user.index);
  router.get('/api/users/:id', controller.user.show);
  router.put('/api/users', auth, controller.user.update);

  // ## 主内容
  router.get('/api/posts', controller.post.index);
  router.get('/api/posts/:id', controller.post.show);
  router.post('/api/posts', auth, controller.post.create);
  router.put('/api/posts/:id', auth, controller.post.update);
  router.delete('/api/posts/:id', auth, controller.post.destroy);
};

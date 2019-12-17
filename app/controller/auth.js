'use strict';

const Controller = require('egg').Controller;

/**
 * @param {Egg.Application} app - egg application
 */
class AuthController extends Controller {
  constructor(...args) {
    super(...args);
    this.User = this.ctx.model.User;
  }

  /**
   * 登录
   */
  async login() {
    const { ctx, User } = this;
    const body = ctx.request.body;
    ctx.assert(body.email, '邮箱不能为空', 400);
    ctx.assert(body.password, '密码不能为空', 400);
    const findUser = await User.findOne({ email: body.email });
    ctx.assert(findUser, '邮箱不存在', 400);
    ctx.assert(findUser.authenticate(body.password), '密码错误', 400);
    ctx.body = ctx.session.user = findUser;
  }

  /**
   * 注册
   */
  async register() {
    const { ctx, User } = this;
    const body = ctx.request.body;
    ctx.assert(body.email, '邮箱不能为空', 400);
    ctx.assert(body.nickname, '昵称不能为空', 400);
    ctx.assert(body.password, '密码不能为空', 400);
    const user = await new User(body).save()
    ctx.body = ctx.session.user = user;
  }

  /**
   * 获取当前用户
   */
  async current() {
    this.ctx.body = this.ctx.session.user;
  }

  /**
   * 退出登录
   */
  async logout() {
    this.ctx.session.user = null;
    this.ctx.body = null;
  }
}

module.exports = AuthController;

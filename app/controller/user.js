'use strict';

const BaseController = require('../core/base-controller');

/**
 * @param {Egg.Application} app - egg application
 */
class UserController extends BaseController {
  constructor(...args) {
    super({
      modelName: 'User',
    }, ...args);
    this.User = this.ctx.model.User;
  }

  /** 修改用户信息 */
  async update() {
    const { ctx, User } = this;
    const { _id } = ctx.session.user
    const user = ctx.only(ctx.request.body, 'email nickname');
    const temp = await User.findByIdAndUpdate(_id, user, { new: true });
    ctx.assert(temp, this.config.statusCode.NO_FOUND, '当前用户已被删除');
    ctx.session.user = temp
    this.success(null, this.config.statusCode.NO_CONENT)
  }
}

module.exports = UserController;

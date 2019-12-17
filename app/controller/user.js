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

  async update() {
    const { ctx } = this;
    const { userId: id } = ctx.params;
    const user = ctx.request.body;
    
    const temp = await this.User.updateOne({ _id: id }, user);
    ctx.assert(temp.nModified === 1, this.config.statusCode.NO_FOUND, '资源不存在');
    this.success(null, this.config.statusCode.NO_CONENT);
  }
}

module.exports = UserController;

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

  async show() {
    const { ctx, config } = this;
    const { id } = ctx.params;
    const { select } = ctx.query;
    const mongoQuery = this.User.findById(id).populate([{ path: 'lovePosts', populate: { path: 'auther' } }]);
    if (select) {
      mongoQuery.select(select);
    }
    const item = await mongoQuery;
    ctx.assert(item, config.statusCode.NO_FOUND, '资源不存在');
    this.success(item);
  }

  async update() {
    const { ctx } = this;
    const { _id } = ctx.session.user
    const user = ctx.request.body;
    console.log(user, _id)
        /*
    如果新增喜欢，则 更新时附加 {$ne: {lovePosts: lovePosts}}  以及手动添加到第一个位置。前台只需传 lovePosts: id
    */
    const temp = await this.User.updateOne({ _id }, user);
    ctx.assert(temp.nModified === 1, this.config.statusCode.NO_FOUND, '资源不存在');
    this.success(null, this.config.statusCode.NO_CONENT);
  }
}

module.exports = UserController;

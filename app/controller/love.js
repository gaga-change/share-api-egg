'use strict';

const BaseController = require('../core/base-controller');

/**
 * @param {Egg.Application} app - egg application
 */
class LoveController extends BaseController {
  constructor(...args) {
    super({
      modelName: 'Love',
      populates: [{ path: 'post' }]
    }, ...args);
    this.Love = this.ctx.model.Love;
  }

  async create() {
    const { ctx, config, Love } = this;
    let item = ctx.request.body;

    item = new Love(item);
    item.auther = ctx.session.user._id
    this.success(await item.save(), config.statusCode.CREATE);
  }

  async destroy() {
    const { ctx, config } = this;
    const { id } = ctx.params;

    const temp = await this.Model.deleteOne({ _id: id, auther: ctx.session.user._id });
    ctx.assert(temp.deletedCount === 1, config.statusCode.NO_FOUND, '资源不存在');
    this.success(null, config.statusCode.NO_CONENT);
  }
}

module.exports = LoveController;

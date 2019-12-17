'use strict';

const BaseController = require('../core/base-controller');

/**
 * @param {Egg.Application} app - egg application
 */
class PostController extends BaseController {
  constructor(...args) {
    super({
      modelName: 'Post',
      populates: [
        { path: 'auther' }
      ],
    }, ...args);
    this.Post = this.ctx.model.Post;
  }
  async create() {
    const { ctx, config } = this;
    let post = ctx.request.body;

    post = new this.Post(post);
    post.auther = ctx.session.user
    this.success(await post.save(), config.statusCode.CREATE);
  }

  async destroy() {
    const { ctx, config } = this;
    const { id } = ctx.params;

    const temp = await this.Post.deleteOne({ _id: id, auther: ctx.session.user });
    ctx.assert(temp.deletedCount === 1, config.statusCode.NO_FOUND, '资源不存在');
    this.success(null, config.statusCode.NO_CONENT);
  }

  async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const post = ctx.request.body;

    const temp = await this.Post.updateOne({ _id: id, auther: ctx.session.user }, post);
    ctx.assert(temp.nModified === 1, this.config.statusCode.NO_FOUND, '资源不存在');
    this.success(null, this.config.statusCode.NO_CONENT);
  }
}

module.exports = PostController;

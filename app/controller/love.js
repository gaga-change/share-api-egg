'use strict';

const BaseController = require('../core/base-controller');

/**
 * @param {Egg.Application} app - egg application
 */
class LoveController extends BaseController {
  constructor(...args) {
    super({
      modelName: 'Love',
    }, ...args);
    this.Love = this.ctx.model.Love;
  }
}

module.exports = LoveController;

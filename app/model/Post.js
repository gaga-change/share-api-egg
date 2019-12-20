'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PostSchema = new Schema({
    content: { type: String, default: '', trim: true }, // 主内容（本期是url地址），不排除后期会出现其他形式内容
    describe: { type: String, default: '', trim: true }, // 描述
    loveNum: { type: Number, default: 0 }, // 喜欢的总人数
    tags: [{ type: String, trim: true }], // 标签
    auther: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }, {
    timestamps: true,
  });

  return mongoose.model('Post', PostSchema, 'share_post');
};


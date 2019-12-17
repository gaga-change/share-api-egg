'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PostSchema = new Schema({
    gitUrl: {type: String, default: '', trim: true}, // git url地址
    describe: {type: String, default: '', trim: true}, // 描述
    tags: [{type: String, trim: true}], // 标签
    creater: [{type: Schema.Types.ObjectId, ref: 'User' }]
  }, {
    timestamps: true,
  });

  return mongoose.model('Post', PostSchema, 'share_post');
};


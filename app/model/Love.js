'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const LoveSchema = new Schema({
    auther: [{ type: Schema.Types.ObjectId, ref: 'User', index: true }],
    post: [{ type: Schema.Types.ObjectId, ref: 'Post', index: true }]
  }, {
    timestamps: true,
  });

  return mongoose.model('Love', LoveSchema, 'share_love');
};


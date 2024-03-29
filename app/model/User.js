'use strict';

const crypto = require('crypto');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    email: { type: String, minlength: 1, maxlength: 100, trim: true, unique: true }, // 邮箱 & 登录名
    nickname: { type: String, minlength: 1, maxlength: 10, trim: true, unique: true }, // 别名
    salt: { default: '', type: String },
    hashedPassword: { default: '', type: String },
  }, {
    timestamps: true,
  });

  /** 虚拟属性 */
  UserSchema.virtual('password').set(function set(password) {
    this.textPassword = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  }).get(function get() {
    return this.textPassword;
  });

  /** 实例方法 */
  UserSchema.methods = {

    /**
   * 验证 - 检测密码是否正确
   * @param {String} plainText 普通的文本（明文）
   * @return {Boolean} 返回是否正确
   */
    authenticate(plainText) {
      return this.encryptPassword(plainText) === this.hashedPassword;
    },

    /**
   * 加密 password
   * @param {String} password 明文
   * @return {String} 密文
   */
    encryptPassword(password) {
      return crypto.
        createHmac('sha1', this.salt).
        update(password).
        digest('hex');
    },

    /**
   * 创建 salt
   * @return {String} 返回salt
   */
    makeSalt() {
      return String(Math.round(new Date().valueOf() * Math.random()));
    },
  };

  return mongoose.model('User', UserSchema, 'share_user');
};

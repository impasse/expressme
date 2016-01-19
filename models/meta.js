"use strict";
let db = require('../db');

//元信息:分类目录,标签
exports = module.exports = db.model('meta', {
    name: { type: String, unique: true },//名称
    path: { type: String, trim: true, index: true },//url上的地址
    description: String,//描述
    type: { type: Number, default: 0 }//类型:0=>分类目录,1=>标签
});
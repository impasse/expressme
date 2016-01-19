"use strict";
let db = require('../db');

exports = module.exports = db.model('post', {
    title: String,//标题
    visits: {
        type: Number,
        default: 0
    },//点击量
    meta: [{
        type: db.Schema.Types.ObjectId,
        ref: 'meta'
    }],//元信息
    createTime: { type: Number, default: Date.now() },//ctime
    lastEditTime: { type: Number, default: Date.now() },//mtime
    showable: { type: Boolean, default: true },//是否显示
    commentable: { type: Boolean, default: true },//是否可评论
    content: String,//内容,
    customlink: { type: String, trim: true, index: true },//自定义链接
    vars: db.Schema.Types.Mixed,//自定义变量
    type: { type: Number, default: 0 }//类型:0=>文章，1=>页面
});
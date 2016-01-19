"use strict";
let db = require('../db');

exports = module.exports = db.model('option', {
    title: String,//博客标题
    description: String,//博客描述
    keywords: Array,//博客关键词
    siteurl: { type: String, trim: true },//博客的url
    
    //signle user blog
    admin_img: String,//头像url
    admin_name: String,//用户名
    admin_nickname: String,//昵称
    admin_email: String,//邮箱地址
    admin_url: String,//网址
    admin_password: String,//密码
});
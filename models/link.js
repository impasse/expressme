"use strict";
let db = require('../db');

exports = module.exports = db.model('link', {
    name: String,//名称
    url: { type: String, trim: true },//地址
    showable: { type: Boolean, default: true },//是否显示
    img: { type: String, trim: true },//图标地址
    description:String//描述
});
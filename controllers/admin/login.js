"use strict";
let optionModel = require('../../models/option');

exports = module.exports = router => {
    router.route('/login').all((req, res, next) => {
        if (req.session.logined === true) {
            res.redirect('./');
        } else {
            next();
        }
    }).get((req, res) => {
        res.render('admin/login', {msg: req.flash('msg')});
    }).post((req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        if (username && password) {
            optionModel.findOne({admin_name: username, admin_password: password}).exec((err, val) => {
                if (err)throw err;
                if (val) {
                    res.redirect('./');
                } else {
                    req.flash('msg', '用户名或密码输入错误');
                    res.redirect('back');
                }
            })
        } else {
            req.flash('msg', '输入错误');
            res.redirect('back');
        }
    });
}
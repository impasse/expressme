"use strict";
let postModel = require('../../models/post');
let utils = require('../../utils');

exports = module.exports = router => {
    router.get('/posts', (req, res) => {
        postModel.find({}, 'title meta visits lastEditTime').populate('meta').exec((err, data) => {
            if (err) throw err;
            let list = utils.generateTableDate(
                {
                    title: '标题',
                    meta: '元信息',
                    visits: '访问量',
                    lastEditTime: '修改时间',
                    _id: [{
                        name: "编译",
                        callback: id=> `<a href="posts/edit/${id}">编辑</a>`
                    }, {
                        name: "删除",
                        callback: id=>`<a href="posts/delete/${id}">删除</a>`
                    }
                    ]
                }
            )(data);
            res.render('admin/list', {list: list});
        });
    }).get('/posts/delete/:id', (req, res)=> {
        postModel.remove({_id: req.params.id}).exec((err, val)=> {
            if (err)throw err;
            res.redirect('../');
        });
    }).get('/posts/edit/:id?', (req, res) => {
        let id = req.params.id;
        if (id) {
            //no id => new post
            postModel.findOne({_id: id}).exec((err, data)=> {
                if (err) throw err;
                res.render('admin/edit_post', data);
            });
        } else {
            res.render('admin/edit_post');
        }
    }).post('posts/edit/:id?', (req, res)=> {
        let id = req.params.id;
        if (id) {
            //no id => new post
            postModel.findOneAndUpdate({_id: id}, req.body).exec((err, val)=> {
                if (err)throw err;
                res.redirect('../');
            });
        } else {
            postModel.create(req.body).exec((err, val)=> {
                if (err) throw err;
                res.redirect('../');
            });
        }
    });
};
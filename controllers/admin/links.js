"use strict";
let linkModel = require('../../models/link');
let utils = require('../../utils');

exports = module.exports = router => {
    router.get('/links', (req, res) => {
        linkModel.find().exec((err, data) => {
            if (err) throw err;
            res.render('admin/link_list', {links: list});
        });
    }).get('/links/delete/:id', (req, res)=> {
        linkModel.remove({_id: req.params.id}).exec((err, val)=> {
            if (err)throw err;
            res.redirect('../');
        });
    }).get('/links/edit/:id?', (req, res) => {
        let id = req.params.id;
        if (id) {
            linkModel.findOne({_id: id}).exec((err, link)=> {
                if (err) throw err;
                res.render('admin/edit_link', link);
            });
        } else {
            res.render('admin/edit_link');
        }
    }).post('links/edit/:id?', (req, res)=> {
        let id = req.params.id;
        if (id) {
            linkModel.findOneAndUpdate({_id: id}, req.body).exec((err, val)=> {
                if (err)throw err;
                res.redirect('../');
            });
        } else {
            linkModel.create(req.body).exec((err, val)=> {
                if (err) throw err;
                res.redirect('../');
            });
        }
    });
};
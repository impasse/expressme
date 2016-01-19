"use strict";
let cacher = require('../../cacher');
let metaModel = require('../../models/meta');
let utils = require('../../utils');

exports = module.exports = router => {
    router.get('/meta', (req, res)=> {
        cacher.getAllMetas().then(metas=> {
            res.render('admin/meta', {metas: metas});
        }).catch(err=> {
            throw err;
        });
    }).get('/meta/delete/:id', (req, res)=> {
        metaModel.remove({_id: req.params.id}).exec((err, val)=> {
            if (err)throw err;
            res.redirect('back');
        })
    }).get('/meta/edit/:id?', (req, res)=> {
        var id = req.params.id;
        if (id) {
            res.render('admin/edit_meta');
        } else {
            metaModel.find({_id: id}).then(meta=> {
                res.render('admin/edit', {meta: meta});
            }).catch(err=> {
                throw err;
            })
        }
    }).post('/meta/edit/:id?', (req, res)=> {
        var id = req.params.id;
        if(id){
            metaModel.create(req.body).exec((err,val)=>{
                if(err)throw err;
                res.redirect('../');
            });
        }else{
            metaModel.findOneAndUpdate({_id:id},req.body).exec(err,val=>{
                if(err)throw err;
                res.redirect('../');
            })
        }
    })
};
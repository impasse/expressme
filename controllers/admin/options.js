/**
 * Created by shy on 2016/1/14.
 */
"use strict";
let optionModel = require('../../models/option');

exports = module.exports = router=> {
    router.route('/options').get((req, res)=> {
        optionModel.findOne().exec((err, data)=> {
            res.render('admin/option', data);
        });
    }).post((req,res)=>{
        optionModel.findOneAndUpdate({},req.body,{
            new:true,
            upsert:true
        }).exec((err,val)=>{
            if(err)throw err;
            res.redirect('../');
        })
    });
};
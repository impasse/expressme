"use strict";
let postModel = require('../models/post'),
    metaModel = require('../models/meta'),
    linkModel = require('../models/link'),
    optionModel = require('../models/option');

let pageCount = 10;

exports = module.exports = router => {
    router.all(['/category/:categoryParam/:page?', '/tag/:tagParam/:page?', '/search/:page?', '/page/:page?', '/'], (req, res, next) => {
        let categoryParam = req.params.categoryParam, tagParam = req.params.tagParam, searchParm = req.query.keyword;
        let page = +req.params.page || 1;
        let options = {limit: pageCount, sort: {_id: -1}, skip: 10 * (page - 1)};
        let meta = metaModel.find().exec();
        let links = linkModel.find().exec();
        let option = optionModel.find().exec();
        let posts = [];
        let query = categoryParam || tagParam || searchParm;

        if (categoryParam || tagParam) {
            let type = categoryParam ? 0 : 1;
            let id = metaModel.findOne({path: query, type: type}, '_id', (err, val)=> {
                if (err) throw err;
                posts = postModel.find({showable: true, meta: val._id}, null, options).populate('meta').exec();
                Promise.all([meta, links, option, posts, id]).then(values=> {
                    res.render('list', {
                        meta: values[0],
                        links: values[1],
                        option: values[2],
                        posts: values[3]
                    });
                }).catch(reason => {throw reason});
            });
            return;
        } else if (searchParm) {
            let pattern = new RegExp(query);
            posts = postModel.find(
                {showable: true, $or: [{title: pattern}, {content: pattern}]},
                null, options).exec();
        } else {
            posts = postModel.find({showable: true}, null, options).populate('meta').exec();
        }
        Promise.all([meta, links, option, posts]).then(values=> {
            console.log(values);
            res.render('list', {
                meta: values[0],
                links: values[1],
                option: values[2],
                posts: values[3]
            });
        }).catch(reason => {throw reason});
    });
};
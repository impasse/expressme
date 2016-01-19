"use strict";
let postModel = require('../models/post'),
    metaModel = require('../models/meta'),
    linkModel = require('../models/link'),
    optionModel = require('../models/option');


exports = module.exports = router => {
    // 文章详情页
    router.all(['/posts/:postParam', '/archives/pageParam'], (req, res, next) => {
        let query = req.params.postParam || req.params.pageParam;
        if (!query) {
            next();
        } else {
            let type = req.params.postParam ? 0 : 1;
            let post = postModel.findOneAndUpdate({
                showable: true, type: type, $or: [
                    {_id: query},
                    {_shorturl: query}
                ]
            }, {$inc: {visits: 1}}).populate('meta').exec();
            let meta = metaModel.find({}).exec();
            let links = linkModel.find({showable: true}).exec();
            let option = optionModel.find().exec();

            Promise.all([post, meta, links, option]).then(values=> {
                res.render('single', {
                    post: values[0],
                    meta: values[1],
                    links: values[2],
                    option: values[3]
                })
            }).catch(reason=> {
                throw reason;
            });
        }
    });
};
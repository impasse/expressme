"use strict";
let postModel = require('../../models/post'),
    metaModel = require('../../models/meta'),
    linkModel = require('../../models/link');

exports = module.exports = router => {
    router.get('/', (req, res, next) => {
        var postsCount = postModel.count().exec();
        var metasCount = metaModel.count().exec();
        var linksCount = linkModel.count().exec();
        Promise.all([postsCount, metasCount, linksCount]).then(values=> {
            res.render('admin/index', {
                postsCount: values[0],
                metasCount: values[1],
                linksCount: values[2]
            });
        }).catch(reason=> {
            throw reason;
        });
    });
};
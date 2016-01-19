"use strict";

let postModel = require('./models/post');
let metaModel = require('./models/meta');
let optionModel = require('./models/option');
let linkModel = require('./models/link');
let cache = require('./utils.js').cache;

//ModelHelper
let ModelHelper = {
    getAllPosts: _=> {
        return postModel.find().populate('meta').exec();
    },
    getAllShowablePosts: _=> {
        return postModel.find({showable: true}, null).populate('meta').exec();
    },
    getShowablePostsThoughQuery: (query, options)=> {
        let pattern = new RegExp(query);
        return postModel.find((
            {showable: true, $or: [{title: pattern}, {content: pattern}]}, options).populate('meta').exec());
    },
    getShowablePostsByMetaId: (id, options)=> {
        return postModel.find({showable: true, meta: val._id}, null, options).populate('meta').exec();
    },
    getShowablePostByQueryAndType: (query, type)=> {
        return postModel.findOneAndUpdate({
            showable: true, type: type, $or: [
                {_id: query},
                {_shorturl: query}
            ]
        }, {$inc: {visits: 1}}).populate('meta').exec();
    },
    getAllLinks: _=> {
        return linkModel.find().exec();
    },
    getAllOptions: _=> {
        return optionModel.findOne().exec();
    },
    getAllMetas: _=> {
        return metaModel.find().exec();
    }
};

/*
单例，直接添加到function属性里
 */
function Cacher() {
    let helperNames = Object.keys(ModelHelper);
    for(let k of helperNames){
        this[k] = function(){
            let value = cache(k);
            if(value){
                return Promise.resolve(value);
            }else{
                return ModelHelper[k].apply(null,arguments).then(ret=>{
                    return cache(k,ret);
                });
            }
        }
    }
}

exports = module.exports = new Cacher();
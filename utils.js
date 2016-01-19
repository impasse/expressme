"use strict";
let crypto = require('crypto');
let dateformat = require('dateformat');

let LRU = require('lru-cache'),
    cacheStore = LRU(100);

function cache(key, val) {
    if (val) {
        cacheStore.set(key, val);
        return val;
    } else {
        return cacheStore.get(key);
    }
}
cache.cacheStore = cacheStore;

exports = module.exports = {
    encrypt: pwd => {
        crypto.createHash('md5').update(pwd).digest('hex');
    },
    date: dateformat,
    cache: cache,
    generateTableDate: head=> {
        let keys = Object.keys(head);
        let values = [];
        let map_func = {};
        keys.forEach(key=> {
            let val = head[key];
            if (typeof val == 'string') {
                values.push(val);
                return;
            }
            if (!(val instanceof Array)) {
                val = [val];
            }
            val.forEach(item=> {
                if (map_func[key] instanceof Array) {
                    map_func[key].push(item.callback);
                } else {
                    map_func[key] = [item.callback];
                }
                values.push(item.name);
            });
        });
        return (body) => {
            let rows = body.map(row=> {
                let ret = [];
                keys.forEach(key=> {
                    if (map_func[key]) {
                        ret = ret.concat(map_func[key].map(func=> func(row[key])));
                    } else {
                        ret.push(row[key]);
                    }
                });
                return ret;
            });
            return {
                head: values,
                rows: rows
            }
        }
    }
}
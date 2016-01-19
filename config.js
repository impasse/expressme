"use strict";
let path = require('path'),
    config = {
        session: {//use memory session
            name: 'SESSIONID',
            secret: 'prettyprettypretty',
            resave: false,
            saveUninitialized: false
        },
        db: {
            uri: 'mongodb://localhost:27017/blog',
            opts: {
                user: '',
                pass: ''
            }
        },
        address: {
            port: 3000,
            host: 'localhost'
        },
        dir: { // 目录配置
            root: __dirname,
            model: path.join(__dirname, 'models'),
            view: path.join(__dirname, 'views'),
            controller: path.join(__dirname, 'controllers'),
            public: path.join(__dirname, 'public'),
        }
    };

exports = module.exports = config;





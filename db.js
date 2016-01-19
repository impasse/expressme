"use strict";
let mongoose = require('mongoose');
let config = require('./config');

mongoose.connect(config.db.uri, config.db.opts);

mongoose.connection.on('disconnected', _=> {
    console.info('MongoDB Disconnected');
}).on('connected', _=> {
    console.info('MongoDB Connected');
}).on('error', e=> {
    console.error(e);
});

exports = module.exports = mongoose;
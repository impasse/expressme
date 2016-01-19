"use strict";
let http = require('http'),
    express = require('express'),
    swig = require('swig'),
    path = require('path'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    session = require('express-session'),
    fs = require('fs'),
    app = express(),
    log4js = require('log4js'),
    logger = require('morgan');


let utils = require('./utils'),
    config = require('./config');

log4js.replaceConsole();

app.set('views', config.dir.view);
app.engine('html',swig.renderFile);
app.set('view engine', 'html');
app.disable('x-powered-by');

app.set('view cache', false);
swig.setDefaults({cache:false});

app.use(logger('dev'));
//app.use(log4js.connectLogger(log4js.getLogger('express'), { level: 'auto' }));
app.use(compression());
app.use(express.static(config.dir.public, { maxAge: '30d' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(config.session));

//req.flash([key,value]) implement
app.use(function (req, res, next) {
    if (typeof req.session != 'object') return;
    req.flash = (key, val) => {
        if (val) {
            req.session[key] = val;
        } else if (key) {
            let tmp = req.session[key];
            if (!delete req.session[key]) {
                req.session[key] = null;
            }
            return tmp;
        } else {
            return null;
        }
    };
    next();
});

//load routes though sync
let items = fs.readdirSync(config.dir.controller) || [];
items.forEach(item => {
    if (path.extname(item) == '.js') {
        console.info("Loading Route Rule: " + item);
        require(path.join(config.dir.controller, item))(app);
    }
});

//load admin routes
require(path.join(config.dir.controller, 'admin'))(app);

//404 middleware
app.use((req, res) => {
    res.status(404).render('404');
});

//500 middleware
app.use((err, req, res, next) => {
    if (err) console.error(err);
    if (res.headersSent)
        next(err);
    else
        res.status(500).render('500', { err: err.stack });
});

http.createServer(app).listen(config.address, _=> {
    console.info('Server Started');
});
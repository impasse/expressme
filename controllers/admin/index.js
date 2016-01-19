"use strict";
let adminRouter = require('express').Router();
let fs = require('fs');
let path = require('path');

exports = module.exports = router => {
    function permissionProtect(req, res, next) {
        next();
    }
    let items = fs.readdirSync(__dirname) || [];
    items.forEach(item=> {
        if (path.extname(item) == '.js' && item != path.basename(__filename)) {
            console.info("Loading Admin Route Rule: " + item);
            require(path.join(__dirname, item))(adminRouter);
        }
    });
    router.use(permissionProtect);
    router.use('/admin', adminRouter);
}
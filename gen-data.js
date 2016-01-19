"use strict";
let postModel = require('./models/post'),
    metaModel = require('./models/meta'),
    linkModel = require('./models/link'),
    optionModel = require('./models/option');
    
//gen data

optionModel.create({
    title: 'ling\'s blog',
    description: 'ling\'s blog',
    keywords: ['k', 'w', 'd'],
    siteurl: 'http://localhost',
    admin_name: 'admin',
    admin_password: '123456'
});

[
    { name: 'AAAAAAAA', url: 'http://aaaaa.com' },
    { name: 'BBBBBBBB', url: 'http://BBBBBBBB.com' },
    { name: 'CCCCCCCCCC', url: 'http://BBBBBBBBBBBBB.com' },
    { name: 'DDDDDDDD', url: 'http://BBBBBBBBBBBBB.com' },
    { name: 'EEEEEEEE', url: 'http://EEEEEEEEEEEEE.com' }
].forEach(item=> {
    linkModel.create(item);
});

let mA, mB, mC;

mA = new metaModel({
    name: 'metaA',
    path: 'metaA',
    type: 0
});

mB = new metaModel({
    name: 'metaB',
    path: 'metaB',
    type: 1
});

mC = new metaModel({
    name: 'metaC',
    path: 'metaC',
    type: 1
});

mA.save();
mB.save();
mC.save();

postModel.create({
    title: 'AAAAAAAAAAAAAAAAATITLE',
    meta: [mA._id, mB._id, mC._id],
    showable: true,
    content:'CONTENTAAAAAAAAAAAAAA'
});
postModel.create({
    title: 'BBBBBBBBBBBBBBBBBTITLE',
    meta: [mA._id],
    showable: true,
    content:'CONTENTBBBBBBBBBBBBBBB'
});
postModel.create({
    title: 'BBBBBBBBBBBBBBBBBTITLE',
    meta: [mA._id, mB._id, mC._id],
    showable: true,
    content:'CONTENTBBBBBBBBBBBBBBB'
});
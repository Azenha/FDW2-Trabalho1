'use strict';

const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
    mongoose.connect('mongodb://localhost/Livraria', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    }).then(() => winston.info('Mongo Db conectada.....'));
}
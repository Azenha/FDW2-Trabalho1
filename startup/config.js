'use strict';

const config = require('config');

module.exports = () => {
    if(!config.get('jwtPrivateKey')) {
        throw new Error('ERRO FATAL: jwtPrivateKey não definida');
    }
}
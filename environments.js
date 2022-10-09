'use strict';

const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();


const {PORT, HOST, HOST_URL} = process.env;

assert(PORT, 'PORT é necessária');
assert(HOST, 'HOST é necessária');

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL
}
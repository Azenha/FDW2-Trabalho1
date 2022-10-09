const express = require('express');
const {addUsuario} = require('../controllers/usuarioController');

const router = express.Router();

router.post('/register', addUsuario);


module.exports = {
    routes: router
}
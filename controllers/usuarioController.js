const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Usuario, validate} = require('../models/usuario');


const addUsuario = async (req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(422).send(error.details[0].message);

    let usuario = await Usuario.findOne({email: req.body.email}).exec();
    if(usuario) return res.status(400).send('Já existe um usuário com este email');

    usuario  = new Usuario(_.pick(req.body, ['nome', 'email', 'senha']));

    const salt = await bcrypt.genSalt(10);
    usuario.senha = await bcrypt.hash(req.body.senha, salt);
    (await usuario).save();
    const token = usuario.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(usuario, ['_id', 'nome', 'email']));
}

module.exports = {
    addUsuario
}

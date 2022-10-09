const Joi = require('joi');
const bcrypt = require('bcrypt');
const {Usuario} = require('../models/usuario');


const login = async (req, res, next) => {
    const {error} = validate(req.body);

    if(error) return res.status(422).send(error.details[0].message);

    const usuario = await Usuario.findOne({email: req.body.email}).exec();
    if(!usuario) return res.status(404).send('Email ou senha inválida');

    const validPassword= await bcrypt.compare(req.body.senha, usuario.senha);
    if(!validPassword) return res.status(404).send('Email ou senha inválida');

    const token  = usuario.generateAuthToken();
    res.send(token);
}

const validate = (req) => {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        senha: Joi.string().min(5).max(255).required()
    }

  return  Joi.validate(req, schema);
}

module.exports = {
    login
}
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50, 
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    }, 
    senha: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

usuarioSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
    return token;
}
const Usuario = mongoose.model('Usuario', usuarioSchema);

const validateUsuario = (usuario) => {
    const schema = {
        nome: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required().email(),
        senha: Joi.string().min(5).max(1024).required()
    }

    return Joi.validate(usuario, schema);
}


exports.Usuario = Usuario;
exports.validate = validateUsuario;

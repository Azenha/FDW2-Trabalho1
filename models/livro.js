const mongoose = require('mongoose');
const Joi = require('joi');

const livroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    },
    descricaoCurta: {
        type: String,
        minlength: 20,
        maxlength: 200,
        required: true
    },
    descricaoLonga: {
        type: String,
        minlength: 50,
        maxlength: 1000,
        required: true
    },
    autoria: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    }, 
    preco: {
        type: Number,
        required: true
    },
    emEstoque: {
        type: Boolean,
        required: true,
        default: true
    }
});

const Livro = mongoose.model('Livro', livroSchema);

const validateLivro = (livro) => {
    const schema = {
        titulo: Joi.string().min(5).max(50).required(),
        descricaoCurta: Joi.string().min(20).max(200).required(),
        descricaoLonga: Joi.string().min(50).max(1000).required(),
        autoria: Joi.string().min(5).max(50).required(),
        preco: Joi.number().required(),
        emEstoque: Joi.boolean().required()
    }

    return Joi.validate(livro, schema);
}

exports.Livro = Livro;
exports.validate = validateLivro;
const { model } = require('mongoose');
const {Livro, validate} = require('../models/livro');


const addLivro = async (req, res, next) => {
        const {error} =  validate(req.body);
        if(error) return res.status(422).send(error.details[0].message);

        let livro = new Livro({
            titulo: req.body.titulo,
            descricaoCurta: req.body.descricaoCurta,
            descricaoLonga: req.body.descricaoLonga,
            autoria: req.body.autoria,
            preco: req.body.preco,
            emEstoque: req.body.emEstoque
        });

        livro =  await livro.save(); 
        res.send(livro);
}

const getLivros = async (req, res, next) => {
    const livros = await Livro.find().sort('titulo').exec();
    res.send(livros);
}

const getOneLivro = async (req, res, next) => {
    const livro = await Livro.findById(req.params.id);
    if(!livro) return res.status(401).send('Não foi encontrado um livro com essa ID');

    res.send(livro);
}

const updateLivro = async (req, res, next) => {
    const {error} = validate(req.body);
    if(error) return res.status(422).send(error.details[0].message);

    let livro = await Livro.findByIdAndUpdate(req.params.id, {
        titulo: req.body.titulo,
        descricaoCurta: req.body.descricaoCurta,
        descricaoLonga: req.body.descricaoLonga,
        autoria: req.body.autoria,
        preco: req.body.preco,
        emEstoque: req.body.emEstoque
    }, {new: true});

    if(!livro) return res.status(401).send('Não foi encontrado um livro com essa ID');
    res.send(livro);
}

const deleteLivro = async (req, res, next) => {
    const livro = await Livro.findByIdAndRemove(req.params.id);
    if(!livro) return res.status(401).send('The Livro with the given id not found');

    res.send(livro);
}


module.exports = {
    addLivro,
    getLivros,
    getOneLivro,
    updateLivro,
    deleteLivro
}
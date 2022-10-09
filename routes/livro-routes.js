const express = require('express');
const auth = require('../middleware/auth');
const {addLivro, getLivros, getOneLivro, updateLivro, deleteLivro} = require('../controllers/livroController');

const router = express.Router();

router.post('/livro', auth, addLivro);
router.get('/livros', auth,  getLivros);
router.get('/livro/:id',auth, getOneLivro);
router.put('/livro/:id', auth, updateLivro);
router.delete('/livro/:id', auth, deleteLivro);


module.exports = {
    routes: router
}
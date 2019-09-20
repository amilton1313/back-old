const express = require('express');

const pessoaContatoController = require('../controllers/co_pessoaContato')

const md_auth = require('../util/autenticacao')

const router = express.Router();

router.get('/pessoacontato/:id', md_auth.auth, pessoaContatoController.getPessoaContatoById)

router.post('/pessoacontato', md_auth.auth, pessoaContatoController.addPessoaContato)
router.put('/pessoacontato/:id', md_auth.auth, pessoaContatoController.updPessoaContato)
router.delete('/pessoacontato/:id', md_auth.auth, pessoaContatoController.delPessoaContato)

module.exports = router

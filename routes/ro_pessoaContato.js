const express = require('express');

const pessoaContatoController = require('../controllers/co_pessoaContato')

const md_auth = require('../util/autenticacao')

const router = express.Router();

router.get('/pessoa/:id', md_auth.auth, pessoaContatoController.getPessoaContatoById)

router.post('/pessoa', md_auth.auth, pessoaContatoController.addPessoaContato)
router.put('/pessoa/:id', md_auth.auth, pessoaContatoController.updPessoaContato)
router.delete('/pessoa/:id', md_auth.auth, pessoaContatoController.delPessoaContato)


module.exports = router

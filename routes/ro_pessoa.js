const express = require('express');

const pessoaController = require('../controllers/co_pessoa')

const md_auth = require('../util/autenticacao')

const router = express.Router();

router.get('/pessoas', md_auth.auth, pessoaController.getPessoas)
router.get('/grupopessoas', md_auth.auth, pessoaController.getGrupoPessoas)
router.get('/pessoa/:id', md_auth.auth, pessoaController.getPessoaById)
router.get('/pessoa/nome/:nome', md_auth.auth, pessoaController.getPessoaByNome)
router.get('/pessoa/cpf/:cpf', md_auth.auth, pessoaController.getPessoaByCpf)
router.get('/pessoa/cnpj/:cnpj', md_auth.auth, pessoaController.getPessoaByCnpj)
router.post('/pessoa', md_auth.auth, pessoaController.addPessoa)
router.put('/pessoa/:id', md_auth.auth, pessoaController.updPessoa)
router.delete('/pessoa/:id', md_auth.auth, pessoaController.delPessoa)

module.exports = router

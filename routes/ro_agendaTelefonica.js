const express = require('express');

const agendaTelefonicaController = require('../controllers/co_agendaTelefonica')

const md_auth = require('../util/autenticacao')

const router = express.Router();

router.get('/agendatelefonica/:nome', agendaTelefonicaController.getTelefonesByNome)


module.exports = router

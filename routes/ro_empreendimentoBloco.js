const express = require('express');

const empreendimentoBlocoController = require('../controllers/co_empreendimentoBloco')

const md_auth = require('../util/autenticacao')

const router = express.Router();

router.get('/empreendimentoblocos/:id', empreendimentoBlocoController.getEmpreendimentoBlocos)
router.get('/empreendimentobloco/:id', empreendimentoBlocoController.getEmpreendimentoBlocoById)
router.post('/empreendimentobloco', md_auth.auth, empreendimentoBlocoController.addEmpreendimentoBloco)
router.put('/empreendimentobloco/:id', md_auth.auth, empreendimentoBlocoController.updEmpreendimentoBloco)
router.delete('/empreendimentobloco/:id', md_auth.auth, empreendimentoBlocoController.delEmpreendimentoBloco)

module.exports = router

const express = require('express');

const empreendimentoBlocoController = require('../controllers/co_empreendimentoBloco')

const md_auth = require('../util/autenticacao')

const router = express.Router();

router.get('/empreendimentoBlocos', md_auth.auth, empreendimentoBlocoController.getEmpreendimentoBlocos)
router.get('/empreendimentoBloco/:id', md_auth.auth, empreendimentoBlocoController.getEmpreendimentoBlocoById)
router.get('/empreendimentoBloco/nome/:nome', md_auth.auth, empreendimentoBlocoController.getEmpreendimentoBlocoByNome)
router.post('/empreendimentoBloco', md_auth.auth, empreendimentoBlocoController.addEmpreendimentoBloco)
router.put('/empreendimentoBloco/:id', md_auth.auth, empreendimentoBlocoController.updEmpreendimentoBloco)
router.delete('/empreendimentoBloco/:id', md_auth.auth, empreendimentoBlocoController.delEmpreendimentoBloco)




module.exports = router

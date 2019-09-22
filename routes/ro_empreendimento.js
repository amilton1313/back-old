const express = require('express');

const empreendimentoController = require('../controllers/co_empreendimento')

const md_auth = require('../util/autenticacao')

const router = express.Router();

router.get('/empreendimentos', empreendimentoController.getEmpreendimentos)
router.get('/empreendimento/:id', empreendimentoController.getEmpreendimentoById)
router.get('/empreendimento/nome/:nome', empreendimentoController.getEmpreendimentoByNome)
router.post('/empreendimento', md_auth.auth, empreendimentoController.addEmpreendimento)
router.put('/empreendimento/:id', md_auth.auth, empreendimentoController.updEmpreendimento)
router.delete('/empreendimento/:id', md_auth.auth, empreendimentoController.delEmpreendimento)

module.exports = router

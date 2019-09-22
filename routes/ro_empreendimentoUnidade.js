const express = require('express')

const empreendimentoUnidadeController = require('../controllers/co_empreendimentoUnidade')

const md_auth = require('../util/autenticacao')

const router = express.Router()

router.get('/empreendimentounidades/bloco/:id', empreendimentoUnidadeController.getEmpreendimentoUnidadesByBloco)
router.get('/empreendimentounidades/empreendimento/:id', empreendimentoUnidadeController.getEmpreendimentoUnidadesByEmpreendimento)
router.get('/empreendimentounidade/:id', empreendimentoUnidadeController.getEmpreendimentoUnidadeById)
router.post('/empreendimentounidade/numero', empreendimentoUnidadeController.getEmpreendimentoUnidadeByNumero)
router.post('/empreendimentoUnidade', empreendimentoUnidadeController.addEmpreendimentoUnidade)
router.put('/empreendimentoUnidade/:id', empreendimentoUnidadeController.updEmpreendimentoUnidade)
router.delete('/empreendimentoUnidade/:id', empreendimentoUnidadeController.delEmpreendimentoUnidade)

module.exports = router

const express = require('express');

const AssisTecSolicitacaoController = require('../controllers/co_assistecsolicitacao')

const md_auth = require('../util/autenticacao')

const router = express.Router()

router.get('/assistecsolicitacao/:id', md_auth.auth, AssisTecSolicitacaoController.getAssisTecSolicitacaoById)
router.get('/assistecsolicitacao/unidade/:id', md_auth.auth, AssisTecSolicitacaoController.getAssisTecSolicitacoesByIdUnidade)

router.post('/assistecsolicitacao', md_auth.auth, AssisTecSolicitacaoController.addAssisTecSolicitacao)
router.put('/assistecsolicitacao/:id', md_auth.auth, AssisTecSolicitacaoController.updAssisTecSolicitacao)
router.delete('/assistecsolicitacao/:id', md_auth.auth, AssisTecSolicitacaoController.delAssisTecSolicitacao)

module.exports = router

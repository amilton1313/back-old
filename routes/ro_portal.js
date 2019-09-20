const express = require('express');

const portalController = require('../controllers/co_poEmpreendimento')

const md_auth = require('../util/autenticacao')

const router = express.Router()

router.get('/portal/empreenddoctos/:id', portalController.getPortalDoctosByEmpreend)

module.exports = router

const express = require('express');

const indiceDataController = require('../controllers/co_indiceData')

const md_auth = require('../util/autenticacao')

const router = express.Router()

router.get('/indicesintranet', indiceDataController.getIndicesIntranet)
router.post('/indicesintranetperiodo', indiceDataController.getIndicesIntranetPeriodo)
router.get('/indicedatas', indiceDataController.getIndiceDatas)
router.get('/indicedata/:data', indiceDataController.getIndiceDataByData)
router.post('/indicedata', md_auth.auth, indiceDataController.addIndiceData)
router.put('/indicedata/:id', md_auth.auth, indiceDataController.updIndiceData)
router.delete('/indicedata/:id', md_auth.auth, indiceDataController.delIndiceData)

module.exports = router

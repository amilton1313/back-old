const express = require('express')

const usuarioController = require('../controllers/co_usuario')

const md_auth = require('../util/autenticacao')

const router = express.Router()

router.get('/usuarios', usuarioController.getUsuarios)
router.get('/usuario/:id', md_auth.auth, usuarioController.getUsuario)
router.post('/usuario', usuarioController.addUsuario)
router.put('/usuario/:id', usuarioController.updUsuario)
router.delete('/usuario/:id', usuarioController.delUsuario)
router.post('/auth', usuarioController.getAuth)
router.post('/login', usuarioController.getAuthByCpf)
// router.post('/jwt', usuarioController.getJwt)
router.get('/', usuarioController.servidorON)

module.exports = router

const usuarioRoutes = require('./ro_usuario')
const pessoaRoutes = require('./ro_pessoa')
const empreendimentoRoutes = require('./ro_empreendimento')
const indiceRoutes = require('./ro_indice')
const indiceDatasRoutes = require('./ro_indiceData')

module.exports = [
    usuarioRoutes,
    pessoaRoutes,
    empreendimentoRoutes,
    indiceRoutes,
    indiceDatasRoutes
]

const usuarioRoutes = require('./ro_usuario')
const pessoaRoutes = require('./ro_pessoa')
const pessoaContatoRoutes = require('./ro_pessoaContato')
const empreendimentoRoutes = require('./ro_empreendimento')
const indiceRoutes = require('./ro_indice')
const indiceDatasRoutes = require('./ro_indiceData')
const agendaTelefonicaRoutes = require('./ro_agendaTelefonica')
const assisTecSolicitacaoRoutes = require('./ro_assistecsolicitacao')
const portalRoutes = require('./ro_portal')

module.exports = [
    usuarioRoutes,
    pessoaRoutes,
    pessoaContatoRoutes,
    empreendimentoRoutes,
    indiceRoutes,
    indiceDatasRoutes,
    agendaTelefonicaRoutes,
    assisTecSolicitacaoRoutes,
    portalRoutes
]

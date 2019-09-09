const nJwt = require('njwt')
const secret = require('./pw')

function auth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({message: 'A solicitação está sem o cabecalho de autenticação'})
    }

    const token = req.headers.authorization.replace(/['"]+/g,'')
    const payload = nJwt.verify(token, secret, (err, verifiedJwt) => {
        if (err) {
            return res.status(401).send({message: 'Acesso não autorizado'})
        } else {
            next()
        }
    })
}

module.exports = {
    auth
}
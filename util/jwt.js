const nJwt = require('njwt')
const secret = require('./pw')

exports.createToken = (usuario) => {

    const params = {
        id_usuario: usuario.id_usuario,
        nm_nick: usuario.nm_nick
    }


    const jwt = nJwt.create(params,secret)
    const t = new Date()
    t.setHours(t.getHours() + 2)
    jwt.setExpiration(t)

    const token=jwt.compact()

    console.log('token', token)

    return token

}
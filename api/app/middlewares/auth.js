const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.config')

exports.getUserByToken = async (token) => {
    if (token === 'null' || !token) return
    return await jwt.verify(token, authConfig.secret)
}

//next used when the prex step
exports.verifyJwt = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'no token provided' })

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({ error: 'Token error' })

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatted' })

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'token invalid' })
        req.userId = decoded.id
        req.domain = decoded?.domain
        return next()
    })
}
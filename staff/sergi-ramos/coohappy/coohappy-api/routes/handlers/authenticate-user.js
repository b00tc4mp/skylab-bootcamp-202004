const { env: { JWT_SECRET : SECRET } } = process

const { authenticateUser } = require('coohappy-server-logic')
const { handleError } = require('../../helpers')
const { utils: { jwtPromised } } = require('coohappy-commons')

module.exports = (req, res) => {
    const { body: { email, password } } = req

    try {
        authenticateUser(email, password)
            .then(userId => jwtPromised.sign({ sub: userId }, SECRET, { expiresIn: '1d' }))
            .then(token => res.status(200).json({ token }))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
const { env: { SECRET } } = process

const { authenticateAdmin } = require('server-logic')
const { handleError } = require('../../helpers')
const { utils: { jwtPromised } } = require('commons')

module.exports = (req, res) => {
    try {
        const { body: { email, password } } = req
        
        authenticateAdmin( email, password )
            .then(userId => jwtPromised.sign({ sub: userId }, SECRET, { expiresIn: '1d' }))
            .then(token => res.status(200).send({ token }))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}

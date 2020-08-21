const { env: { JWT_SECRET: SECRET } } = process

const { authenticateUser } = require('work-meeting-server-logic')
const { handleError } = require('../../helpers')
const { utils: { jwtPromised } } = require('work-meeting-commons')

module.exports = (req, res) => {
    const { body: { email, password } } = req
    debugger
    try {
        authenticateUser(email, password)
            .then(userId => jwtPromised.sign({ sub: userId }, SECRET, { expiresIn: '1d' }))
            .then(token => res.send({ token }))
            .catch(error => {debugger; handleError(error, res)})
    } catch (error) {
        debugger
        handleError(error, res)
    }
}
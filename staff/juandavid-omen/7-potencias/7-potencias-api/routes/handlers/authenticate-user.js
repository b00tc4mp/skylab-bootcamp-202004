const { env: { JWT_SECRET: SECRET } } = process

const { authenticateUser } = require('7-potencias-server-logic')
const { handleError } = require('../../helpers')
const { utils: { jwtPromised } } = require('7-potencias-commons')

module.exports = (req, res) => {
  const { body: { email, password } } = req

  try {
    authenticateUser(email, password)
      .then(userId => jwtPromised.sign({ sub: userId }, SECRET, { expiresIn: '1d' }))
      .then(token => res.send({ token }))
      .catch(error => handleError(error, res))
  } catch (error) {
    handleError(error, res)
  }
}

const { updateUser } = require('termometro-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { payload: { sub: userId }, body } = req

        updateUser(userId, body)
            .then(() => res.status(204).end())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
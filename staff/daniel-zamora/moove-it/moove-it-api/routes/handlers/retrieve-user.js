const { retrieveUser } = require('moove-it-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { payload: { sub: userId } } = req

        retrieveUser(userId)
            .then(user => res.status(200).send(user))
            .catch(error => handleError(error, res))

    } catch (error) {
        handleError(error, res)
    }
}
const { retrieveUserCard } = require('gym-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { payload: { sub: userId } } = req
        retrieveUserCard(userId)
            .then(user => res.send(user))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
const { retrieveUserTrades } = require('gym-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { payload: { sub: userId } } = req
    try {
        retrieveUserTrades(userId)
            .then(trades => res.status(200).send(trades))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
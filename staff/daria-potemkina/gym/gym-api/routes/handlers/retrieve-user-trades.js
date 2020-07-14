const { retrieveUserTrades } = require('gym-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { payload: { sub: userId } } = req
        
        retrieveUserTrades(userId)
            .then(trades => res.send(trades))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
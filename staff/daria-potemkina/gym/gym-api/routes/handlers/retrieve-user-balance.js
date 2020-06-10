const { retrieveUserBalance } = require('gym-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { payload: { sub: userId } } = req
        retrieveUserBalance(userId)
            .then(balance => res.send(balance))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
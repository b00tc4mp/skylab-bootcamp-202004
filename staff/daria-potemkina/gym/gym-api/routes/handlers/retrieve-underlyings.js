const { retrieveUnderlyings } = require('gym-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { params: { ticker } } = req
    try {
        retrieveUnderlyings(ticker)
            .then(result => res.status(200).send(result))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
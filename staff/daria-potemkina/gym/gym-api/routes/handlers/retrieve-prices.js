const { retrievePrices } = require('gym-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { query: { productId, size } } = req

    try {
        retrievePrices(productId, size)
            .then(prices => res.status(200).send(prices))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
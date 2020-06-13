const { searchProducts } = require('gym-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { query: { type, sector, ticker, market } } = req
    try {
        searchProducts(type, sector, ticker, market)
            .then(results => res.status(200).send(results))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
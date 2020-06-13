const { retrieveProducts } = require('gym-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        retrieveProducts()
            .then(products => res.status(200).send(products))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
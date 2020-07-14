const { retrieveProduct } = require('gym-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    try {
        const { params: { productId } } = req

        retrieveProduct(productId)
            .then(product => res.status(200).send(product))
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
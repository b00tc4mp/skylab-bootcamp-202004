const { addProduct } = require('gym-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
    const { payload: { sub: userId }, body: { productId, priceId, side, quantity } } = req
    
    try {
        addProduct(userId, productId, priceId, side, quantity)
            .then(() => res.status(200).send())
            .catch(error => handleError(error, res))
    } catch (error) {
        handleError(error, res)
    }
}
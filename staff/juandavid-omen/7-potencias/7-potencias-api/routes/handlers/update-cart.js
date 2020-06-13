const { updateCart } = require('7-potencias-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
  try {
    const { body: { productId, amount } } = req

    const { payload: { sub: userId } } = req

    updateCart(userId, productId, parseInt(amount))
      .then(() => res.status(200).send())
      .catch(error => handleError(error, res))
  } catch (error) {
    handleError(error, res)
  }
}

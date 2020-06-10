const { deleteCart } = require('7-potencias-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
  try {
    const { payload: { sub: userId } } = req

    deleteCart(userId)
      .then(() => res.status(200).send())
      .catch(error => handleError(error, res))
  } catch (error) {
    handleError(error, res)
  }
}

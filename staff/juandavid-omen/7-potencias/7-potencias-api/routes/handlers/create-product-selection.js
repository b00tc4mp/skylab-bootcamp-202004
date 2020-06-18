const { createProductSelection } = require('7-potencias-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
  const { body: { productId, isOnline, isGroup } } = req

  try {
    createProductSelection(productId, isOnline, isGroup)
      .then(() => res.status(201).send())
      .catch(error => handleError(error, res))
  } catch (error) {
    handleError(error, res)
  }
}

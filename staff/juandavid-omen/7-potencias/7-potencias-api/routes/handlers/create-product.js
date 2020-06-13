const { createProduct } = require('7-potencias-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
  const { body: { name, price, danceStyle } } = req

  try {
    createProduct(name, price, danceStyle)
      .then(() => res.status(201).send())
      .catch(error => handleError(error, res))
  } catch (error) {
    handleError(error, res)
  }
}

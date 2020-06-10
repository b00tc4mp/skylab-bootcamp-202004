const { createClass } = require('7-potencias-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
  const { body: { name, description, price, url } } = req

  try {
    createClass(name, description, price, url)
      .then(() => res.status(201).send())
      .catch(error => handleError(error, res))
  } catch (error) {
    handleError(error, res)
  }
}

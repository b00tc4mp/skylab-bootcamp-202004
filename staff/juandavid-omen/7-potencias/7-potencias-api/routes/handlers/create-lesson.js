const { createLesson } = require('7-potencias-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
  const { body: { name, price, style, hour, minute, day, month, year } } = req

  try {
    createLesson(name, price, style, hour, minute, day, month, year)
      .then(() => res.status(201).send())
      .catch(error => handleError(error, res))
  } catch (error) {
    handleError(error, res)
  }
}

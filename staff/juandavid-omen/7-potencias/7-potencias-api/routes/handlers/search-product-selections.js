const { searchProductSelections } = require('7-potencias-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
  try {
    const isOnline = req.query.isOnline
    const isGroup = req.query.isGroup

    searchProductSelections(isOnline, isGroup)
      .then(results => res.status(200).send(results))
      .catch(error => handleError(error, res))
  } catch (error) {
    handleError(error, res)
  }
}

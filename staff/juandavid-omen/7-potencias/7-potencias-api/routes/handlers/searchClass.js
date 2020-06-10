const { searchClass } = require('7-potencias-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
  try {
    const query = req.query.q

    searchClass(query)
      .then(results => res.status(200).send(results))
      .catch(error => handleError(error, res))
  } catch (error) {
    handleError(error, res)
  }
}

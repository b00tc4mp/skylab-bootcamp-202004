const { searchUsers } = require('7-potencias-server-logic')
const { handleError } = require('../../helpers')

module.exports = (req, res) => {
  try {
    const query = req.query.q

    searchUsers(query)
      .then(users => res.status(200).send(users))
      .catch(error => handleError(error, res))
  } catch (error) {
    handleError(error, res)
  }
}
